import { Wish } from "models/Wish/Wish.types";
import React, { createContext } from "react";
import { ApolloError, useQuery } from "@apollo/react-hooks";
import { GetWishes } from "models/Wish/Wish.queries";

type Refetch = () => void

type GetWishesContextValues = { wishes: Wish[], refetch: Refetch, loading?: boolean, error?: ApolloError }

const noop = () => { }

export const GetWishesContext = createContext<GetWishesContextValues>({ wishes: [], refetch: noop })

export const GetWishesProvider: React.FC = ({ children }) => {
  const { data, refetch, loading, error } = useQuery(GetWishes)
  const wishes = (data && data.wishes) || []

  return <GetWishesContext.Provider value={{ wishes, refetch, loading, error }}>
    {children}
  </GetWishesContext.Provider>
}