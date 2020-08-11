import { useContext } from "react"
import { GetTodaysActionsContext } from "./GetTodaysActions.provider"

export const useGetTodaysActions = () => {
  return useContext(GetTodaysActionsContext)
}