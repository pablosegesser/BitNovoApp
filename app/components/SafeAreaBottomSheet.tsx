import { type FC } from "react"
import { View, type StyleProp, type ViewStyle } from "react-native"

import { BottomSheet, BottomSheetProps } from "./BottomSheet"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export interface SafeAreaBottomSheetProps extends BottomSheetProps {
  contentContainerStyle?: StyleProp<ViewStyle>
}

export const SafeAreaBottomSheet: FC<SafeAreaBottomSheetProps> = ({
  contentContainerStyle,
  style,
  children,
  ...props
}) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <BottomSheet style={[{ paddingBottom: bottom }, style]} {...props}>
      <View style={contentContainerStyle}>{children}</View>
    </BottomSheet>
  )
}
