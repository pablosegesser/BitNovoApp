import { useCallback, useState } from "react"
import { Dimensions, LayoutChangeEvent } from "react-native"

type OnContentSizeChange = (w: number, h: number) => void

type OnLayout = (event: LayoutChangeEvent) => void

const { height: windowHeight } = Dimensions.get("window")

export const useDynamicScrollView = (scrollEventThrottle = 5) => {
  const [contentHeight, setContentHeight] = useState(0)

  const [containerHeight, setContainerHeight] = useState(windowHeight)

  const onContentSizeChange = useCallback<OnContentSizeChange>(
    (_width, height) => setContentHeight(height),
    [],
  )

  const onLayout = useCallback<OnLayout>(
    ({ nativeEvent }) => setContainerHeight(nativeEvent.layout.height),
    [],
  )

  const scrollEnabled = contentHeight > containerHeight

  return { scrollEnabled, scrollEventThrottle, onContentSizeChange, onLayout, contentHeight }
}
