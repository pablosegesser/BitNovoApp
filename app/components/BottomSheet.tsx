import React, { type FC } from "react"
import { StyleSheet, View, type ViewProps, type ViewStyle } from "react-native"

import { colors, spacing } from "app/theme"
import { BottomSheetHandle, BottomSheetHandleProps } from "./BottomSheetHandle"

export interface BottomSheetProps extends ViewProps {
  drawBehind?: boolean | undefined
  hideHandle?: boolean | undefined
  handleStyle?: BottomSheetHandleProps["style"] | undefined
}

export const BottomSheet: FC<BottomSheetProps> = ({
  drawBehind,
  hideHandle,
  handleStyle,
  style,
  children,
  ...props
}) => {
  interface Styles {
    container: ViewStyle
    containerPadding: ViewStyle
    handle: ViewStyle
  }

  const styles = StyleSheet.create<Styles>({
    container: {
      backgroundColor: colors.background,
      borderTopLeftRadius: spacing.md,
      borderTopRightRadius: spacing.md,
      maxHeight: "70%",
      overflow: "hidden",
    },
    containerPadding: {
      paddingTop: 20,
    },
    handle: {
      position: "absolute",
      top: 12,
    },
  })

  return (
    <View
      style={[styles.container, !hideHandle && !drawBehind && styles.containerPadding, style]}
      {...props}
    >
      {children}
      {!hideHandle && <BottomSheetHandle style={[styles.handle, handleStyle]} />}
    </View>
  )
}
