import { gql } from "@apollo/client"
import { ActivityInput } from "./Activity.types"

const CreateActivity = gql`
  mutation CreateActivity($description: String!, $fundAmt: Int!, $positive: Bool!) {
    createActivity(input: {
      description: $description
      fundAmt: $fundAmt
      positive: $positive
    }) {
          id
          description
          positive
          fundAmt
    }
  }
`

export function createActivity(activity: ActivityInput) {
  console.log("Create Activity", CreateActivity, activity)
}