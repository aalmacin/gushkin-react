import React, { createContext } from "react";
import { ApolloError, useQuery } from "@apollo/react-hooks";
import { GetCurrentFunds } from "./Funds.queries";

type Refetch = () => void

type GetCurrentFundsContextValues = { currentFunds: number, refetch: Refetch, loading?: boolean, error?: ApolloError }

const noop = () => { }

export const GetCurrentFundsContext = createContext<GetCurrentFundsContextValues>({ currentFunds: 0, refetch: noop })

export const GetCurrentFundsProvider: React.FC = ({ children }) => {
  const { data, refetch, loading, error } = useQuery(GetCurrentFunds)
  const currentFunds = (data && data.currentFunds) || []

  return <GetCurrentFundsContext.Provider value={{ currentFunds, refetch, loading, error }}>
    {children}
  </GetCurrentFundsContext.Provider>
}