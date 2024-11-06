import { AppStackScreenProps } from "@/navigators"
import { BottomMenuScreenLayout } from "@/layouts/BottomMenuScreenLayout"
import { TextStyle, View, ViewStyle } from "react-native"
import CurrencyInput from "react-native-currency-input"
import { useState } from "react"
import { TextField } from "@/components/fields/TextField"
import { colors, spacing, typography } from "@/theme"
import { FiatCurrency } from "@/types/common"

interface CreatePaymentScreenProps extends AppStackScreenProps<"CreatePayment"> {}

export const returnCurrencySymbol = (currency: FiatCurrency): string => {
  switch (currency) {
    case "EUR":
      return "€"
    case "GBP":
      return "£"
    case "USD":
      return "$"
    default:
      return "$"
  }
}

export const CreatePaymentScreen: React.FC<CreatePaymentScreenProps> = ({
  navigation,
  route: {
    params: { currency },
  },
}) => {
  const [amount, setAmount] = useState<number | null>(null)

  const [message, setMessage] = useState<string>("")

  const [focused, setFocused] = useState<boolean>(false)

  return (
    <BottomMenuScreenLayout
      avoidKeyboard
      style={$layoutStyle}
      primaryButton={{
        title: "Continuar",
        disabled: !amount,
        onPress: () =>
          navigation.navigate("SharePayment", {
            amount: amount ?? 0,
            currency,
            link: "http://google.com",
          }),
      }}
    >
      <View style={$container}>
        <CurrencyInput
          style={$inputStyle}
          placeholder="0.00$"
          textAlign="center"
          value={amount}
          onChangeValue={setAmount}
          suffix={returnCurrencySymbol(currency)}
          minValue={0}
          delimiter="."
          separator=","
        />

        <TextField
          label="Concepto"
          input={{
            value: message,
            onChangeText: setMessage,
            maxLength: 140,
            multiline: true,
            style: focused ? $textFieldFocusStyle : $textField,
            placeholder: "Añade descripción del pago",
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
            onEndEditing: () => setFocused(false),
          }}
          charCounter={{
            entered: message.length,
            limit: 140,
          }}
        />
      </View>
    </BottomMenuScreenLayout>
  )
}

const $inputStyle: TextStyle = {
  fontSize: 40,
  color: colors.newPallete.blue,
  fontFamily: typography.fonts.mulish.bold,
  paddingBottom: 50,
}

const $textField: ViewStyle = {
  borderColor: colors.newPallete.grey,
  borderRadius: 6,
}

const $textFieldFocusStyle: ViewStyle = {
  ...$textField,
  borderColor: colors.newPallete.blue2,
  borderWidth: 2,
}

const $container: ViewStyle = { paddingHorizontal: spacing.lg, paddingTop: 75 }

const $layoutStyle: ViewStyle = {
  backgroundColor: "#fff",
}
