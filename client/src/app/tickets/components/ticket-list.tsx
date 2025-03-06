import { TicketAggregated } from "@acme/shared-models";
import Loading from "client/src/components/loading";
import { cn } from "client/src/lib/tw";
import { cloneElement, ReactElement, ReactNode } from "react";

export interface TicketListProps {
  tickets?: TicketAggregated[];
  loading?: boolean;

  assigneeComponent?: ReactNode;

  onNavigateToTicketDetails?: (id: TicketAggregated["id"]) => void;

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
  onNavigateToTicketDetails,
}: TicketListProps) => {
  if (!tickets?.length) return <div>Data not found</div>;

  return (
    <section className="relative">
      <ul>
        {tickets?.map((ticket) => (
          <li key={ticket.id} title="Click to view details">
            <span
              onClick={() => onNavigateToTicketDetails?.(ticket.id)}
              className={cn(
                ticket.completed ? "line-through" : "",
                "cursor-pointer"
              )}
            >
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
