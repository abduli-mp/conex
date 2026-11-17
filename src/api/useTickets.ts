import { useCallback, useEffect, useState } from "react";

import { ConexAPI } from "./ConexApiClient";
import type { Employer, Service, Task } from "./ConexTypes";

export type Ticket = Task & {
  service: Service | null;
  employer: Employer | null;
};

type State =
  | { phase: "loading" }
  | { phase: "error" }
  | { phase: "ready"; tickets: Ticket[]; partial: boolean };

const listOf = <T>(result: PromiseSettledResult<T[]>) =>
  result.status === "fulfilled" && Array.isArray(result.value) ? result.value : null;

export function useTickets() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const abort = new AbortController();
    const { signal } = abort;

    (async () => {
      // Names for service and employer are nice to have; the tickets are not.
      const [tasks, services, employers] = await Promise.allSettled([
        ConexAPI<Task[]>("/tasklist", { signal }),
        ConexAPI<Service[]>("/services", { signal }),
        ConexAPI<Employer[]>("/employers", { signal }),
      ]);
      if (signal.aborted) return;

      const rows = listOf(tasks);
      if (!rows) {
        setState({ phase: "error" });
        return;
      }

      const serviceList = listOf(services);
      const employerList = listOf(employers);
      const serviceById = new Map(serviceList?.map((s) => [s.service_id, s] as const));
      const employerById = new Map(employerList?.map((e) => [e.employer_id, e] as const));

      const tickets = rows
        .map((task) => ({
          ...task,
          service: serviceById.get(task.service_id) ?? null,
          employer: employerById.get(task.employer_id) ?? null,
        }))
        .sort((x, y) => Date.parse(y.created_at) - Date.parse(x.created_at));

      setState({ phase: "ready", tickets, partial: !serviceList || !employerList });
    })();

    return () => abort.abort();
  }, [attempt]);

  const reload = useCallback(() => {
    setState({ phase: "loading" });
    setAttempt((n) => n + 1);
  }, []);

  return { state, reload };
}
