import { gql } from "@apollo/react-hooks"

export interface GetActionInput {
  today: boolean
}

export const GetActions = gql`
  query Actions($input: $GetActionInput) {
    actions(input: $input) {
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
`