import { gql, useQuery } from "@apollo/client";
import { Action } from "./Action.types";

export interface GetActionsResponse {
  actions: Action[];
}

export const GET_ACTIONS = gql`
  query Actions($input: GetActionInput) {
    actions(input: $input) {
        id
        actionTimestamp
        activity {
          id
          description
          positive
          fundAmt
        }
    }
  }
`;

export const useGetActions = () => {
  const { data, loading, error } = useQuery<GetActionsResponse>(GET_ACTIONS);
  const actions = (data && data.actions) || [];
  return { actions, loading, error };
};