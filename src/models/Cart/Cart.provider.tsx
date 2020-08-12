import React, { createContext, useReducer } from "react";
import { Wish } from "models/Wish/Wish.types";

type AddToCartAction = {
  type: 'ADD_TO_CART',
  payload: Wish
}

type RemoveFromCartAction = {
  type: 'REMOVE_FROM_CART',
  payload: string
}

type CartState = Wish[]
type CartActions = AddToCartAction | RemoveFromCartAction
type CartContextValues = { wishes: Wish[], addToCart: (wish: Wish) => void, removeFromCart: (id: string) => void, cartTotal: number }

const noop = () => { }

export const CartContext = createContext<CartContextValues>({ wishes: [], addToCart: noop, removeFromCart: noop, cartTotal: 0 })

type CartReducer = (prevState: CartState, action: CartActions) => CartState

const cartReducer: CartReducer = (state: CartState, action: CartActions) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload]
    case 'REMOVE_FROM_CART':
      return state.filter(s => s.id !== action.payload)
    default:
      throw new Error("Invalid action")
  }
}

const addToCartAction = (wish: Wish): AddToCartAction => ({ type: 'ADD_TO_CART', payload: wish })
const removeFromCartAction = (id: string): RemoveFromCartAction => ({ type: 'REMOVE_FROM_CART', payload: id })

const initialCart: CartState = []

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCart)

  const addToCart = (wish: Wish) => {
    dispatch(addToCartAction(wish))
  }

  const removeFromCart = (id: string) => {
    dispatch(removeFromCartAction(id))
  }

  const wishes = state

  const cartTotal = wishes.reduce((acc, curr) => acc + curr.price, 0)

  return <CartContext.Provider value={{ wishes, addToCart, removeFromCart, cartTotal }}>
    {children}
  </CartContext.Provider>
}