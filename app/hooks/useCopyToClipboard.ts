import { useCallback } from "react"

import { useToast } from "react-native-toast-notifications"
import * as Clipboard from "expo-clipboard"
import { colors } from "@/theme"

export const useCopyToClipboard = () => {
  const { show } = useToast()

  const copyToClipboard = useCallback(
    (value: string) => {
      Clipboard.setStringAsync(value)
      show("Link copiado al portapapeles", {
        type: "success",
        style: {
          backgroundColor: colors.newPallete.blue2,
        },
      })
    },
    [show],
  )

  return copyToClipboard
}
