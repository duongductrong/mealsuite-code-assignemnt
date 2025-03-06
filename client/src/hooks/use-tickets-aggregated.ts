import { TicketAggregated, User } from "@acme/shared-models";
import { useMemo } from "react";
import { useTickets } from "../lib/api/ticket/get-tickets";
import { useUsers } from "../lib/api/user/get-users";

export interface UseTicketsAggregatedFilter {
  status?: "completed" | "incomplete" | "all";
}

export interface UseTicketsAggregatedVariables {
  filter?: UseTicketsAggregatedFilter;
}

export const useTicketsAggregated = (
  variables?: UseTicketsAggregatedVariables
) => {
  const {
    data: tickets,
    isLoading: isLoadingTickets,
    isFetching: isFetchingTickets,
  } = useTickets();

  const {
    data: users,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useUsers();

  const filterByStatus = useMemo(
    () => variables?.filter?.status,
    [variables?.filter?.status]
  );

  const userMapWithKeyId = useMemo(() => {
    return users?.reduce((groupUser, user) => {
      return {
        ...groupUser,
        [user.id]: user,
      };
    }, {} as Record<number, User>)!;
  }, [users]);

  const data = useMemo<TicketAggregated[]>(() => {
    return (
      tickets?.map((ticket) => {
        return {
          ...ticket,
          user: ticket.assigneeId
            ? userMapWithKeyId?.[ticket.assigneeId]
            : null,
        };
      }) ?? []
    );
  }, [tickets, users]);

  const filteredData = useMemo(() => {
    return data.filter((ticket) => {
      if (filterByStatus === "completed") {
        return ticket.completed;
      }

      if (filterByStatus === "incomplete") {
        return !ticket.completed;
      }

      return true;
    });
  }, [data, filterByStatus]);

  console.log("data", tickets);

  return {
    data: filteredData,
    isLoading: isLoadingTickets || isLoadingUsers,
    isFetching: isFetchingTickets || isFetchingUsers,

    original: {
      tickets,
      users,
    },
  };
};
