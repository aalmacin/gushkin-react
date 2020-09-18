import { Activity } from "models/Activity/Activity.types";
import React, { createContext } from "react";
import { GetActivities } from "models/Activity/Activity.queries";
import { ApolloError, useQuery } from "@apollo/client";

type Refetch = () => void;

type GetActivitiesContextValues = { activities: Activity[], refetch: Refetch, loading?: boolean, error?: ApolloError; };

const noop = () => { };

export const GetActivitiesContext = createContext<GetActivitiesContextValues>({ activities: [], refetch: noop });

export const GetActivitiesProvider: React.FC = ({ children }) => {
  const { data, refetch, loading, error } = useQuery(GetActivities);
  const activities = (data && data.activities) || [];

  return <GetActivitiesContext.Provider value={{ activities, refetch, loading, error }}>
    {children}
  </GetActivitiesContext.Provider>;
};