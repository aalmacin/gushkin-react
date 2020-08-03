import { gql } from "@apollo/client"

const GetActivities = gql`
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

export function getActivities() {
  console.log('Get Activities', GetActivities)
}