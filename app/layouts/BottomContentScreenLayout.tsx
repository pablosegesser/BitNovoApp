import React, { type FC, type RefObject } from "react"
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native"

import { render, Renderable } from "app/components/render"
import { ScreenLayout, ScreenLayoutProps } from "./ScreenLayout"
import { ScrollView, ScrollViewType } from "app/components/ScrollView"
import { colors } from "app/theme"

export interface BottomContentScreenLayoutProps extends ScreenLayoutProps {
  bottom?: Renderable | undefined
  beforeBottom?: Renderable | undefined
  afterBottom?: Renderable | undefined
  hasBottomTabs?: boolean | undefined
  contentContainerRef?: RefObject<ScrollViewType> | undefined
  bottomContainerStyle?: StyleProp<ViewStyle> | undefined
  beforeBottomContainerStyle?: StyleProp<ViewStyle> | undefined
  afterBottomContainerStyle?: StyleProp<ViewStyle> | undefined
  contentContainerStyle?: StyleProp<ViewStyle> | undefined
}

export const BottomContentScreenLayout: FC<BottomContentScreenLayoutProps> = ({
  bottom,
  beforeBottom,
  afterBottom,
  hasBottomTabs,
  contentContainerRef,
  bottomContainerStyle,
  beforeBottomContainerStyle,
  afterBottomContainerStyle,
  contentContainerStyle,
  style,
  children,
  ...props
}) => (
  <ScreenLayout style={[styles.container, style]} {...props}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      ref={contentContainerRef}
      style={contentContainerStyle}
      contentContainerStyle={hasBottomTabs && styles.hasBottomTabs}
    >
      {children}
    </ScrollView>
    <View>
      {beforeBottom !== undefined && (
        <View style={beforeBottomContainerStyle}>{render(beforeBottom)}</View>
      )}
      {bottom !== undefined && <View style={bottomContainerStyle}>{render(bottom)}</View>}
      {afterBottom !== undefined && (
        <View style={afterBottomContainerStyle}>{render(afterBottom)}</View>
      )}
    </View>
  </ScreenLayout>
)

interface Styles {
  container: ViewStyle
  hasBottomTabs: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "space-between",
  },
  hasBottomTabs: {
    paddingBottom: 80,
  },
})
