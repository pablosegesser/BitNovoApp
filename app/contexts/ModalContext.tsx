import { FC, PropsWithChildren, ReactNode, createContext, useCallback, useState } from "react"
import { Keyboard, Platform } from "react-native"

import { Modal, ModalPlacement } from "@/components/Modal"

let modalId = 0

export type DismissModal<T = any> = (value?: T) => void

export interface Dismissable<T = any> {
  dismiss: DismissModal<T>
}

type ModalContent = ReactNode | ((dismiss: DismissModal) => ReactNode)

export type ModalOptions = {
  placement?: ModalPlacement | undefined
}

type ShowModal = (content: ModalContent, options?: ModalOptions | undefined) => Promise<any>

interface ModalContextType {
  showModal: ShowModal
}

const invariantViolation = () => {
  throw new Error(
    "Attempted to call useModal outside of modal context. Make sure your app is rendered inside ModalProvider.",
  )
}

export const ModalContext = createContext<ModalContextType>({
  showModal: invariantViolation,
})

type ModalState = {
  id: number
  children: ReactNode
  options: ModalOptions
  isVisible: boolean
  resolve: (value?: any) => void
  returnValue?: any
}

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<ModalState[]>([])

  const removeModal = useCallback((id: number, fallbackReturnValue?: any) => {
    setModals((modals) => {
      const index = modals.findIndex((modal) => modal.id === id)
      const modalToBeRemoved = modals[index]
      modalToBeRemoved.resolve(
        fallbackReturnValue !== undefined ? fallbackReturnValue : modalToBeRemoved.returnValue,
      )
      return [...modals.slice(0, index), ...modals.slice(index + 1)]
    })
  }, [])

  const hideModal = useCallback(
    (id: number, returnValue?: any) => {
      if (Platform.OS === "android") {
        // https://github.com/facebook/react-native/issues/26892
        return removeModal(id, returnValue)
      }

      setModals((modals) => {
        const index = modals.findIndex((modal) => modal.id === id)

        return [
          ...modals.slice(0, index),
          {
            ...modals[index],
            isVisible: false,
            returnValue,
          },
          ...modals.slice(index + 1),
        ]
      })
    },
    [removeModal],
  )

  const showModal = useCallback<ShowModal>(
    (content, options = {}) => {
      Keyboard.dismiss()

      // TODO: Change implementation to ControlledPromise
      return new Promise<any>((resolve) => {
        setModals((modals) => {
          const nextModalId = modalId++

          const children =
            typeof content === "function"
              ? content((value) => {
                  hideModal(nextModalId, value)
                })
              : content

          return [
            ...modals,
            {
              id: nextModalId,
              isVisible: true,
              children,
              options,
              resolve,
            },
          ]
        })
      })
    },
    [hideModal],
  )

  const createHideHandler = useCallback((id: number) => () => hideModal(id), [hideModal])

  const createRemoveHandler = useCallback((id: number) => () => removeModal(id), [removeModal])

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      {modals.map(({ id, isVisible, options: { placement = "bottom" }, children }, index) => (
        <Modal
          key={index}
          isVisible={isVisible}
          placement={placement}
          statusBarTranslucent
          // style={{ position: "relative" }}
          swipeDirection={placement === "bottom" ? "down" : undefined}
          onSwipeComplete={createHideHandler(id)}
          onBackdropPress={createHideHandler(id)}
          onDismiss={createRemoveHandler(id)}
          onBackButtonPress={createRemoveHandler(id)}
        >
          {children}
        </Modal>
      ))}
    </ModalContext.Provider>
  )
}
