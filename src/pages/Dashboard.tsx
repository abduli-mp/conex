import { useState } from "react";
import { Link } from "react-router-dom";

import type { TaskStatus } from "../api/ConexTypes";
import { useTickets } from "../api/useTickets";
import { useAuth } from "../auth/useAuth";
import SectionHead from "../components/SectionHead";
import TicketRow from "../components/dashboard/TicketRow";
import { formatDate, longDate } from "../components/dashboard/format";
import { btnPrimary, btnSoft } from "../components/ui";
import { business } from "../content/business";
import { useLang } from "../i18n/useLang";

type Filter = "all" | TaskStatus;

const filterOrder: Filter[] = ["all", "open", "in_progress", "done", "cancelled"];
const skeletonWidths = ["w-44", "w-32", "w-52", "w-40"];

export default function Dashboard() {
  const { lang, t } = useLang();
  const { session } = useAuth();
  const { state, reload } = useTickets();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const d = t.dashboard;

  const user = session?.user;
  const meta = user?.user_metadata ?? {};
  const fullName =
    [meta.first_name, meta.last_name]
      .filter((part): part is string => typeof part === "string" && part !== "")
      .join(" ") || (user?.email ?? "");

  const tickets = state.phase === "ready" ? state.tickets : [];
  const counts = { all: tickets.length, open: 0, in_progress: 0, done: 0, cancelled: 0 };
  for (const ticket of tickets) {
    if (ticket.status in counts) counts[ticket.status] += 1;
  }

  const visible = filter === "all" ? tickets : tickets.filter((x) => x.status === filter);
  const tabs = filterOrder.filter((key) => key === "all" || key === filter || counts[key] > 0);

  const tabClass = (active: boolean) =>
    `-mb-px cursor-pointer border-b-2 py-3 font-mono text-sm transition-colors ${
      active
        ? "border-primary text-primary"
        : "border-transparent text-muted hover:text-foreground"
    }`;

  return (
    <>
      <SectionHead as="h1" title={d.title} aside={fullName} />

      <div className="shell grid flex-1 lg:grid-cols-[1fr_21rem] lg:border-x lg:border-border">
        <section aria-label={d.title} className="min-w-0">
          {state.phase === "loading" && (
            <ul role="status" aria-label={d.loading}>
              {skeletonWidths.map((width) => (
                <li key={width} className="border-b border-border px-6 py-5 md:px-10">
                  <div className={`h-4 animate-pulse bg-surface-hover ${width}`} />
                  <div className="mt-3 h-3 w-3/4 animate-pulse bg-surface" />
                </li>
              ))}
            </ul>
          )}

          {state.phase === "error" && (
            <div role="alert" className="px-6 py-14 md:px-10">
              <p className="max-w-md text-muted">{d.loadError}</p>
              <button type="button" onClick={reload} className={`${btnSoft} mt-5`}>
                {d.retry}
              </button>
            </div>
          )}

          {state.phase === "ready" && tickets.length === 0 && (
            <div className="px-6 py-14 md:px-10 lg:py-20">
              <h2 className="text-xl font-bold">{d.emptyTitle}</h2>
              <p className="mt-2 max-w-md text-muted">{d.emptyText}</p>
              <Link to="/create-ticket" className={`${btnPrimary} mt-6`}>
                {d.emptyAction}
              </Link>
            </div>
          )}

          {state.phase === "ready" && tickets.length > 0 && (
            <>
              <div
                role="group"
                aria-label={d.filterLabel}
                className="flex flex-wrap gap-x-6 border-b border-border px-6 md:px-10"
              >
                {tabs.map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={filter === key}
                    onClick={() => {
                      setFilter(key);
                      setOpenId(null);
                    }}
                    className={tabClass(filter === key)}
                  >
                    {d.filters[key]}
                    <span className="ml-2 tabular-nums text-muted">{counts[key]}</span>
                  </button>
                ))}
              </div>

              {state.partial && (
                <p className="border-b border-border px-6 py-3 font-mono text-xs text-muted md:px-10">
                  {d.partial}
                </p>
              )}

              {visible.length > 0 ? (
                <ul>
                  {visible.map((ticket) => (
                    <TicketRow
                      key={ticket.task_id}
                      ticket={ticket}
                      open={openId === ticket.task_id}
                      onToggle={() =>
                        setOpenId(openId === ticket.task_id ? null : ticket.task_id)
                      }
                    />
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-10 md:px-10">
                  <p className="text-muted">{d.emptyFiltered}</p>
                  <button
                    type="button"
                    onClick={() => setFilter("all")}
                    className="mt-3 cursor-pointer text-primary underline underline-offset-4"
                  >
                    {d.showAll}
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <aside className="border-t border-border px-6 py-10 md:px-10 lg:border-l lg:border-t-0 lg:px-8">
          <div className="space-y-10 lg:sticky lg:top-24">
            <section aria-labelledby="account-title">
              <h2 id="account-title" className="font-mono text-xs text-muted">
                {d.account.title}
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-mono text-xs text-muted">{d.account.name}</dt>
                  <dd className="mt-1 break-words font-medium">{fullName}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-muted">{d.account.email}</dt>
                  <dd className="mt-1 break-all">{user?.email}</dd>
                </div>
                {user?.created_at && (
                  <div>
                    <dt className="font-mono text-xs text-muted">{d.account.since}</dt>
                    <dd className="mt-1">
                      <time dateTime={user.created_at}>
                        {formatDate(user.created_at, lang, longDate)}
                      </time>
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            <section className="border-t border-border pt-8">
              <h2 className="text-lg font-bold">{d.newRequest.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.newRequest.text}</p>
              <Link to="/create-ticket" className={`${btnPrimary} mt-5`}>
                {d.newRequest.action}
              </Link>
            </section>

            <section aria-labelledby="help-title" className="border-t border-border pt-8">
              <h2 id="help-title" className="font-mono text-xs text-muted">
                {d.help.title}
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm">
                <li>
                  <a
                    href={`tel:${business.phoneHref}`}
                    className="underline-offset-4 hover:text-primary hover:underline"
                  >
                    {business.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all underline-offset-4 hover:text-primary hover:underline"
                  >
                    {business.email}
                  </a>
                </li>
                <li className="text-muted">{business.hours[lang]}</li>
              </ul>
            </section>
          </div>
        </aside>
      </div>
    </>
  );
}
