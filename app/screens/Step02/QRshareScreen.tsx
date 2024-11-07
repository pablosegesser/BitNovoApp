import { Screen, Text } from "@/components"
import { Row } from "@/components/flex"
import { AppStackScreenProps } from "@/navigators"
import { colors, typography } from "@/theme"
import { spacing } from "@/theme/spacingDark"
import InfoCircleIcon from "@/theme/SVG/InfoIcon"
import { FC } from "react"
import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
import QRCode from "react-native-qrcode-svg"
import { returnCurrencySymbol } from "../Step01/CreatePaymentScreen"
import { formatMoney } from "@/utils/formatMoney"

interface QRshareScreenProps extends AppStackScreenProps<"QRlink"> {}

export const QRshareScreen: FC<QRshareScreenProps> = ({ navigation, route: { params } }) => {
  const logo = require("../../../assets/images/bpay-2.png")

  const width = Dimensions.get("screen").width
  return (
    <Screen backgroundColor="#035AC5" style={$container}>
      <Row gap={"md"} style={$square}>
        <InfoCircleIcon />

        <Text style={{ flex: 1, flexWrap: "wrap" }}>
          Escanea el QR y serás redirigido a la pasarela de pago de Bitnovo Pay.
        </Text>
      </Row>
      <View style={{ alignSelf: "center", backgroundColor: "#fff", padding: 10, borderRadius: 8 }}>
        <QRCode
          size={width - spacing.lg * 3}
          value={params.link}
          logo={logo}
          logoSize={80}
          logoBackgroundColor="transparent"
        />
      </View>
      <View style={{ alignItems: "center", marginVertical: 30 }}>
        <Text style={$textAmount}>
          {formatMoney(params.amount)}
          {returnCurrencySymbol(params.currency)}
        </Text>
      </View>
      <Text style={$textBottom}>Esta pantalla se actualizará automáticamente.</Text>
    </Screen>
  )
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $textAmount: TextStyle = {
  fontSize: 40,
  lineHeight: 40,
  color: "#fff",
  fontFamily: typography.primary.bold,
}

const $textBottom: TextStyle = {
  color: "#fff",
  textAlign: "center",
}

const $square: ViewStyle = {
  backgroundColor: colors.newPallete.loghtBlue,
  borderRadius: 6,
  padding: 10,
  marginVertical: 15,
}