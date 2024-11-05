/* eslint-disable react/display-name */
import { useDynamicScrollView } from "app/hooks/useDynamicScrollView"
import React, { forwardRef, useState } from "react"
import {
  NativeScrollEvent,
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native"

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - 16
}

export type ScrollViewType = RNScrollView

export interface ScrollViewProps
  extends Omit<
    RNScrollViewProps,
    "scrollEnabled" | "scrollEventThrottle" | "onContentSizeChange" | "onLayout"
  > {
  contentBelowStyle?: StyleProp<ViewStyle>
}

export const ScrollView = forwardRef<ScrollViewType, ScrollViewProps>(
  ({ contentBelowStyle, style, ...props }, ref) => {
    const { scrollEnabled, ...scrollViewProps } = useDynamicScrollView()

    const [bottomReached, setBottomReached] = useState(false)

    return (
      <RNScrollView
        ref={ref}
        onScroll={({ nativeEvent }) => {
          const reached = isCloseToBottom(nativeEvent)
          setBottomReached(reached)
        }}
        scrollEnabled={scrollEnabled}
        style={[scrollEnabled && !bottomReached && contentBelowStyle, style]}
        {...scrollViewProps}
        {...props}
      />
    )
  },
)
