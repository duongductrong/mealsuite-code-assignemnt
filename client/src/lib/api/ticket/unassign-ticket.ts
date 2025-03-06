import { Ticket, User } from "@acme/shared-models";
import { createMutation } from "react-query-kit";
import { consumerApi } from "..";

export interface Variables {
  ticketId: Ticket["id"];
}

export interface Response {}

export const unassignTicket = async ({ ticketId }: Variables) => {
  const response = await consumerApi.put<Response>(
    `/tickets/${ticketId}/unassign`
  );
  return response.data;
};

export const unassignTicketKey = "unassignTicket";

export const useUnassignTicket = createMutation<Response, Variables>({
  mutationKey: [unassignTicketKey],
  mutationFn: unassignTicket,
});
