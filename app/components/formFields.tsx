import { type FC, useState } from "react"
import { Controller, type ControllerProps, FieldPath, FieldValues } from "react-hook-form"

import { SearchInput, type SearchInputProps } from "./inputs/SearchInput"

import { StyleProp, ViewStyle } from "react-native"
import { TextField, TextFieldProps } from "./fields/TextField"

export type ControlledFormField = object

export type FormFieldProps<
  FieldT,
  ValuesT extends FieldValues = FieldValues,
  NameT extends FieldPath<ValuesT> = FieldPath<ValuesT>,
> = {
  control?: any // Control<ValuesT, any>
  name: NameT
  field?: FieldT | undefined
  rules?: ControllerProps["rules"]
  focusStyle?: StyleProp<ViewStyle>
}

export type FormTextFieldProps = FormFieldProps<TextFieldProps> & { errorMessage?: string }

export const FormTextField: FC<FormTextFieldProps> = ({
  control,
  name,
  rules,
  field,
  errorMessage,
  focusStyle,
}) => {
  const [focused, setFocused] = useState<boolean>(false)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <TextField
          {...field}
          error={error?.message || errorMessage}
          input={{
            ...field?.input,
            value,
            onFocus: () => setFocused(true),
            onEndEditing: () => setFocused(false),
            style: focused ? focusStyle || $focusStyle : field?.input?.style,
            onChangeText: onChange,
            onBlur(e) {
              field?.input?.onBlur?.(e)
              setFocused(false)
              onBlur()
            },
          }}
        />
      )}
    />
  )
}

const $focusStyle: ViewStyle = { borderWidth: 1, borderColor: "#000", borderRadius: 8 }

type Focuseable = {
  setIsFocused?: (value: boolean) => void
}

export type FormSearchFieldProps = FormFieldProps<SearchInputProps> & Focuseable

export const FormSearchField: FC<FormSearchFieldProps> = ({
  control,
  name,
  field,
  setIsFocused,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
      <SearchInput
        {...field}
        error={error?.message}
        input={{
          ...field?.input,
          value,
          onChangeText: onChange,
          onBlur: setIsFocused ? () => setIsFocused(false) : onBlur,
          onFocus: setIsFocused ? () => setIsFocused(true) : undefined,
        }}
      />
    )}
  />
)
