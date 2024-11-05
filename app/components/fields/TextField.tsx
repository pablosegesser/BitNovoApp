import React, { forwardRef } from "react"

import { Field, type FieldProps } from "../Field"
import { TextInput, type TextInputProps, type TextInputType } from "../TextInput"
import { ViewStyle } from "react-native"
import { colors } from "app/theme"

export interface TextFieldProps extends Omit<FieldProps<TextInputProps>, "renderInput"> {}

// eslint-disable-next-line react/display-name
export const TextField = forwardRef<TextInputType, TextFieldProps>((props, ref) => (
  <Field
    renderInput={(inputProps) => (
      <TextInput ref={ref} style={[$style, inputProps.style]} {...inputProps} />
    )}
    {...props}
  />
))

const $style: ViewStyle = {
  borderColor: colors.newPallete.grey,
  borderRadius: 6,
}
