import { Action } from "models/Action/Action.types";
import React, { createContext } from "react";
import { GetActions } from "models/Action/Action.queries";
import { ApolloError, useQuery } from "@apollo/client";

type Refetch = () => void;

type GetTodaysActionsContextValues = { actions: Action[], refetch: Refetch, loading?: boolean, error?: ApolloError; };

const noop = () => { };

export const GetTodaysActionsContext = createContext<GetTodaysActionsContextValues>({ actions: [], refetch: noop });

export const GetTodaysActionsProvider: React.FC = ({ children }) => {
  const { data, refetch, loading, error } = useQuery(GetActions, {
    variables: { input: { today: true } }
  });
  const actions = (data && data.actions) || [];

  return <GetTodaysActionsContext.Provider value={{ actions, refetch, loading, error }}>
    {children}
  </GetTodaysActionsContext.Provider>;
};