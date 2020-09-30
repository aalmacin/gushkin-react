import { gql, MutationHookOptions, useMutation } from "@apollo/client";

export interface CreateWishInput {
  description: string;
  price: number;
  source?: string;
  priority: Priority;
  status: Status;
}

export enum Priority {
  VERY_HIGH = 'VERY_HIGH',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  VERY_LOW = 'VERY_LOW',
}

export enum Status {
  bought = 'bought',
  not_bought = 'not_bought',
  disabled = 'disabled',
}

export interface Wish {
  readonly id: string,
  readonly description: string,
  readonly userId: string,
  readonly price: number,
  readonly source?: string,
  readonly priority: string,
  readonly status: string;
}

export const CREATE_WISH = gql`
  mutation CreateWish($price: Int!, $description: String!, $priority: Priority!, $status: Status!, $source: String) {
    createWish(input: {
      price: $price
      description: $description
      priority: $priority
      status: $status
      source: $source
    }) {
      id
      description
      price
      source
      priority
      status
    }
  }
`;

export const useCreateWish = (options: MutationHookOptions) => {
  const [createWish] = useMutation(CREATE_WISH, options);
  return { createWish };
};