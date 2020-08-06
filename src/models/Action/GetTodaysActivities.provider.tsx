import { Action } from "models/Action/Action.types";
import React, { createContext } from "react";
import { ApolloError, useQuery } from "@apollo/react-hooks";
import { GetActions } from "models/Action/Action.queries";

type Refetch = () => void

type GetTodaysActivitiesContextValues = { activities: Action[], refetch: Refetch, loading?: boolean, error?: ApolloError }

const noop = () => { }

export const GetTodaysActivitiesContext = createContext<GetTodaysActivitiesContextValues>({ activities: [], refetch: noop })

export const GetTodaysActivitiesProvider: React.FC = ({ children }) => {
  const { data, refetch, loading, error } = useQuery(GetActions)
  const activities = (data && data.activities) || []

  return <GetTodaysActivitiesContext.Provider value={{ activities, refetch, loading, error }}>
    {children}
  </GetTodaysActivitiesContext.Provider>
}