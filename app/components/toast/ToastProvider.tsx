import React, { type FC, PropsWithChildren } from "react"
import { ToastProvider as TProvider } from "react-native-toast-notifications"
import { type ToastProps } from "react-native-toast-notifications/lib/typescript/toast"

import BaseToast, { ToastType } from "./Toast"

export type ToastProviderProps = PropsWithChildren

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const renderSuccessToast = (toast: ToastProps) => {
    return <BaseToast toastType={ToastType.SUCCESS} {...toast} />
  }

  const renderErrorToast = (toast: ToastProps) => {
    return <BaseToast title="Ups!" toastType={ToastType.ERROR} {...toast} />
  }

  const renderWarningToast = (toast: ToastProps) => {
    return <BaseToast title="Cuidado, perro muerde!" toastType={ToastType.WARNING} {...toast} />
  }

  const renderInfoToast = (toast: ToastProps) => {
    return <BaseToast title="Promocion habilitada!" toastType={ToastType.INFO} {...toast} />
  }

  return (
    <TProvider
      offset={50}
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled
      duration={3500}
      animationType="slide-in"
      animationDuration={250}
      renderType={{
        success: renderSuccessToast,
        error: renderErrorToast,
        warning: renderWarningToast,
        info: renderInfoToast,
        danger: renderErrorToast,
      }}
    >
      {children}
    </TProvider>
  )
}
