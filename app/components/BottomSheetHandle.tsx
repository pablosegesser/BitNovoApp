import { colors } from "@/theme"
import { type FC } from "react"
import { StyleSheet, View, type ViewProps, type ViewStyle } from "react-native"

export interface BottomSheetHandleProps extends ViewProps {}

export const BottomSheetHandle: FC<BottomSheetHandleProps> = ({ style, ...props }) => {
  interface Styles {
    container: ViewStyle
  }

  const styles = StyleSheet.create<Styles>({
    container: {
      alignSelf: "center",
      backgroundColor: colors.border,
      borderRadius: 4,
      flex: 1,
      height: 4,
      width: 32,
    },
  })

  return <View style={[styles.container, style]} {...props} />
}
