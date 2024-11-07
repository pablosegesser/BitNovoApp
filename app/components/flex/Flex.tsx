import { spacing, Spacing } from "app/theme"
import { FC } from "react"
import { StyleSheet, View, ViewProps } from "react-native"

export interface FlexProps extends ViewProps {
  direction?: "column" | "row" | undefined
  gap?: Spacing | number | undefined
  expand?: boolean
  center?: boolean
  flexRevert?: boolean
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly"
}

export const Flex: FC<FlexProps> = ({
  direction = "column",
  gap,
  expand,
  center,
  style,
  justifyContent,
  flexRevert,
  ...props
}) => {
  return (
    <View
      style={[
        { flexDirection: direction },
        expand && styles.expand,
        gap !== undefined && {
          gap: typeof gap === "number" ? gap : spacing[gap],
        },
        center && styles.center,
        style,
        justifyContent && { justifyContent },
        flexRevert && { flexDirection: direction === "row" ? "row-reverse" : "column-reverse" },
      ]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  expand: {
    alignItems: "stretch",
    flexGrow: 1,
  },
})
