import React from 'react'

import { NotificationProps } from './Notification'

export interface NotificationController {
  default: (notification: NotificationProps) => string | number
  success: (notification: NotificationProps) => string | number
  error: (notification: NotificationProps) => string | number
  info: (notification: NotificationProps) => string | number
  warning: (notification: NotificationProps) => string | number
  hide: (id?: string | number) => void
  clear: () => void
}

export const NotificationContext = React.createContext<NotificationController | null>(null)
