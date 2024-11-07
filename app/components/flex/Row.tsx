import { type FC } from "react"

import { Flex, type FlexProps } from "./Flex"

export type RowProps = Omit<FlexProps, "direction">

export const Row: FC<RowProps> = (props) => <Flex direction="row" {...props} />
