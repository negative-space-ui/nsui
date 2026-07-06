import React from 'react'

import { NotificationContext } from './notificationContext'

export const useNotification = () => {
  const ctx = React.useContext(NotificationContext)
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider')
  return ctx
}
