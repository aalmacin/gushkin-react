import { useContext } from "react"
import { GetWishesContext } from "./GetWishes.provider"

export const useGetWishes = () => {
  return useContext(GetWishesContext)
}