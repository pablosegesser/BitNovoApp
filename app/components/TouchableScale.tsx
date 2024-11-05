import { useAnimate } from "app/hooks/useAnimate"
import React, { type ReactNode } from "react"
import {
  Animated,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native"

export interface TouchableScaleProps extends PressableProps {
  scaleFactor?: number
  contentContainerStyle?: StyleProp<ViewStyle>
  children: ReactNode
}

export const TouchableScale = ({
  children,
  scaleFactor = 0.96,
  contentContainerStyle,
  ...props
}: TouchableScaleProps) => {
  const [interpolate, enter, exit] = useAnimate(80)

  return (
    <Pressable onPressIn={enter} onPressOut={exit} {...props}>
      <Animated.View
        style={[
          {
            transform: [
              {
                scale: interpolate(1, scaleFactor),
              },
            ],
          },
          contentContainerStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  )
}
