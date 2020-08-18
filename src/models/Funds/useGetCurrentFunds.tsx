import { useContext } from "react"
import { GetCurrentFundsContext } from "./GetCurrentFunds.provider"

export const useGetCurrentFunds = () => {
  return useContext(GetCurrentFundsContext)
}