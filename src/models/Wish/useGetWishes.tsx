import { useContext } from "react";
import { GetWishesContext } from "./GetWishes.provider";

const useGetWishes = () => {
  return useContext(GetWishesContext);
};