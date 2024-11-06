import { Text } from "@/components"
import { Column, Row } from "@/components/flex"
import { BottomMenuScreenLayout } from "@/layouts/BottomMenuScreenLayout"
import { AppStackScreenProps } from "@/navigators"
import { colors, spacing, typography } from "@/theme"
import PaymentIcon from "@/theme/SVG/PaymentIcon"
import { FC, useState } from "react"
import { Linking, Pressable, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { returnCurrencySymbol } from "../Step01/CreatePaymentScreen"
import LinkIcon from "@/theme/SVG/LinkIcon"
import QRicon from "@/theme/SVG/QrIcon"
import SmsIcon from "@/theme/SVG/SmsIcon"
import WhatsAppIcon from "@/theme/SVG/WhatsAppIcon"
import ExportIcon from "@/theme/SVG/ExportIcon"
import { TextField } from "@/components/fields/TextField"
import { IconNew } from "@/components/IconNew"
import * as Sharing from "expo-sharing"

interface SharePaymentScreenProps extends AppStackScreenProps<"SharePayment"> {}

export const SharePaymentScreen: FC<SharePaymentScreenProps> = ({
  navigation,
  route: { params },
}) => {
  const [activeButton, setActiveButton] = useState<boolean>(false)

  const handleSendViaWhatsApp = (link: string, number: string) => {
    const url = `whatsapp://send?text=Payment link from BitNovo ${link}&phone=${number}`
    Linking.openURL(url)
      .then(() => {})
      .catch(() => {})
  }

  const handleSendViaEmail = (link: string) => {
    Linking.openURL(`mailto:support@example.com?subject=PaymentLink&body=${link}`)
      .then(() => {})
      .catch(() => {})
  }
  const [number, setNumber] = useState<string>("")

  return (
    <BottomMenuScreenLayout style={{ backgroundColor: "#fff" }}>
      <View style={{ paddingHorizontal: spacing.lg }}>
        <Column gap={"md"} style={$square}>
          <Row>
            <PaymentIcon />
            <Column gap="xxs">
              <Text>Solicitud de pago</Text>
              <Text style={$number}>
                {params.amount}
                {returnCurrencySymbol(params.currency)}
              </Text>
            </Column>
          </Row>
          <Text size="xs">Comparte el enlace de pago con el cliente</Text>
        </Column>

        <Column gap={"md"}>
          <Row gap={"xs"} style={{ justifyContent: "space-between" }}>
            <Row gap={"md"} style={{ ...$field, width: "80%" }}>
              <LinkIcon />
              <Text size="xs">{params.link}</Text>
            </Row>
            <TouchableOpacity style={$qricon}>
              <QRicon />
            </TouchableOpacity>
          </Row>

          <Pressable onPress={() => handleSendViaEmail(params.link)}>
            <Row gap={"md"} style={$field}>
              <SmsIcon />
              <Text size="xs">Enviar por correo electrónico</Text>
            </Row>
          </Pressable>

          {params.prefix ? (
            <TextField
              input={{
                value: number,
                onChangeText: setNumber,
                onFocus: () => setActiveButton(true),
                onBlur: () => setActiveButton(false),
                onEndEditing: () => setActiveButton(false),
                left: (
                  <Pressable onPress={() => navigation.navigate("SelectPrefix", params)}>
                    <Row>
                      <WhatsAppIcon />
                      <Text>{params.prefix}</Text>
                      <IconNew size={20} name="chevron-down" />
                    </Row>
                  </Pressable>
                ),
                right: (
                  <>
                    {activeButton && (
                      <TouchableOpacity
                        style={number.length < 10 ? $buttonWpDisabled : $buttonWp}
                        disabled={number.length < 10}
                        onPress={() => handleSendViaWhatsApp(params.link, params.prefix + number)}
                      >
                        <Text color="#fff" size="xxs" weight="bold">
                          Enviar
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                ),
                style: activeButton ? $fieldActive : $field,
              }}
            />
          ) : (
            <Pressable onPress={() => navigation.navigate("SelectPrefix", params)}>
              <Row gap={"xl"} style={activeButton ? $fieldActive : $field}>
                <Row gap={"md"}>
                  <WhatsAppIcon />
                  <Text size="xs">Enviar a número de WhatsApp</Text>
                </Row>
              </Row>
            </Pressable>
          )}

          <Pressable onPress={() => Sharing.shareAsync(params.link)}>
            <Row gap={"md"} style={$field}>
              <ExportIcon />
              <Text size="xs">Compartir con otras aplicaciones</Text>
            </Row>
          </Pressable>
        </Column>
      </View>
    </BottomMenuScreenLayout>
  )
}
const $square: ViewStyle = {
  backgroundColor: "#F9FAFC",
  borderRadius: 8,
  padding: 10,
  alignItems: "center",
  width: "100%",
  alignSelf: "center",
  marginBottom: 50,
}

const $buttonWp: ViewStyle = {
  backgroundColor: colors.newPallete.blue2,
  paddingHorizontal: 10,
  borderRadius: 6,
}

const $buttonWpDisabled: ViewStyle = {
  ...$buttonWp,
  backgroundColor: colors.newPallete.loghtBlue,
}

const $field: ViewStyle = {
  borderRadius: 6,
  borderWidth: 1,
  borderColor: colors.newPallete.grey,
  padding: 15,
}

const $fieldActive: ViewStyle = {
  ...$field,
  borderColor: colors.newPallete.blue2,
}

const $qricon: ViewStyle = {
  backgroundColor: colors.newPallete.blue2,
  width: 50,
  height: 50,
  borderRadius: 6,
  alignItems: "center",
  paddingTop: 15,
}

const $number: TextStyle = {
  fontSize: 30,
  fontFamily: typography.primary.bold,
  lineHeight: 30,
}
