import { useState, type FC } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import { TextField, type TextFieldProps } from "../fields/TextField"
import { Text } from "../Text"
import { colors } from "app/theme"
import { IconNew } from "../IconNew"
import SearchIcon from "@/theme/SVG/Search"

export type SearchInputButtonProps = {
  onPress?: () => void
  text?: string
}

export const SearchInputButton: FC<SearchInputButtonProps> = ({ onPress, text }) => {
  const renderSearchIcon = () => <IconNew name="search" size={20} color={colors.text} />

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.inputSearch, styles.buttonContent]}>
        {renderSearchIcon()}
        {text && (
          <Text size="md" color={colors.newPallete.grey}>
            {text}
          </Text>
        )}
      </View>
    </Pressable>
  )
}

export type SearchInputProps = Omit<TextFieldProps, "renderLeft" | "leftContainerStyle"> & {
  onPress?: () => void
  onClear?: () => void
  buttonMode?: boolean
}

export const SearchInput: FC<SearchInputProps> = ({
  input,
  onPress,
  onClear,
  buttonMode,
  ...rest
}) => {
  const renderSearchIcon = () => <SearchIcon />
  const [isFocused, setIsFocused] = useState(false)

  const renderRight = () => {
    if (!input?.value) {
      return null
    }

    return (
      <Pressable onPress={onClear}>
        <IconNew name="close-circle" size={20} color={colors.text} />
      </Pressable>
    )
  }

  if (buttonMode) {
    return <SearchInputButton onPress={onPress} text={input?.placeholder} />
  }

  return (
    <TextField
      input={{
        placeholderTextColor: colors.newPallete.grey,
        left: renderSearchIcon,
        onFocus: () => setIsFocused(true), // Set focus state to true
        onBlur: () => setIsFocused(false),
        style: {
          ...styles.inputSearch,
          backgroundColor: isFocused ? "#FBF6F5" : "#fff",
          borderWidth: 1,
          borderColor: isFocused ? colors.newPallete.loghtBlue : colors.newPallete.grey,
        },
        right: renderRight,
        ...input,
      }}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  buttonContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  inputSearch: {
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 0,
    height: 58,
    lineHeight: 34,
    paddingHorizontal: 12,
  },
})
