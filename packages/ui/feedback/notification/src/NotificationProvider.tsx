import { Alert } from '@negative-space/alert'
import { Button } from '@negative-space/button'
import React from 'react'
import { toast, Toaster } from 'sonner'

import {
  mergeNotificationProps,
  NotificationActionProps,
  NotificationHandle,
  NotificationProps,
  NotificationVariant,
  NotificationVariantsConfig,
  toAlertVariant
} from './Notification'
import { NotificationContext, NotificationController } from './notificationContext'

export interface NotificationProviderProps {
  duration?: number
  variants?: NotificationVariantsConfig
  showProgress?: boolean
  autoClose?: boolean
}

interface NotificationInternalProps {
  merged: NotificationProps
  variant: NotificationVariant
  duration: number
  showProgress: boolean
  autoClose: boolean
  action?: NotificationActionProps
  id: string | number
}

const Notification: React.FC<NotificationInternalProps> = ({
  merged,
  variant,
  duration,
  showProgress,
  autoClose,
  action,
  id
}) => {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    if (!autoClose) return
    if (!showProgress) return
    if (!Number.isFinite(duration) || duration <= 0) return

    const startedAt = performance.now()
    let frame: number

    const tick = (now: number) => {
      const elapsed = Math.min(now - startedAt, duration)
      setValue(elapsed)

      if (elapsed < duration) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [autoClose, showProgress, duration])

  return (
    <Alert
      {...merged}
      variant={toAlertVariant(variant)}
      tooltip={false}
      {...(autoClose && showProgress ? { progressBar: { max: duration, value } } : {})}
      {...(action ? { suffix: <Button {...action} /> } : {})}
      onClose={() => toast.dismiss(id)}
    />
  )
}

export const NotificationProvider: React.FC<React.PropsWithChildren<NotificationProviderProps>> = ({
  children,
  duration = 5000,
  variants,
  showProgress = true,
  autoClose = true
}) => {
  const show = React.useCallback(
    (variant: NotificationVariant, notification: NotificationProps): NotificationHandle => {
      const merged = mergeNotificationProps(variants?.[variant], notification)

      const notificationDuration = merged.duration ?? duration
      const notificationShowProgress = merged.showProgress ?? showProgress
      const notificationAutoClose = merged.autoClose ?? autoClose
      const state: { action?: NotificationActionProps } = {}

      const renderNotification = (t: string | number) => (
        <Notification
          merged={merged}
          variant={variant}
          duration={notificationDuration}
          showProgress={notificationShowProgress}
          autoClose={notificationAutoClose}
          action={state.action}
          id={t}
        />
      )

      const toastOptions = {
        duration: notificationAutoClose ? notificationDuration : Infinity
      }

      const id = toast.custom(renderNotification, toastOptions)

      const handle: NotificationHandle = {
        id,
        action(action: NotificationActionProps) {
          state.action = action
          toast.custom(renderNotification, { ...toastOptions, id })
          return handle
        }
      }

      return handle
    },
    [variants, duration, showProgress, autoClose]
  )

  const hide = React.useCallback((id?: string | number | NotificationHandle) => {
    if (id === undefined) {
      toast.dismiss()
      return
    }
    toast.dismiss(typeof id === 'object' ? id.id : id)
  }, [])

  const clear = React.useCallback(() => toast.dismiss(), [])

  const value = React.useMemo<NotificationController>(() => {
    const controller = ((notification: NotificationProps) =>
      show('default', notification)) as NotificationController

    controller.success = (notification) => show('success', notification)
    controller.error = (notification) => show('error', notification)
    controller.info = (notification) => show('info', notification)
    controller.warning = (notification) => show('warning', notification)
    controller.hide = hide
    controller.clear = clear

    return controller
  }, [show, hide, clear])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster visibleToasts={1} />
    </NotificationContext.Provider>
  )
}
