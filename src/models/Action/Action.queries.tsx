import { gql } from "@apollo/react-hooks"

const Actions = gql`
  query Actions {
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
`

export function getActions() {
  console.log('Get Actions', Actions)
}