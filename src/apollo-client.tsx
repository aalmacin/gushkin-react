import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_PATH,
})


const authMiddleware = new ApolloLink((operation: any, forward: any): any => {
  const token = localStorage.getItem('jwt')
  operation.setContext({
    headers: {
      Authorization: (token && `Bearer ${token}`) || null
    }
  })
  return forward(operation);
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
})