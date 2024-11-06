import { Text, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native"
import { FC } from "react"
import { Column, Row } from "./flex"
import { IconNew } from "./IconNew"
import CheckIcon from "@/theme/SVG/Check"
import { colors, typography } from "@/theme"
import { CountryInterface } from "country-list-with-dial-code-and-flag/dist/types"

type Props = {
  item: CountryInterface
  onPress: (a: CountryInterface) => void
  selected: CountryInterface
}

const CardPrefix: FC<Props> = ({ item, onPress, selected }) => {
  return (
    <TouchableHighlight
      style={$button}
      underlayColor={colors.newPallete.grey2}
      onPress={() => onPress(item)}
    >
      <Row style={$container}>
        <Row>
          <Text style={{ fontSize: 30, lineHeight: 30, borderRadius: 100 }}>{item.flag}</Text>

          <Column style={$columnStyle}>
            <Text style={$title}>{item.dial_code}</Text>
            <Text>{item.name}</Text>
          </Column>
        </Row>
        <View style={{ marginTop: 8 }}>
          {selected.dial_code === item.dial_code ? (
            <CheckIcon />
          ) : (
            <IconNew size={20} name="chevron-forward" />
          )}
        </View>
      </Row>
    </TouchableHighlight>
  )
}

export default CardPrefix

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
