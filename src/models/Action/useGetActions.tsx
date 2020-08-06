import { useContext } from "react"
import { GetActionsContext } from "./GetActions.provider"

export const useGetActions = () => {
  return useContext(GetActionsContext)
}