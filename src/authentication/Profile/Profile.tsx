import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import config from "auth_config.json";
import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const Profile: React.FC = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getToken = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: config.audience
    })

    const client = new ApolloClient({
      uri: "http://localhost:8080/query",
      cache: new InMemoryCache(),
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    })
    client.query({
      query: gql`
        query GetActivities {
          activities {
            id
            description
            positive
            fundAmt
            actions {
              id
              actionTimestamp
              activity {
                id
                description
                positive
                fundAmt
              }
            }
          }
        }
      `
    }).then(res => console.log(res))
  }

  if (!isAuthenticated) {
    return null
  }

  getToken()

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;