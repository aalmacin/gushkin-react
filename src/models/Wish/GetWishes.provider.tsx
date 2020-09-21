import React, { createContext } from "react";
import { GetWishes } from "models/Wish/Wish.queries";
import { ApolloError, useQuery } from "@apollo/client";
import { StoreItem } from "pages/main/store/graphql/Store.types";

type Refetch = () => void;

// export type StoreItem = Partial<Wish & { readonly isInCart: boolean; readonly priceDisplay: string; }>;

type GetWishesContextValues = { wishes: StoreItem[], refetch: Refetch, loading?: boolean, error?: ApolloError; };

const noop = () => { };

export const GetWishesContext = createContext<GetWishesContextValues>({ wishes: [], refetch: noop });

export const GetWishesProvider: React.FC = ({ children }) => {
  const { data, refetch, loading, error } = useQuery(GetWishes);
  const wishes = (data && data.wishes) || [];

  return <GetWishesContext.Provider value={{ wishes, refetch, loading, error }}>
    {children}
  </GetWishesContext.Provider>;
};