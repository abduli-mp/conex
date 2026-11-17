import { MdExpandMore } from "react-icons/md";

import type { Ticket } from "../../api/useTickets";
import { useLang } from "../../i18n/useLang";
import StatusBadge from "./StatusBadge";
import StatusTrack from "./StatusTrack";
import { formatDate, isPlainEmail, longDateTime, shortDateTime, shortId } from "./format";

type Props = {
  ticket: Ticket;
  open: boolean;
  onToggle: () => void;
};

export default function TicketRow({ ticket, open, onToggle }: Props) {
  const { lang, t } = useLang();
  const d = t.dashboard;
  const panelId = `ticket-${ticket.task_id}`;
  const { employer } = ticket;

  return (
    <li className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={`grid w-full cursor-pointer grid-cols-[1fr_auto] items-start gap-x-4 gap-y-3 px-6 py-5 text-left transition-colors hover:bg-surface md:grid-cols-[6.5rem_1fr_7.5rem_11rem_1.25rem] md:items-center md:px-10 ${
          open ? "bg-surface" : ""
        }`}
      >
        <span className="order-3 font-mono text-xs text-muted md:order-none md:text-sm">
          {shortId(ticket.task_id)}
        </span>

        <span className="order-1 min-w-0 md:order-none">
          <span className="block font-medium">{ticket.service?.name ?? d.unknown}</span>
          {!open && (
            <span className="mt-1 block truncate text-sm text-muted">
              {ticket.problem_description}
            </span>
          )}
        </span>

        <span className="order-2 justify-self-end md:order-none md:justify-self-start">
          <StatusBadge status={ticket.status} />
        </span>

        <time
          dateTime={ticket.created_at}
          className="order-4 text-right text-xs tabular-nums text-muted md:order-none md:text-sm"
        >
          {formatDate(ticket.created_at, lang, shortDateTime)}
        </time>

        <MdExpandMore
          aria-hidden="true"
          className={`hidden size-5 text-muted transition-transform duration-150 md:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          id={panelId}
          className="border-t border-border bg-surface px-6 py-7 md:pl-40 md:pr-10"
        >
          {ticket.status !== "cancelled" && <StatusTrack status={ticket.status} />}

          <dl className="mt-7 space-y-5 text-sm first:mt-0">
            <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-x-6">
              <dt className="font-mono text-xs text-muted sm:pt-0.5">{d.fields.problem}</dt>
              <dd className="whitespace-pre-line break-words">{ticket.problem_description}</dd>
            </div>

            <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-x-6">
              <dt className="font-mono text-xs text-muted sm:pt-0.5">{d.fields.assignee}</dt>
              <dd>
                {employer ? (
                  <>
                    <span className="font-medium">{employer.name}</span>
                    {employer.email && (
                      <>
                        <span className="text-muted"> · </span>
                        {isPlainEmail(employer.email) ? (
                          <a
                            href={`mailto:${employer.email}`}
                            className="break-all text-primary underline underline-offset-4"
                          >
                            {employer.email}
                          </a>
                        ) : (
                          <span className="break-all text-muted">{employer.email}</span>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-muted">
                    {ticket.employer_id ? d.unknown : d.unassigned}
                  </span>
                )}
              </dd>
            </div>

            <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-x-6">
              <dt className="font-mono text-xs text-muted sm:pt-0.5">{d.fields.service}</dt>
              <dd>{ticket.service?.name ?? d.unknown}</dd>
            </div>

            <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-x-6">
              <dt className="font-mono text-xs text-muted sm:pt-0.5">{d.fields.created}</dt>
              <dd>
                <time dateTime={ticket.created_at}>
                  {formatDate(ticket.created_at, lang, longDateTime)}
                </time>
              </dd>
            </div>

            <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-x-6">
              <dt className="font-mono text-xs text-muted sm:pt-0.5">{d.fields.id}</dt>
              <dd className="break-all font-mono text-xs text-muted">{ticket.task_id}</dd>
            </div>
          </dl>
        </div>
      )}
    </li>
  );
}
