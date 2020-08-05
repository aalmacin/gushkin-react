import { useContext } from "react"
import { GetActivitiesContext } from "./GetActivities.provider"

export const useGetActivities = () => {
  return useContext(GetActivitiesContext)
}