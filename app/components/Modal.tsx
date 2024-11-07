import { FC, ReactNode } from "react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import ReactNativeModal, { ModalProps as OriginalModalProps } from "react-native-modal"

// WORKARROUND: The current type definition specifies that all properties
// are required because of the way default values are initialized.
// https://github.com/react-native-modal/react-native-modal/issues/696

interface ReactNativeModalProps {
  isVisible: OriginalModalProps["isVisible"]
  statusBarTranslucent?: OriginalModalProps["statusBarTranslucent"] | undefined
  hasBackdrop?: OriginalModalProps["hasBackdrop"] | undefined
  swipeDirection?: OriginalModalProps["swipeDirection"] | undefined
  onDismiss?: OriginalModalProps["onDismiss"] | undefined
  onBackdropPress?: OriginalModalProps["onBackdropPress"] | undefined
  onSwipeComplete?: OriginalModalProps["onSwipeComplete"] | undefined
  onBackButtonPress?: OriginalModalProps["onBackButtonPress"] | undefined
  onModalHide?: OriginalModalProps["onModalHide"] | undefined
  backdropColor?: OriginalModalProps["backdropColor"] | undefined
  backdropOpacity?: OriginalModalProps["backdropOpacity"] | undefined
  style?: StyleProp<ViewStyle> | undefined
  children: ReactNode
}

export type ModalPlacement = "center" | "bottom"

export interface ModalProps extends ReactNativeModalProps {
  placement?: ModalPlacement
}

export const Modal: FC<ModalProps> = ({ placement, style, ...props }) => (
  <ReactNativeModal
    propagateSwipe
    hardwareAccelerated
    style={[placement === "bottom" && styles.bottom, style]}
    {...props}
  />
)

type Styles = {
  bottom: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  bottom: {
    justifyContent: "flex-end",
    margin: 0,
  },
})
