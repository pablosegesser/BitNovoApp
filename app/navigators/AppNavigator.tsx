/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Screens from "@/screens"
import Config from "../config"
import { navigate, navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useThemeProvider } from "@/utils/useAppTheme"
import { ComponentProps } from "react"
import { FiatCurrency } from "@/types/common"
import SelectCurrency from "@/components/SelectCurrency"
import { TouchableOpacity } from "react-native"
import BackButtonIcon from "@/theme/SVG/BackButton"
import LogoBitNovo from "@/theme/SVG/LogoBitNovo"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  CreatePayment: { currency: FiatCurrency }
  SelectCurrency: { currency: FiatCurrency }
  SharePayment: {
    link: string
    amount: number
    identifier: string
    message?: string | undefined
    currency: FiatCurrency
    prefix?: string | undefined
  }
  SelectPrefix: {
    link: string
    amount: number
    identifier: string
    message?: string | undefined
    currency: FiatCurrency
    prefix?: string | undefined
  }
  QRlink: {
    link: string
    amount: number
    identifier: string
    message?: string | undefined
    currency: FiatCurrency
    prefix?: string | undefined
  }
  Success: undefined

  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CreatePayment"
      screenOptions={{
        headerShown: false,
        navigationBarColor: "#fff",
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="CreatePayment"
        initialParams={{ currency: "USD" }}
        component={Screens.CreatePaymentScreen}
        options={({ route: { params } }) => ({
          headerShown: true,
          title: "Importe a pagar",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigate("SelectCurrency", { currency: params.currency })}
            >
              <SelectCurrency currency={params.currency} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SelectCurrency"
        initialParams={{ currency: "USD" }}
        component={Screens.SelectCurrencyScreen}
        options={({ route: { params } }) => ({
          headerShown: true,
          title: "Selecciona una divisa",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate("CreatePayment", { currency: params.currency })}
            >
              <BackButtonIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="SharePayment"
        component={Screens.SharePaymentScreen}
        options={() => ({
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerBackVisible: false,
        })}
      />

      <Stack.Screen
        name="SelectPrefix"
        component={Screens.SelectPrefixScreen}
        options={{
          headerShown: true,
          headerTitle: "Seleccionar país",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="QRlink"
        component={Screens.QRshareScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "",
          navigationBarColor: "#035AC5",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackButtonIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Success"
        component={Screens.SuccessScreen}
        options={{
          headerShown: true,
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerTitle: () => <LogoBitNovo />,
        }}
      />

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
}

export interface NavigationProps extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } =
    useThemeProvider()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme} {...props}>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  )
}
