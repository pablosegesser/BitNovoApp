import React from "react"
import {
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewProps,
  type ViewStyle,
} from "react-native"

import { Column, Row } from "./flex"

import { Text } from "./Text"
import { InputDecoratorProps } from "./InputDecorator"
import { CharCounter, CharCounterProps } from "./CharCounter"
import { colors } from "app/theme"
import { OmitChildren } from "app/types/types"
import { RenderProps } from "app/types/common"

type RenderInputProps<P> = P & InputDecoratorProps

export type RenderInput<P> = RenderProps<RenderInputProps<P>>

export interface FieldProps<InputP> extends OmitChildren<ViewProps> {
  required?: boolean | undefined
  label?: string | undefined
  error?: string | undefined
  hint?: string | undefined
  input?: InputP | undefined
  renderInput: RenderInput<InputP>
  charCounter?: CharCounterProps | undefined
  labelStyle?: StyleProp<TextStyle>
  errorTextStyle?: StyleProp<TextStyle>
  hintTextStyle?: StyleProp<TextStyle>
}

export const Field = <InputP,>({
  required,
  label,
  error,
  hint,
  input,
  renderInput,
  charCounter,
  labelStyle,
  errorTextStyle,
  hintTextStyle,
  ...props
}: FieldProps<InputP>) => {
  interface Styles {
    label: TextStyle
    errorText: TextStyle
    hintText: TextStyle
    info: ViewStyle
  }

  const styles = StyleSheet.create<Styles>({
    errorText: {
      color: colors.error,
      textAlign: "center",
    },
    hintText: {
      color: colors.border,
    },
    info: {
      justifyContent: "space-between",
    },
    label: {
      fontWeight: "700",
    },
  })

  return (
    <Column gap="sm" {...props}>
      {!!label && (
        <Row gap="sm">
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {required && <Text>*</Text>}
        </Row>
      )}
      {renderInput({
        error: error !== undefined,
        ...input,
      } as RenderInputProps<InputP>)}
      <Row style={styles.info}>
        <View>
          {error ? (
            <Row>
              {/* <WarningIcon size={15} styles={$iconStyle} /> */}
              <Text style={[styles.errorText, errorTextStyle]}>{error}</Text>
            </Row>
          ) : (
            hint && <Text style={[styles.hintText, hintTextStyle]}>{hint}</Text>
          )}
        </View>
        {charCounter && <CharCounter {...charCounter} />}
      </Row>
    </Column>
  )
}
const $iconStyle: ViewStyle = { marginTop: 3, marginRight: 5 }
