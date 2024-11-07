import { Text } from "@/components"
import { Column } from "@/components/flex"
import { BottomMenuScreenLayout } from "@/layouts/BottomMenuScreenLayout"
import { AppStackScreenProps } from "@/navigators"
import SuccessIcon from "@/theme/SVG/SuccessIcon"
import { FC } from "react"
import { ViewStyle } from "react-native"

interface SuccessScreenProps extends AppStackScreenProps<"Success"> {}

export const SuccessScreen: FC<SuccessScreenProps> = ({ navigation }) => {
  return (
    <BottomMenuScreenLayout
      style={$layoutStyle}
      buttons={[
        {
          title: "Finalizar",
          variant: "text",
          style: { backgroundColor: "#F9FAFC" },
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "CreatePayment", params: { currency: "USD" } }],
            }),
        },
      ]}
    >
      <Column gap={"md"} center style={$paddingView}>
        <SuccessIcon />
        <Text size="lg" weight="bold">
          Pago recibido
        </Text>
        <Text>El pago se ha confirmado con éxito</Text>
      </Column>
    </BottomMenuScreenLayout>
  )
}
const $layoutStyle: ViewStyle = {
  backgroundColor: "#fff",
}
const $paddingView: ViewStyle = { paddingTop: "50%" }
