import { Ticket } from "@acme/shared-models";
import { createQuery } from "react-query-kit";
import { consumerApi } from "..";

export interface Variables {
  id: Ticket["id"];
}

export interface Response extends Ticket {}

export const getTicket = async (variables: Variables) => {
  const response = await consumerApi.get<Response>(`/tickets/${variables.id}`);
  return response.data;
};

export const getTicketKey = "getTicket";

export const useTicket = createQuery<Response, Variables>({
  queryKey: [getTicketKey],
  fetcher: getTicket,
});
