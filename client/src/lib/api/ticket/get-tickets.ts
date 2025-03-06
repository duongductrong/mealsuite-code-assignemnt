import { Ticket } from "@acme/shared-models";
import { createQuery } from "react-query-kit";
import { consumerApi } from "..";

export interface Variables {
  status?: string;
}

export interface Response extends Array<Ticket> {}

export const getTickets = async (variables?: Variables) => {
  const response = await consumerApi.get<Response>("/tickets", {
    params: variables,
  });
  return response.data;
};

export const getTicketsKey = "getTickets";

export const useTickets = createQuery<Response, Variables>({
  queryKey: [getTicketsKey],
  fetcher: getTickets,
});
