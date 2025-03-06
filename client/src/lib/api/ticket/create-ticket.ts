import { Ticket } from "@acme/shared-models";
import { createMutation } from "react-query-kit";
import { consumerApi } from "..";

export interface Variables {
  description: string;
}

export interface Response extends Ticket {}

export const createTicket = async (variables?: Variables) => {
  const response = await consumerApi.post<Response>("/tickets", variables);
  return response.data;
};

export const createTicketKey = "createTicket";

export const useCreateTicket = createMutation<Response, Variables>({
  mutationKey: [createTicketKey],
  mutationFn: createTicket,
});
