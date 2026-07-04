import { Alert } from '@negative-space/alert'
import React from 'react'
import { toast, Toaster } from 'sonner'

import {
  mergeNotificationProps,
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
  id: string | number
}

const Notification: React.FC<NotificationInternalProps> = ({
  merged,
  variant,
  duration,
  showProgress,
  autoClose,
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
    (variant: NotificationVariant, notification: NotificationProps) => {
      const merged = mergeNotificationProps(variants?.[variant], notification)

      const notificationDuration = merged.duration ?? duration
      const notificationShowProgress = merged.showProgress ?? showProgress
      const notificationAutoClose = merged.autoClose ?? autoClose

      return toast.custom(
        (t) => (
          <Notification
            merged={merged}
            variant={variant}
            duration={notificationDuration}
            showProgress={notificationShowProgress}
            autoClose={notificationAutoClose}
            id={t}
          />
        ),
        {
          duration: notificationAutoClose ? notificationDuration : Infinity
        }
      )
    },
    [variants, duration, showProgress, autoClose]
  )

  const notificationDefault = React.useCallback(
    (n: NotificationProps) => show('default', n),
    [show]
  )

  const success = React.useCallback((n: NotificationProps) => show('success', n), [show])
  const error = React.useCallback((n: NotificationProps) => show('error', n), [show])
  const info = React.useCallback((n: NotificationProps) => show('info', n), [show])
  const warning = React.useCallback((n: NotificationProps) => show('warning', n), [show])

  const hide = React.useCallback((id?: string | number) => {
    if (id !== undefined) toast.dismiss(id)
    else toast.dismiss()
  }, [])

  const clear = React.useCallback(() => toast.dismiss(), [])

  const value = React.useMemo<NotificationController>(
    () => ({
      default: notificationDefault,
      success,
      error,
      info,
      warning,
      hide,
      clear
    }),
    [notificationDefault, success, error, info, warning, hide, clear]
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster visibleToasts={1} />
    </NotificationContext.Provider>
  )
}
