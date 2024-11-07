import { ComponentType, useCallback, useContext } from "react"

import { DismissModal, Dismissable, ModalContext, ModalOptions } from "@/contexts/ModalContext"

type ShowModal<P, T> = (
  props?: Omit<P, "dismiss"> | ((dismiss: DismissModal<T>) => Omit<P, "dismiss">),
) => Promise<T>

type DismissReturnType<T> = T extends Dismissable<infer Return> ? Return : T

type UseModalReturn<P, T> = ShowModal<P, T>

export const useModal = <P extends Dismissable<T>, T = DismissReturnType<P>>(
  Component: ComponentType<P>,
  options?: ModalOptions | undefined,
): UseModalReturn<P, T> => {
  const context = useContext(ModalContext)

  const showModal = useCallback<ShowModal<P, T>>(
    (props) => {
      return context.showModal(
        (dismiss: DismissModal<T>) => (
          <Component
            {...((typeof props === "function" ? props(dismiss) : props) as P)}
            dismiss={dismiss}
          />
        ),
        options,
      ) as Promise<T>
    },
    [Component, context, options],
  )

  return showModal
}
