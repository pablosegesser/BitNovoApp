import { ReactNode } from "react"
import { ViewStyle } from "react-native"

export type PersonalInformationAddress = {
  number: number
  address: string
  zipcode: string
  floor?: number
  province: string
  city: string
  crossStreets: string
  aditionalInformation?: string
  apartment?: string
}

export type PaginationParams = {
  page: number
  limit: number
}

export type SvgIconProps = {
  color?: string
  size?: number
  styles?: ViewStyle
}

export interface PaginationResponse<T> {
  page: number
  limit: number
  pages: number
  total: number
  hasNextPage: boolean
  results: T[]
}

export interface Country {
  code: string
  name: string
}

export type RenderProps<P> = (props: P) => ReactNode

export type FiatCurrency = "EUR" | "USD" | "GBP"
