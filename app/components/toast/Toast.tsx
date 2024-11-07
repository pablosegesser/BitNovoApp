import { type FC } from "react"

import { StyleSheet, View } from "react-native"
import { type ToastProps } from "react-native-toast-notifications/lib/typescript/toast"
import { Ionicons } from "@expo/vector-icons"

import { Text } from "../Text"
import { colors } from "@/theme"
import { IconNew } from "../IconNew"

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export type ToastTypeColor = {
  [key in ToastType]: string
}

export const toastTypeColor: ToastTypeColor = {
  [ToastType.SUCCESS]: colors.newPallete.blue,
  [ToastType.ERROR]: "red",
  [ToastType.WARNING]: "orange",
  [ToastType.INFO]: colors.newPallete.blue,
}

export type ToastTypeIcon = {
  [key in ToastType]: typeof Ionicons.defaultProps.name
}

export const toastTypeIcon: ToastTypeIcon = {
  [ToastType.SUCCESS]: "checkmark-circle",
  [ToastType.ERROR]: "close-outline",
  [ToastType.WARNING]: "warning",
  [ToastType.INFO]: "information-circle",
}
interface BaseToastProps extends ToastProps {
  title?: string // TODO: Dejar ToastProps default
  toastType?: ToastType
}

const BaseToast: FC<BaseToastProps> = ({ title, message, toastType = ToastType.INFO }) => {
  const icon = toastTypeIcon[toastType]
  const color = toastTypeColor[toastType]

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={[styles.border, { backgroundColor: colors.newPallete.blue2 }]} />
        <IconNew name={icon} size="md" color={color} />
        <View style={styles.textContainer}>
          {title && (
            <Text size="md" weight="bold">
              {title}
            </Text>
          )}
          <Text size="md">{message}</Text>
        </View>
        <IconNew name="close-outline" color={colors.newPallete.grey2} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  border: {
    borderRadius: 8,
    height: "100%",
    width: 4,
  },
  container: {
    // backgroundColor: colors.newPallete.blue2,

    borderRadius: 8,

    flex: 1,
    padding: 8,
    width: "90%",
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    minHeight: 40,
  },
  textContainer: {
    alignItems: "center",
    flex: 1,
    gap: 4,
    justifyContent: "center",
  },
})

export default BaseToast
