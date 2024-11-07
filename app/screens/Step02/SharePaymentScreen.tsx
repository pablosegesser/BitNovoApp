import { Text } from "@/components"
import { Column, Row } from "@/components/flex"
import { BottomMenuScreenLayout } from "@/layouts/BottomMenuScreenLayout"
import { AppStackScreenProps } from "@/navigators"
import { colors, spacing, typography } from "@/theme"
import PaymentIcon from "@/theme/SVG/PaymentIcon"
import { FC, useCallback, useEffect, useState } from "react"
import {
  Linking,
  Platform,
  Pressable,
  Share,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { returnCurrencySymbol } from "../Step01/CreatePaymentScreen"
import QRicon from "@/theme/SVG/QrIcon"
import SmsIcon from "@/theme/SVG/SmsIcon"
import WhatsAppIcon from "@/theme/SVG/WhatsAppIcon"
import ExportIcon from "@/theme/SVG/ExportIcon"
import { TextField } from "@/components/fields/TextField"
import { IconNew } from "@/components/IconNew"
import * as Sharing from "expo-sharing"
import NewWallet from "@/theme/SVG/NewWallet"
import { useModal } from "@/hooks/useModal"
import ModalSent from "@/components/ModalSent"
import LinkIcon from "@/theme/SVG/LinkIcon"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import { formatNumber } from "@/utils/formatNumber"

interface SharePaymentScreenProps extends AppStackScreenProps<"SharePayment"> {}

export const SharePaymentScreen: FC<SharePaymentScreenProps> = ({
  navigation,
  route: { params },
}) => {
  const [activeButton, setActiveButton] = useState<boolean>(false)

  const handleSendViaWhatsApp = (link: string, number: string) => {
    const url = `whatsapp://send?text=Payment link from BitNovo ${link}&phone=${number}`
    Linking.openURL(url)
      .then(() => {
        handlePress("Tu solicitud de pago ha sido enviado con éxito por WhatsApp .")
      })
      .catch(() => {
        handlePress("Tu solicitud de pago no pudo ser enviada con éxito por WhatsApp .", true)
      })
  }
  const ShareOptions = {
    mimeType: "text/css",
    dialogTitle: "Payment Link BitNovo",
  }

  const sentModal = useModal(ModalSent)

  const handlePress = useCallback((message: string, error?: boolean) => {
    sentModal({
      message,
      error,
    })
  }, [])

  const handleSendViaEmail = (link: string) => {
    Linking.openURL(`mailto:support@example.com?subject=PaymentLink&body=${link}`)
      .then(() => {
        handlePress("Tu solicitud de pago ha sido enviado con éxito por Email .")
      })
      .catch(() => {
        handlePress("Tu solicitud de pago no pudo ser enviado con éxito por Email .", true)
      })
  }
  const [number, setNumber] = useState<string>("")

  const ShareAndroid = (link: string) =>
    Share.share({
      message: link,
    }).then(() => {
      handlePress("Tu solicitud de pago  ha sido compartida con éxito.")
    })

  const copyToClipboard = useCopyToClipboard()

  const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/merchant/${params.identifier}`)

  useEffect(() => {
    socket.onmessage = (a) => {
      const resp = JSON.parse(a.data)

      if (resp.status === "CO") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Success" }],
        })
      }
    }
  }, [])
  return (
    <BottomMenuScreenLayout
      avoidKeyboard
      style={$layoutStyle}
      buttons={[
        {
          title: "Nueva solicitud",
          variant: "text",
          renderIcon: <NewWallet />,
          iconOnRight: true,
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: "CreatePayment", params: { currency: "USD" } }],
            }),
        },
      ]}
    >
      <View style={{ paddingHorizontal: spacing.lg }}>
        <Column gap={"md"} style={$square}>
          <Row gap={"md"}>
            <PaymentIcon />
            <Column gap="xxs" center>
              <Text color={colors.newPallete.textGrey}>Solicitud de pago</Text>
              <Text style={$number}>
                {formatNumber(params.amount, 2)}
                {returnCurrencySymbol(params.currency)}
              </Text>
            </Column>
          </Row>
          <Text size="xs" color={colors.newPallete.textGrey}>
            Comparte el enlace de pago con el cliente
          </Text>
        </Column>

        <Column gap={"md"}>
          <Row style={$containerPreview}>
            <TouchableOpacity
              onPress={() => copyToClipboard(params.link)}
              style={$subcontainerPreview}
            >
              <Row gap={"md"}>
                <LinkIcon />
                <Text size="xxs">{params.link}</Text>
              </Row>
            </TouchableOpacity>

            <TouchableOpacity style={$qricon} onPress={() => navigation.navigate("QRlink", params)}>
              <QRicon />
            </TouchableOpacity>
          </Row>

          <TouchableOpacity onPress={() => handleSendViaEmail(params.link)}>
            <Row gap={"md"} style={$field}>
              <SmsIcon />
              <Text size="xxs">Enviar por correo electrónico</Text>
            </Row>
          </TouchableOpacity>

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
                    <Row gap={"xxs"}>
                      <WhatsAppIcon />
                      <Text size="xxs">{params.prefix}</Text>
                      <IconNew size={18} name="chevron-down" />
                    </Row>
                  </Pressable>
                ),
                right: (
                  <>
                    {(activeButton || number.length === 10) && (
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
                style: activeButton ? { ...$fieldActive, height: 50 } : { ...$field, height: 50 },
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("SelectPrefix", params)}>
              <Row gap={"xl"} style={activeButton ? $fieldActive : $field}>
                <Row gap={"md"}>
                  <WhatsAppIcon />
                  <Text size="xxs">Enviar a número de WhatsApp</Text>
                </Row>
              </Row>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={
              Platform.OS === "android"
                ? () => ShareAndroid(params.link)
                : () => Sharing.shareAsync(params.link, ShareOptions)
            }
          >
            <Row gap={"md"} style={$field}>
              <ExportIcon />
              <Text size="xxs">Compartir con otras aplicaciones</Text>
            </Row>
          </TouchableOpacity>
        </Column>
      </View>
    </BottomMenuScreenLayout>
  )
}
const $containerPreview: ViewStyle = {
  justifyContent: "space-between",
}

const $layoutStyle: ViewStyle = { backgroundColor: "#fff" }
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
const $subcontainerPreview: ViewStyle = { ...$field, width: "82%" }

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
