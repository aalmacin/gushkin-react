import { Wish } from "graphql/types";

export type StoreItem = Wish & { readonly priceDisplay: string, readonly isInCart: boolean }