import { gql, useQuery } from "@apollo/client";
import { StoreItem } from "./Store.types";

export const GET_STORE_ITEMS = gql`
  query getStoreItems {
    wishes {
      id
      description
      price
      priceDisplay @client
      source
      priority
      status
      isInCart @client
    }
  }
`;

interface GetWishResponse {
  wishes: StoreItem[];
}

const useGetStoreItems = () => {
  const { data, ...rest } = useQuery<GetWishResponse>(GET_STORE_ITEMS);
  const storeItems = data?.wishes || [];
  return { storeItems, ...rest };
};

export default useGetStoreItems;
