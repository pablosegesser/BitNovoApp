import { TextStyle, TouchableHighlight, View, ViewStyle } from "react-native"
import { FC } from "react"
import { Currencies } from "@/screens"
import { Column, Row } from "./flex"
import { IconNew } from "./IconNew"
import { FiatCurrency } from "@/types/common"
import CheckIcon from "@/theme/SVG/Check"
import { colors, typography } from "@/theme"
import { Text } from "./Text"

type Props = {
  item: Currencies
  onPress: (a: FiatCurrency) => void
  selected: FiatCurrency
}

const CardCurrency: FC<Props> = ({ item, onPress, selected }) => {
  return (
    <TouchableHighlight
      style={$button}
      underlayColor={colors.newPallete.grey2}
      onPress={() => onPress(item.symbol)}
    >
      <Row style={$container}>
        <Row>
          {item.image}

          <Column style={$columnStyle}>
            <Text style={$title}>{item.text}</Text>
            <Text color={colors.newPallete.textGrey}>{item.symbol}</Text>
          </Column>
        </Row>
        <View style={{ marginTop: 8 }}>
          {selected === item.symbol ? <CheckIcon /> : <IconNew size={20} name="chevron-forward" />}
        </View>
      </Row>
    </TouchableHighlight>
  )
}

export default CardCurrency

const $container: ViewStyle = {
  borderRadius: 20,
  width: "100%",
  justifyContent: "space-between",
  padding: 5,
}

const $button: ViewStyle = {
  borderRadius: 10,
  marginBottom: 10,
  padding: 10,
}

const $columnStyle: ViewStyle = {
  marginLeft: 20,
}

const $title: TextStyle = {
  fontSize: 14,
  fontFamily: typography.primary.bold,
}
