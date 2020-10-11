import { gql, useQuery } from "@apollo/client";

export const GET_CURRENT_FUNDS = gql`
  query GetCurrentFunds {
    currentFunds
  }
`;

interface GetCurrentFundsProps {
  currentFunds: number;
}

export const useGetCurrentFunds = () => {
  const { data, loading, error } = useQuery<GetCurrentFundsProps>(GET_CURRENT_FUNDS);
  const currentFunds = (data && data.currentFunds) || 0;
  return { currentFunds, data, loading, error };
};