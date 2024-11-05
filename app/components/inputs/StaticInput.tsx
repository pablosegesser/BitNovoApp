import React, { type FC, ReactNode } from "react"
import { type StyleProp, StyleSheet, type TextStyle } from "react-native"
import { InputDecorator, InputDecoratorProps } from "../InputDecorator"
import { Text } from "../Text"
import { OmitChildren } from "app/types/types"
import { colors } from "app/theme"

export interface StaticInputProps extends OmitChildren<InputDecoratorProps> {
  value?: string | ReactNode | undefined
  placeholder?: string | undefined
  placeholderStyle?: StyleProp<TextStyle>
}

export const StaticInput: FC<StaticInputProps> = ({
  value,
  placeholder,
  placeholderStyle,
  ...props
}) => {
  return (
    <InputDecorator {...props}>
      {value !== undefined ? (
        typeof value === "string" ? (
          <Text>{value}</Text>
        ) : (
          value
        )
      ) : (
        placeholder !== undefined && (
          <Text style={[styles.placeholder, placeholderStyle]}>{placeholder}</Text>
        )
      )}
    </InputDecorator>
  )
}
interface Styles {
  placeholder: TextStyle
}

const styles = StyleSheet.create<Styles>({
  placeholder: {
    color: colors.text,
  },
})
