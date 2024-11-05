import React, { FC, ReactNode } from "react"
import { StyleProp, TextStyle } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { colors } from "app/theme"
import { IconProps } from "./Icon"

export type IconName = keyof typeof Ionicons.glyphMap

export interface Icon2Props {
  name: IconName
  size?: IconProps["size"] | undefined
  color?: string | undefined
  allowFontScaling?: boolean | undefined
  style?: StyleProp<TextStyle> | undefined
  children?: ReactNode | undefined
}

export const IconNew: FC<Icon2Props> = ({ size = 20, color, ...props }) => {
  return <Ionicons size={size} color={color || colors.text} {...props} />
}
