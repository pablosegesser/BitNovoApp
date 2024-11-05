import { useCallback, useRef } from "react"
import { Animated, StyleProp } from "react-native"

export type StyleWithAnimatedValueProp<T> = Animated.WithAnimatedValue<StyleProp<T>>

export type Interpolate = (
  from: number | string,
  to: number | string,
) => Animated.AnimatedInterpolation<string>

type UseAnimate = (
  duration: number,
  useNativeDriver?: boolean,
  initialValue?: 0 | 1,
) => [Interpolate, () => Promise<Animated.EndResult>, () => Promise<Animated.EndResult>]

export const useAnimate: UseAnimate = (duration, useNativeDriver = false, initialValue = 0) => {
  const { current: value } = useRef(new Animated.Value(initialValue))

  const enter = useCallback(() => {
    return new Promise<Animated.EndResult>((resolve) => {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        useNativeDriver,
      }).start(resolve)
    })
  }, [value, duration, useNativeDriver])

  const exit = useCallback(() => {
    return new Promise<Animated.EndResult>((resolve) => {
      return Animated.timing(value, {
        toValue: 0,
        duration,
        useNativeDriver,
      }).start(resolve)
    })
  }, [value, duration, useNativeDriver])

  const interpolate = useCallback(
    // @ts-ignore
    (from, to) => {
      return value.interpolate({
        inputRange: [0, 1],
        outputRange: [from, to],
      })
    },
    [value],
  )

  return [interpolate, enter, exit]
}
