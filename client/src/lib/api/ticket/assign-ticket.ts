import { Ticket, User } from "@acme/shared-models";
import { createMutation } from "react-query-kit";
import { consumerApi } from "..";

export interface Variables {
  ticketId: Ticket["id"];
  userId: User["id"];
}

export interface Response {}

export const assignTicket = async ({ ticketId, userId }: Variables) => {
  const response = await consumerApi.put<Response>(
    `/tickets/${ticketId}/assign/${userId}`
  );
  return response.data;
};

export const assignTicketKey = "assignTicket";

export const useAssignTicket = createMutation<Response, Variables>({
  mutationKey: [assignTicketKey],
  mutationFn: assignTicket,
});
