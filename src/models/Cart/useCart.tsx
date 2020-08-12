import { useContext } from "react"
import { CartContext } from "./Cart.provider"

export const useCart = () => {
  return useContext(CartContext)
}