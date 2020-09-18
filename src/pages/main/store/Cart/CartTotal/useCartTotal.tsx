import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export const CART_TOTAL = gql`
  query cartTotal {
    cartTotal @client
  }
`;
const useCartTotal = () => {
  const { data, ...rest } = useQuery(CART_TOTAL);
  if (!data) {
    return { cartTotal: 0, data, ...rest };
  }
  return { cartTotal: data.cartTotal, data, ...rest };
};

export default useCartTotal;