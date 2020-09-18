import { Action } from "models/Action/Action.types";
import React, { createContext } from "react";
import { GetActions } from "models/Action/Action.queries";
import { ApolloError, useQuery } from "@apollo/client";

type Refetch = () => void;

type GetActionsContextValues = { actions: Action[], refetch: Refetch, loading?: boolean, error?: ApolloError; };

const noop = () => { };

export const GetActionsContext = createContext<GetActionsContextValues>({ actions: [], refetch: noop });

export const GetActionsProvider: React.FC = ({ children }) => {
  const { data, refetch, loading, error } = useQuery(GetActions);
  const actions = (data && data.actions) || [];

  return <GetActionsContext.Provider value={{ actions, refetch, loading, error }}>
    {children}
  </GetActionsContext.Provider>;
};