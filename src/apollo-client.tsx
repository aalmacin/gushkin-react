import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from "@apollo/client";
import { displayNormalMoney } from "functions/utils.functions";
import { cartReactiveVar } from "graphql/cart/Cart.local";
import { GetCartItemsResponse, GET_CART_ITEMS } from "graphql/cart/useCart";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_PATH,
});


const authMiddleware = new ApolloLink((operation: any, forward: any): any => {
  const token = localStorage.getItem('jwt');
  operation.setContext({
    headers: {
      Authorization: (token && `Bearer ${token}`) || null
    }
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          currentFunds: {
            read: (val) => {
              if (val) {
                return displayNormalMoney(val);
              }
              return val;
            }
          },
          cart: {
            read: () => {
              return cartReactiveVar();
            }
          },
          cartTotal: {
            read: () => {
              return displayNormalMoney(cartReactiveVar().reduce((acc, cartItem) => acc + (cartItem?.price || 0), 0));
            }
          }
        }
      },
      Wish: {
        fields: {
          priceDisplay: {
            read: (_, { readField }) => {
              const price = readField<number>("price");
              if (!price) {
                return 0;
              }
              return displayNormalMoney(price);
            }
          },
          isInCart: {
            read: (_, { cache, readField }) => {
              const val = readField("id");
              const cartItems = cache.readQuery<GetCartItemsResponse>({ query: GET_CART_ITEMS });
              return cartItems?.cart?.find(i => i.id === val) || false;
            }
          }
        }
      },
      Cart: {
        fields: {
        }
      }
    }
  }),
  link: concat(authMiddleware, httpLink),
});