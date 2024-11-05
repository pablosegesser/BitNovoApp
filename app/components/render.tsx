import React, { ComponentType, ReactNode } from "react"

export type Renderable<P = any> = ComponentType<P> | ReactNode

export const render = <P,>(Component: Renderable<P>, props?: P) => {
  if (typeof Component === "function") {
    return <Component {...props!} />
  }

  return Component
}
