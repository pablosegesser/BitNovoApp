import React from "react"

import { AppStackScreenProps } from "@/navigators"
import { BottomMenuScreenLayout } from "@/layouts/BottomMenuScreenLayout"
import { Text } from "@/components/Text"

interface CreatePaymentScreenProps extends AppStackScreenProps<"CreatePayment"> {}

export const CreatePaymentScreen: React.FC<CreatePaymentScreenProps> = ({
  navigation,
  route: {
    params: { currency },
  },
}) => {
  return (
    <BottomMenuScreenLayout
      primaryButton={{
        title: "Continuar",
      }}
    >
      <Text>LALALALAL</Text>
    </BottomMenuScreenLayout>
  )
}
