import { FC } from "react"
import { SafeAreaBottomSheet } from "./SafeAreaBottomSheet"
import CheckCircle from "@/theme/SVG/CheckCircle"
import { Column } from "./flex"
import { Text } from "./Text"
import { Button } from "./Button"
import { Dismissable } from "@/contexts/ModalContext"
import { Dimensions } from "react-native"
import InfoCircleIcon from "@/theme/SVG/InfoIcon"

interface SentModalProps extends Dismissable {
  message: string
  error?: boolean
}

const ModalSent: FC<SentModalProps> = ({ message, error = false, dismiss }) => {
  const width = Dimensions.get("window").width

  return (
    <SafeAreaBottomSheet>
      <Column gap={"lg"} center>
        {error ? <InfoCircleIcon size={80} /> : <CheckCircle />}
        <Text size="xl" weight="bold">
          {error ? "Error enviando solicitud" : "Solicitud enviada"}
        </Text>
        <Text>{message}</Text>
        <Button style={{ width: width - 50 }} variant="solid" title="Entendido" onPress={dismiss} />
      </Column>
    </SafeAreaBottomSheet>
  )
}

export default ModalSent
