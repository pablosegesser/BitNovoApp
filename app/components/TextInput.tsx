import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react"
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  TouchableWithoutFeedback,
  ViewStyle,
  Text,
  TextStyle,
  StyleProp,
} from "react-native"

import { InputDecorator, InputDecoratorProps } from "./InputDecorator"
import { colors } from "app/theme"

export type TextInputType = RNTextInput

export interface TextInputProps
  extends Omit<RNTextInputProps, "editable" | "style">,
    Omit<InputDecoratorProps, "focus"> {
  inputStyle?: RNTextInputProps["style"] | undefined
  textStyle?: StyleProp<TextStyle> | undefined
}

// eslint-disable-next-line react/display-name
export const TextInput = forwardRef<Partial<TextInputType>, TextInputProps>(
  (
    {
      disabled,
      error,
      left,
      right,
      chevron,
      contentContainerStyle,
      leftContainerStyle,
      rightContainerStyle,
      onFocus,
      onBlur,
      inputStyle,
      style,
      value,
      textStyle,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<TextInputType>(null)

    const [hasFocus, setHasFocus] = useState(false)

    const handleFocus = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setHasFocus(true)
        onFocus?.(event)
      },
      [onFocus],
    )

    const handleBlur = useCallback(
      (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setHasFocus(false)
        onBlur?.(event)
      },
      [onBlur],
    )

    const focus = useCallback(() => {
      inputRef?.current?.focus()
    }, [])

    useImperativeHandle(ref, () => ({ focus }))

    return (
      <TouchableWithoutFeedback onPress={focus}>
        <InputDecorator
          disabled={disabled}
          focus={hasFocus}
          error={error}
          left={left}
          right={right}
          chevron={chevron}
          contentContainerStyle={contentContainerStyle}
          leftContainerStyle={leftContainerStyle}
          rightContainerStyle={rightContainerStyle}
          style={style}
        >
          <RNTextInput
            ref={inputRef}
            editable={!disabled}
            placeholderTextColor={colors.newpalette.disabled}
            style={[
              //  error && { color: colors.error },
              disabled && { color: colors.text },

              inputStyle,
            ]}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            <Text style={textStyle}>{value}</Text>
          </RNTextInput>
        </InputDecorator>
      </TouchableWithoutFeedback>
    )
  },
)

const $focusStyle: ViewStyle = {
  borderWidth: 1,
  borderColor: "red",
  backgroundColor: "grey",
}
