import { Ticket } from "@acme/shared-models";
import { createMutation } from "react-query-kit";
import { consumerApi } from "..";

export interface Variables {
  id: Ticket["id"];
}

export interface Response {}

export const markAsInComplete = async (variables?: Variables) => {
  const response = await consumerApi.delete<Response>(
    `/tickets/${variables?.id}/complete`
  );
  return response.data;
};

export const markAsInCompleteKey = "markAsInComplete";

export const useMarkAsInComplete = createMutation<Response, Variables>({
  mutationKey: [markAsInCompleteKey],
  mutationFn: markAsInComplete,
});
