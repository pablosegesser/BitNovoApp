import { Text, ViewStyle } from "react-native"
import { FC } from "react"
import { FiatCurrency } from "@/types/common"
import { Row } from "./flex"
import { IconNew } from "./IconNew"

type Props = {
  currency: FiatCurrency
}

const SelectCurrency: FC<Props> = ({ currency }) => {
  return (
    <Row style={$container}>
      <Text>{currency === "USD" ? "USD" : currency === "EUR" ? "EUR" : "GBP"}</Text>
      <IconNew size={20} name="chevron-down" />
    </Row>
  )
}

export default SelectCurrency

const $container: ViewStyle = {
  borderRadius: 30,
  backgroundColor: "#D3DCE64D",
  paddingHorizontal: 10,
  paddingVertical: 5,
}
