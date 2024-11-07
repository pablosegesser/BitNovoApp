import { Text } from "@/components"
import { Column } from "@/components/flex"
import { BottomMenuScreenLayout } from "@/layouts/BottomMenuScreenLayout"
import { AppStackScreenProps } from "@/navigators"
import CheckCircle from "@/theme/SVG/CheckCircle"
import { FC } from "react"
import { ViewStyle } from "react-native"

interface SuccessScreenProps extends AppStackScreenProps<"Success"> {}

export const SuccessScreen: FC<SuccessScreenProps> = ({ navigation }) => {
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
        <CheckCircle />
        <Text size="lg" weight="bold">
          Pago realizado satisfactoriamente
        </Text>
      </Column>
    </BottomMenuScreenLayout>
  )
}
const $layoutStyle: ViewStyle = {
  backgroundColor: "#fff",
}
const $paddingView: ViewStyle = { paddingTop: "50%" }
