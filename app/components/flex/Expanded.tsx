import React, { type FC } from "react"

import { Flex, type FlexProps } from "./Flex"

export type ExpandedProps = Omit<FlexProps, "expand">

export const Expanded: FC<ExpandedProps> = (props) => <Flex expand {...props} />
