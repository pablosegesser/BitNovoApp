import React, { type FC } from "react"
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  type ViewProps,
  type ViewStyle,
} from "react-native"
import { useHeaderHeight } from "@react-navigation/elements"

export interface ScreenLayoutProps extends ViewProps {
  avoidKeyboard?: boolean | undefined
  hasHeaderTransparent?: boolean | undefined
}

export const ScreenLayout: FC<ScreenLayoutProps> = ({
  avoidKeyboard = false,
  hasHeaderTransparent,
  style,
  children,
  ...props
}) => {
  const headerHeight = useHeaderHeight()

  return (
    <SafeAreaView
      style={[
        hasHeaderTransparent && {
          paddingTop: headerHeight,
        },
        style,
      ]}
      {...props}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={avoidKeyboard}
        keyboardVerticalOffset={headerHeight * 1.5}
        style={styles.container}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

type Styles = {
  container: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
})
