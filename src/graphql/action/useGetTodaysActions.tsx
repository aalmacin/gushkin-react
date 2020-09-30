import { useQuery } from "@apollo/client";
import { GetActionsResponse, GET_ACTIONS } from "./useGetActions";

export interface GetActionInput {
  today: boolean;
}

interface GetTodaysActionsVars {
  input: GetActionInput;
}

export const useGetTodaysActions = () => {
  const { data, loading, error } = useQuery<GetActionsResponse, GetTodaysActionsVars>(GET_ACTIONS, {
    variables: { input: { today: true } }
  });
  const actions = (data && data.actions) || [];
  return { actions, loading, error };
};