import React, { FC } from "react"

import { Flex, FlexProps } from "./Flex"

export type ColumnProps = Omit<FlexProps, "direction">

export const Column: FC<ColumnProps> = (props) => <Flex direction="column" {...props} />
