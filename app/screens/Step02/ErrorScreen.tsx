import { Text } from "@/components"
import { Column } from "@/components/flex"
import { BottomMenuScreenLayout } from "@/layouts/BottomMenuScreenLayout"
import { AppStackScreenProps } from "@/navigators"
import InfoCircleIcon from "@/theme/SVG/InfoIcon"
import { FC } from "react"
import { ViewStyle } from "react-native"

interface ErrorScreenProps extends AppStackScreenProps<"Error"> {}

export const ErrorScreen: FC<ErrorScreenProps> = ({ navigation }) => {
  return (
    <BottomMenuScreenLayout
      style={$layoutStyle}
      primaryButton={{
        title: "Entendido",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "CreatePayment", params: { currency: "USD" } }],
          }),
      }}
    >
      <Column gap={"xl"} center style={$paddingView}>
        <InfoCircleIcon size={80} />
        <Text size="md" weight="bold">
          Error con el pago por favor intente nuevamente
        </Text>
      </Column>
    </BottomMenuScreenLayout>
  )
}

const $layoutStyle: ViewStyle = {
  backgroundColor: "#fff",
}
const $paddingView: ViewStyle = { paddingTop: "50%" }
