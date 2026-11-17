import type { TaskStatus } from "../../api/ConexTypes";
import { useLang } from "../../i18n/useLang";

const tone: Record<TaskStatus, string> = {
  open: "border-primary/30 bg-primary-soft text-primary",
  in_progress: "border-warning/30 bg-warning-soft text-warning",
  done: "border-success/30 bg-success-soft text-success",
  cancelled: "border-border bg-surface text-muted",
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const { t } = useLang();

  return (
    <span
      className={`inline-flex h-6 items-center whitespace-nowrap border px-2 font-mono text-xs ${
        tone[status] ?? tone.cancelled
      }`}
    >
      {t.dashboard.status[status] ?? status}
    </span>
  );
}
