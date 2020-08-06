import { useContext } from "react"
import { GetTodaysActivitiesContext } from "./GetTodaysActivities.provider"

export const useGetTodaysActivities = () => {
  return useContext(GetTodaysActivitiesContext)
}