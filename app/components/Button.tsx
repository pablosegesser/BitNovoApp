import React, { type FC, useMemo } from "react"
import {
  ActivityIndicator,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  type TouchableOpacityProps,
  View,
  type ViewStyle,
} from "react-native"
import { translate, TxKeyPath } from "../i18n"

import { Row } from "./flex/Row"

import { Icon, type IconProps } from "./Icon"

import { TouchableScale } from "./TouchableScale"
import { colors, spacing, typography } from "app/theme"
import { Sizes, Text } from "./Text"

export type ButtonVariant = "solid" | "outline" | "text"

export type ButtonState = {
  variant?: ButtonVariant | undefined
  busy?: boolean | undefined
  progress?: number | undefined
}

export interface ButtonProps extends TouchableOpacityProps, ButtonState {
  title?: string | undefined
  titleStyle?: StyleProp<TextStyle> | undefined
  icon?: IconProps | undefined
  minHeight?: number
  iconOnRight?: boolean | undefined
  contentContainerStyle?: StyleProp<ViewStyle> | undefined
  tx?: TxKeyPath
  textColor?: string
  textSize?: Sizes
}

export const Button: FC<ButtonProps> = ({
  title,
  variant = "solid",
  icon,
  iconOnRight = false,
  busy,
  titleStyle,
  contentContainerStyle,
  style,
  disabled,
  children,
  tx,
  minHeight = 22,
  textSize,
  textColor,
  ...props
}) => {
  const iconElement = useMemo(() => {
    if (icon) {
      return <Icon {...icon} />
    }

    return null
  }, [icon, variant, styles])

  const i18nText = tx && translate(tx)
  const content = i18nText || title || children
  return (
    <TouchableScale
      accessibilityRole="button"
      accessibilityState={{
        busy,
        disabled,
      }}
      contentContainerStyle={[
        styles.container,
        { ...(minHeight && { minHeight }) },
        // {minHeight: minHeight},
        disabled && styles.containerDisabled,
        variant === "outline" &&
          (disabled ? styles.outlineDisabledContainer : styles.outlineContainer),
        variant === "text" && (disabled ? styles.textDisabledContainer : styles.textContainer),
        style,
      ]}
      disabled={disabled || busy}
      {...props}
    >
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {busy ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Row gap="sm" center>
            {!iconOnRight && iconElement}
            <Text
              color={textColor}
              size={textSize || "sm"}
              style={[
                disabled ? styles.titleDisabled : styles.title,
                variant === "outline" &&
                  (disabled ? styles.outlineDisabledTitle : styles.outlineTitle),
                variant === "text" && (disabled ? styles.textDisabledTitle : styles.textTitle),
                titleStyle,
              ]}
            >
              {content}
            </Text>
            {iconOnRight && iconElement}
          </Row>
        )}
      </View>
    </TouchableScale>
  )
}

interface Styles {
  container: ViewStyle
  containerDisabled: ViewStyle
  contentContainer: ViewStyle
  title: TextStyle
  titleDisabled: TextStyle
  outlineContainer: ViewStyle
  outlineDisabledContainer: ViewStyle
  outlineTitle: TextStyle
  outlineDisabledTitle: TextStyle
  textContainer: ViewStyle
  textDisabledContainer: ViewStyle
  textTitle: TextStyle
  textDisabledTitle: TextStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: colors.newPallete.loghtBlue,
    borderRadius: spacing.md,
    justifyContent: "center",
    overflow: "hidden",
  },
  containerDisabled: {
    backgroundColor: colors.newPallete.disabled,
    borderRadius: spacing.md,
  },
  contentContainer: {
    alignItems: "center",
    padding: 12,
  },
  outlineContainer: {
    backgroundColor: colors.transparent,
    borderColor: colors.border,
  },
  outlineDisabledContainer: {
    backgroundColor: colors.newPallete.disabled,
    borderColor: colors.newPallete.disabled,
    borderRadius: spacing.sm,
    borderWidth: 1,
  },
  outlineDisabledTitle: {
    color: colors.palette.neutral100,
  },
  outlineTitle: {
    color: colors.text,
  },
  textContainer: {
    backgroundColor: colors.background,
    borderColor: colors.background,
  },
  textDisabledContainer: {
    backgroundColor: colors.background,
    borderColor: colors.background,
  },
  textDisabledTitle: {
    color: colors.newPallete.disabled,
  },
  textTitle: {
    color: colors.newPallete.black,
  },
  title: {
    color: colors.newPallete.blue,
    fontFamily: typography.fonts.mulish.normal,
    textAlign: "center",
  },
  titleDisabled: {
    color: colors.background,
  },
})
