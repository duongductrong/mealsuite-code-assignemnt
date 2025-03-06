import { TicketAggregated } from "@acme/shared-models";
import Loading from "client/src/components/loading";
import { cloneElement, ReactElement, ReactNode } from "react";

export interface TicketListProps {
  tickets?: TicketAggregated[];
  loading?: boolean;

  assigneeComponent?: ReactNode;

  onToggleMarkAsCompleteTicket?: (
    id: TicketAggregated["id"],
    isCompleted?: boolean
  ) => void;
}

const TicketList = ({
  tickets,
  loading,
  assigneeComponent,
  onToggleMarkAsCompleteTicket,
}: TicketListProps) => {
  if (!tickets?.length) return <div>Data not found</div>;

  return (
    <section className="relative">
      <ul>
        {tickets?.map((ticket) => (
          <li key={ticket.id}>
            <span className={ticket.completed ? "line-through" : ""}>
              Ticket: {ticket.id} - {ticket.description}
            </span>

            {assigneeComponent
              ? cloneElement(assigneeComponent as ReactElement, {
                  defaultValue: ticket.user?.id,
                  ticketId: ticket.id,
                })
              : null}

            <button
              onClick={() =>
                onToggleMarkAsCompleteTicket?.(ticket.id, !ticket?.completed)
              }
              className="ml-2 bg-black text-white px-1 rounded-sm text-xs"
            >
              {ticket.completed ? "Undo" : "Mark as Completed"}
            </button>
          </li>
        ))}
      </ul>

      {loading ? (
        <div className="flex items-center gap-1">
          <Loading /> Executing...
        </div>
      ) : null}
    </section>
  );
};

export default TicketList;
