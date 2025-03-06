import { useQueryClient } from "@tanstack/react-query";
import {
  useTicketsAggregated,
  UseTicketsAggregatedFilter,
} from "client/src/hooks/use-tickets-aggregated";
import { useAssignTicket } from "client/src/lib/api/ticket/assign-ticket";
import { useCreateTicket } from "client/src/lib/api/ticket/create-ticket";
import { useTickets } from "client/src/lib/api/ticket/get-tickets";
import { useMarkAsComplete } from "client/src/lib/api/ticket/mark-as-complete";
import { useMarkAsInComplete } from "client/src/lib/api/ticket/mark-as-incomplete";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddTicket from "./components/add-ticket";
import TicketAssignee, {
  TicketAssigneeProps,
} from "./components/ticket-assignee";
import TicketList, { TicketListProps } from "./components/ticket-list";
import TicketListFilter, {
  FilterChangeValue,
} from "./components/ticket-list-filter";
import { useFilterStatus } from "./hooks/use-filter-status";

export interface TicketsProps {}

export function Tickets(props: TicketsProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { status, setStatus } = useFilterStatus();

  const {
    data: tickets,
    isLoading,
    isFetching,
    original: { users },
  } = useTicketsAggregated({
    filter: { status: status as UseTicketsAggregatedFilter["status"] },
  });

  const { mutate: createTicket, isPending: isCreatingTicket } = useCreateTicket(
    {
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: useTickets.getKey() });

        toast.success("Ticket created successfully");
      },
      onError(error) {
        toast.error(
          error?.message || "Something went wrong, please try again."
        );
      },
    }
  );

  const { mutate: markAsComplete } = useMarkAsComplete({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: useTickets.getKey() });
    },

    onError(error) {
      toast.error(error?.message || "Mark as complete or incomplete failed");
    },
  });

  const { mutate: markAsInComplete } = useMarkAsInComplete({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: useTickets.getKey() });
    },

    onError(error) {
      toast.error(error?.message || "Mark as complete or incomplete failed");
    },
  });

  const { mutate: assignTicketTo } = useAssignTicket({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: useTickets.getKey() });
    },

    onError(error) {
      toast.error(error?.message || "Mark as complete or incomplete failed");
    },
  });

  const handleAddTicket = (value: string) => {
    createTicket({
      description: value,
    });
  };

  const handleFilterChange = (values: FilterChangeValue) => {
    setStatus(values.status as string);
  };

  const handleToggleMarkAsCompleteTicket: TicketListProps["onToggleMarkAsCompleteTicket"] =
    (id, isCompleted) => {
      if (isCompleted) {
        markAsComplete({ id });
      } else {
        markAsInComplete({ id });
      }
    };

  const handleTicketAssigneeChange: TicketAssigneeProps["onAssigneeChange"] = (
    ticketId,
    userId
  ) => {
    assignTicketTo({ ticketId, userId });
  };

  const handleNavigateToTicketDetails: TicketListProps["onNavigateToTicketDetails"] =
    (id) => {
      navigate(`/${id}`);
    };

  return (
    <div>
      <h2 className="text-base font-semibold">Tickets</h2>

      <AddTicket className="my-2" onAddTicket={handleAddTicket} />
      <TicketListFilter className="mb-2" onFilterChange={handleFilterChange} />
      <TicketList
        tickets={tickets}
        loading={isLoading || isFetching || isCreatingTicket}
        onToggleMarkAsCompleteTicket={handleToggleMarkAsCompleteTicket}
        onNavigateToTicketDetails={handleNavigateToTicketDetails}
        assigneeComponent={
          <TicketAssignee
            users={users || []}
            onAssigneeChange={handleTicketAssigneeChange}
            className="ml-2"
          />
        }
      />
    </div>
  );
}

export default Tickets;
