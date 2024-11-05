import React, { type FC, useMemo } from "react"
import { StyleSheet, type ViewStyle } from "react-native"

import { Column, type ColumnProps } from "./flex/Column"

import { spacing } from "app/theme"

import { Button, ButtonProps, ButtonVariant } from "./Button"

export interface ButtonMenuProps extends ColumnProps {
  buttons: ButtonProps[]
  primaryButtonVariant?: ButtonVariant | undefined
  secondaryButtonVariant?: ButtonVariant | undefined
}

export const ButtonMenu: FC<ButtonMenuProps> = ({
  buttons,
  primaryButtonVariant = "solid",
  secondaryButtonVariant = "outline",
  gap = "md",
  style,
  ...props
}) => {
  const styles = useStyles()

  const emphasizedButtons = useMemo(() => {
    return buttons.map((button, index) => ({
      ...button,
      variant: button.variant ?? (index === 0 ? primaryButtonVariant : secondaryButtonVariant),
    }))
  }, [buttons])

  return (
    <Column gap={gap} style={[styles.container, style]} {...props}>
      {emphasizedButtons.map(({ variant, ...props }, index) => (
        <Button key={index} variant={variant} {...props} />
      ))}
    </Column>
  )
}

interface Styles {
  container: ViewStyle
}

const useStyles = () => {
  const styles = StyleSheet.create<Styles>({
    container: {
      alignItems: "stretch",
      padding: spacing.xxl,
    },
  })

  return styles
}
