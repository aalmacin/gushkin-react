import { useState } from "react";
import { CreateWishInput, Priority, Status, useCreateWish } from "./graphql/useCreateWish";

interface WishFormUILogicProps {
  onCompleted?: Function;
}

export const useWishFormUILogic = ({ onCompleted }: WishFormUILogicProps) => {
  const { createWish } = useCreateWish({
    onCompleted: () => {
      if (onCompleted) {
        onCompleted();
      }
    }
  });

  // Form State
  const [wish, setWish] = useState<CreateWishInput>({
    description: "",
    price: 0,
    source: "",
    priority: Priority.VERY_HIGH,
    status: Status.not_bought
  });
  return { wish, setWish, createWish };
};