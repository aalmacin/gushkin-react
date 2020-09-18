import { makeVar } from "@apollo/client";
import { StoreItem } from "models/Wish/GetWishes.provider";

export const cartReactiveVar = makeVar<StoreItem[]>([]);

export const addToCart = (wish: StoreItem) => {
  const currentItems = cartReactiveVar();
  cartReactiveVar([...currentItems, wish]);
};

export const removeFromCart = (wish: StoreItem) => {
  const currentItems = cartReactiveVar();
  cartReactiveVar(currentItems.filter((c) => c.id !== wish.id));
};
