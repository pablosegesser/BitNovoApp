import { type FC } from "react"
import {
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewProps,
  ViewStyle,
} from "react-native"

import { Expanded, Row } from "./flex"
import { render, Renderable } from "./render"
import { colors, spacing } from "app/theme"
import { IconNew } from "./IconNew"

export interface InputDecoratorProps extends ViewProps {
  disabled?: boolean | undefined
  focus?: boolean | undefined
  error?: boolean | undefined
  left?: Renderable | undefined
  right?: Renderable | undefined
  chevron?: boolean | undefined
  contentContainerStyle?: StyleProp<ViewStyle>
  leftContainerStyle?: StyleProp<ViewStyle>
  rightContainerStyle?: StyleProp<ViewStyle>
  chevronStyle?: StyleProp<TextStyle>
}

export const InputDecorator: FC<InputDecoratorProps> = ({
  disabled,
  focus,
  error,
  left,
  right,
  chevron,
  contentContainerStyle,
  leftContainerStyle,
  rightContainerStyle,
  chevronStyle,
  style,
  children,
  ...props
}) => {
  return (
    <Row
      gap="xs"
      style={[
        styles.container,
        disabled && styles.disabled,
        focus && styles.focus,
        error && styles.error,
        style,
      ]}
      {...props}
    >
      {left && <View style={[styles.leftContainer, leftContainerStyle]}>{render(left)}</View>}
      <Expanded style={[styles.contentContainer, contentContainerStyle]}>{children}</Expanded>
      {right && <View style={[styles.rightContainer, rightContainerStyle]}>{render(right)}</View>}
      {chevron && (
        <IconNew name="chevron-down" size={20} style={[styles.chevronBase, chevronStyle]} />
      )}
    </Row>
  )
}

interface Styles {
  container: ViewStyle
  leftContainer: ViewStyle
  contentContainer: ViewStyle
  rightContainer: ViewStyle
  disabled: ViewStyle
  focus: ViewStyle
  error: ViewStyle
  chevronBase: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  chevronBase: {
    paddingTop: 10,
  },
  container: {
    alignItems: "stretch",
    borderColor: colors.newPallete.black,
    borderRadius: spacing.md,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 52,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    paddingVertical: 6,
  },
  disabled: {
    backgroundColor: colors.newPallete.disabled,
  },
  error: {
    borderColor: colors.error,
  },
  focus: {
    borderColor: colors.newPallete.black,
  },
  leftContainer: {
    justifyContent: "center",
  },
  rightContainer: {
    justifyContent: "center",
  },
})
