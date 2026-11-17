import type { TaskStatus } from "../../api/ConexTypes";
import { useLang } from "../../i18n/useLang";

const stages: TaskStatus[] = ["open", "in_progress", "done"];

export default function StatusTrack({ status }: { status: TaskStatus }) {
  const { t } = useLang();
  const current = stages.indexOf(status);

  return (
    <ol className="grid max-w-md grid-cols-3 gap-2">
      {t.dashboard.track.map((label, index) => (
        <li
          key={label}
          aria-current={index === current ? "step" : undefined}
          className={`border-t-2 pt-2 font-mono text-xs ${
            index <= current
              ? "border-primary text-foreground"
              : "border-border text-muted"
          }`}
        >
          {label}
        </li>
      ))}
    </ol>
  );
}
