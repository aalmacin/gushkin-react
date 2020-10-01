import { Maybe } from "./types";

export type Compact<A> = { [K in keyof A]: A[K] }

export type RemoveMaybe<T, O extends string = "__typename"> = {
  [k in keyof Omit<T, "__typename" | O>]-?: T[k] extends Maybe<infer G> ? G : T[k]
}

export type DeepRemoveMaybe<T, O extends string = "__typename"> = {
  [k in keyof Omit<T, "__typename" | O>]-?: T[k] extends Maybe<infer G> ? 
    G extends Maybe<infer Q> ? G extends object ? DeepRemoveMaybe<G> : G : G
   : T[k]
}