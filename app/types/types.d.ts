import type { StyleProp } from "react"
import type { UseMutationOptions } from "@tanstack/react-query"

type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type UseMutationCallbacks<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Pick<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "onMutate" | "onSuccess" | "onError" | "onSettled"
>

export type OmitChildren<T> = Omit<T, "children">

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export type StylePropOfComponent<P> = StyleProp<
  P extends {
    style: StyleProp<infer InferredStyle>
  }
    ? InferredStyle
    : ViewStyle
>

export type PropsWithStyle<S = any, P = unknown> = P & {
  style?: StyleProp<S>
}

export type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
