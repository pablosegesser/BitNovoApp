import { Screen } from "@/components"
import CardPrefix from "@/components/CardPrefix"
import { FormSearchField } from "@/components/formFields"
import { AppStackScreenProps } from "@/navigators"
import { spacing } from "@/theme"
import CountryList from "country-list-with-dial-code-and-flag"
import { CountryInterface } from "country-list-with-dial-code-and-flag/dist/types"
import { FC, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { FlatList, ViewStyle } from "react-native"

interface SelectPrefixScreenProps extends AppStackScreenProps<"SelectPrefix"> {}

export const SelectPrefixScreen: FC<SelectPrefixScreenProps> = ({
  navigation,
  route: { params },
}) => {
  type Search = {
    search: string
  }
  const { control, watch } = useForm<Search>()

  const [prefixx, setPrefix] = useState<CountryInterface>(CountryList.getAll()[0])

  const setPrefixx = (a: CountryInterface) => {
    setPrefix(a)
    navigation.navigate("SharePayment", { ...params, prefix: a.dial_code })
  }
  const search = watch("search")

  const prefixSearched = useMemo(() => {
    if (search) {
      const prefixFiltered = CountryList.findByKeyword(search)

      return prefixFiltered
    }

    return CountryList.getAll()
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
        data={prefixSearched}
        keyExtractor={(item) => item.dialCode}
        renderItem={({ item }) => (
          <CardPrefix selected={prefixx} onPress={setPrefixx} item={item} />
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
