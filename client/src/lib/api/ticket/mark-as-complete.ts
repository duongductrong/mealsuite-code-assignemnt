import { Ticket } from "@acme/shared-models";
import { createMutation } from "react-query-kit";
import { consumerApi } from "..";

export interface Variables {
  id: Ticket["id"];
}

export interface Response {}

export const markAsComplete = async (variables?: Variables) => {
  const response = await consumerApi.put<Response>(
    `/tickets/${variables?.id}/complete`
  );
  return response.data;
};

export const markAsCompleteKey = "markAsComplete";

export const useMarkAsComplete = createMutation<Response, Variables>({
  mutationKey: [markAsCompleteKey],
  mutationFn: markAsComplete,
});
