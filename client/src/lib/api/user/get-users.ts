import { User } from "@acme/shared-models";
import { createQuery } from "react-query-kit";
import { consumerApi } from "..";

export interface Variables {
  status?: string;
}

export interface Response extends Array<User> {}

export const getUsers = async (variables?: Variables) => {
  const response = await consumerApi.get<Response>("/users", {
    params: variables,
  });
  return response.data;
};

export const getUsersKey = "getUsers";

export const useUsers = createQuery<Response, Variables>({
  queryKey: [getUsersKey],
  fetcher: getUsers,
});
