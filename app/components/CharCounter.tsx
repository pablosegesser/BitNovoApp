import React, { type FC, useMemo } from "react"
import { StyleSheet, type TextStyle, View, type ViewProps } from "react-native"

import { Text } from "./Text"
import { colors } from "app/theme"

type CharCounterOptions =
  | {
      entered: number
      limit: number
    }
  | {
      entered: number
      limit?: never
    }
  | {
      entered?: never
      limit: number
    }

export type CharCounterProps = CharCounterOptions & ViewProps

export const CharCounter: FC<CharCounterProps> = ({ entered, limit, ...props }) => {
  const text = useMemo(() => {
    const values = []

    if (entered !== undefined) {
      values.push(entered)
    }

    if (limit !== undefined) {
      values.push(limit)
    }

    return values.join("\xA0/\xA0")
  }, [entered, limit])

  const isExceeded = (entered ?? 0) > (limit ?? 0)

  return (
    <View {...props}>
      <Text style={isExceeded && styles.textError}>{text}</Text>
    </View>
  )
}

interface Styles {
  textError: TextStyle
}

const styles = StyleSheet.create<Styles>({
  textError: {
    color: colors.error,
  },
})
