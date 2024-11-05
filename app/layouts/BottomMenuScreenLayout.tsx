import React, { FC } from "react"
import { StyleSheet, ViewStyle } from "react-native"

import {
  BottomContentScreenLayout,
  BottomContentScreenLayoutProps,
} from "./BottomContentScreenLayout"
import { ButtonProps, ButtonVariant } from "app/components/Button"
import { ButtonMenu } from "app/components/ButtonMenu"
import { Renderable } from "app/components/render"

type MenuProps =
  | {
      buttons?: never
      primaryButton?: never
      secondaryButton?: never
    }
  | {
      buttons: ButtonProps[] | undefined
      primaryButton?: never
      secondaryButton?: never
    }
  | {
      buttons?: never
      primaryButton: ButtonProps | undefined
      secondaryButton?: never
    }
  | {
      buttons?: never
      primaryButton?: never
      secondaryButton: ButtonProps | undefined
    }
  | {
      buttons?: never
      primaryButton: ButtonProps | undefined
      secondaryButton: ButtonProps | undefined
    }

export type BottomMenuScreenLayoutProps = Omit<BottomContentScreenLayoutProps, "bottom"> &
  MenuProps & {
    primaryButtonVariant?: ButtonVariant | undefined
    secondaryButtonVariant?: ButtonVariant | undefined
    beforeButtons?: Renderable | undefined
    afterButtons?: Renderable | undefined
  }

export const BottomMenuScreenLayout: FC<BottomMenuScreenLayoutProps> = ({
  buttons: defaultButtons,
  primaryButton,
  primaryButtonVariant = "solid",
  secondaryButton,
  secondaryButtonVariant = "outline",
  beforeButtons,
  afterButtons,
  ...props
}) => {
  const buttons = defaultButtons ?? []

  if (primaryButton !== undefined) {
    buttons.push({
      variant: primaryButtonVariant,
      ...primaryButton,
    })
  }

  if (secondaryButton !== undefined) {
    buttons.push({
      variant: secondaryButtonVariant,
      ...secondaryButton,
    })
  }

  return (
    <BottomContentScreenLayout
      bottom={
        buttons.length ? (
          <ButtonMenu
            buttons={buttons}
            style={styles.menu}
            primaryButtonVariant={primaryButtonVariant}
            secondaryButtonVariant={secondaryButtonVariant}
          />
        ) : undefined
      }
      beforeBottom={beforeButtons}
      afterBottom={afterButtons}
      {...props}
    />
  )
}

interface Styles {
  menu: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  menu: {
    padding: 20,
  },
})
