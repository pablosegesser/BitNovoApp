import { FC, ReactNode, useMemo, useState } from "react"
import { AppStackScreenProps } from "@/navigators"
import { Screen } from "@/components"
import { useForm } from "react-hook-form"
import { FormSearchField } from "@/components/formFields"
import { FlatList, ViewStyle } from "react-native"
import EuroFlag from "@/theme/SVG/EuroFlag"
import DolarFlag from "@/theme/SVG/DolarFlag"
import GBFLag from "@/theme/SVG/GBFlag"
import CardCurrency from "@/components/CardCurrency"
import { FiatCurrency } from "@/types/common"
import { spacing } from "@/theme"

interface SelectCurrencyScreenProps extends AppStackScreenProps<"SelectCurrency"> {}
export type Currencies = {
  image: ReactNode
  text: string
  symbol: FiatCurrency
}

export const SelectCurrencyScreen: FC<SelectCurrencyScreenProps> = ({
  navigation,
  route: { params },
}) => {
  type Search = {
    search: string
  }
  const { control, watch } = useForm<Search>()

  const currencies: Currencies[] = [
    {
      image: <EuroFlag />,
      text: "Euro",
      symbol: "EUR",
    },
    {
      image: <DolarFlag />,
      text: "Dolar Estadounidense",
      symbol: "USD",
    },
    {
      image: <GBFLag />,
      text: "Libra Esterlina",
      symbol: "GBP",
    },
  ]

  const [symbol, setSymbol] = useState<FiatCurrency>(params.currency)

  const setCurrency = (a: FiatCurrency) => {
    setSymbol(a)
    navigation.navigate("CreatePayment", { currency: a })
  }
  const search = watch("search")

  const currenciesSearched = useMemo(() => {
    if (search) {
      const currenciesFiltered = currencies.filter(
        (currency) =>
          currency.text.toLowerCase().includes(search.toLowerCase()) ||
          currency.symbol.toLowerCase().includes(search.toLowerCase()),
      )

      return currenciesFiltered
    }

    return currencies
  }, [search])
  return (
    <Screen backgroundColor="#fff" style={$screenStyle} safeAreaEdges={["bottom"]}>
      <FormSearchField
        control={control}
        name="search"
        field={{
          input: {
            placeholder: "Buscar",
          },
        }}
      />
      <FlatList
        data={currenciesSearched}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <CardCurrency selected={symbol} onPress={setCurrency} item={item} />
        )}
      />
    </Screen>
  )
}

const $screenStyle: ViewStyle = {
  backgroundColor: "#fff",
  paddingHorizontal: spacing.lg,
  paddingTop: 30,
}
