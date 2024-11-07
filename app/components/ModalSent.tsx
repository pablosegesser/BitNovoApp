import { FC } from "react"
import { SafeAreaBottomSheet } from "./SafeAreaBottomSheet"
import CheckCircle from "@/theme/SVG/CheckCircle"
import { Column } from "./flex"
import { Text } from "./Text"
import { Button } from "./Button"
import { Dismissable } from "@/contexts/ModalContext"
import { Dimensions, ViewStyle } from "react-native"
import InfoCircleIcon from "@/theme/SVG/InfoIcon"
import { colors } from "@/theme"

interface SentModalProps extends Dismissable {
  message: string
  error?: boolean
}

const ModalSent: FC<SentModalProps> = ({ message, error = false, dismiss }) => {
  const width = Dimensions.get("window").width

  return (
    <SafeAreaBottomSheet style={$container} hideHandle>
      <Column gap={"lg"} center>
        {error ? <InfoCircleIcon size={80} /> : <CheckCircle />}
        <Text size="xl" weight="bold">
          {error ? "Error enviando solicitud" : "Solicitud enviada"}
        </Text>
        <Text color={colors.newPallete.textGrey}>{message}</Text>
        <Button style={{ width: width - 50 }} variant="solid" title="Entendido" onPress={dismiss} />
      </Column>
    </SafeAreaBottomSheet>
  )
}

export default ModalSent

const $container: ViewStyle = {
  backgroundColor: "#fff",
  borderTopRightRadius: 24,
  borderTopLeftRadius: 24,
  paddingBottom: 50,
  paddingTop: 120,
}
