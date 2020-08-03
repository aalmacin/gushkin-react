import { gql } from "@apollo/client"
import { PerformActivityInput } from "./Action.types"

const PerformActivity = gql`
  mutation PerformActivity($activityId: Int!) {
    performActivity(input: {activityId: $activityId}) {
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

export function performActivity(input: PerformActivityInput) {
  console.log("Perform Activity", PerformActivity, input)
}