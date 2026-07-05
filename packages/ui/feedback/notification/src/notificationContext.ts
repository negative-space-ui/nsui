import React from 'react'

import { NotificationHandle, NotificationProps } from './Notification'

export type NotificationFn = (notification: NotificationProps) => NotificationHandle

export interface NotificationController {
  (notification: NotificationProps): NotificationHandle
  success: NotificationFn
  error: NotificationFn
  info: NotificationFn
  warning: NotificationFn
  hide: (id?: string | number | NotificationHandle) => void
  clear: () => void
}

export const NotificationContext = React.createContext<NotificationController | null>(null)
