import { Button } from '@negative-space/button'
import type { Decorator } from '@storybook/react'
import React from 'react'

import { NotificationProvider, useNotification } from '../src'

export default {
  title: 'Feedback/Notification',
  component: NotificationProvider,
  autodocs: true
}

const NotificationButton = () => {
  const notification = useNotification()

  return (
    <Button
      classNames={{
        btn: 'bg-neutral-300 border border-neutral-400/50 px-2 py-1 rounded-md active:scale-97'
      }}
      onClick={() =>
        notification.success({
          heading: 'Title',
          description: 'Description'
        })
      }
    >
      Show
    </Button>
  )
}

const withNotificationProvider: Decorator = (Story) => (
  <NotificationProvider
    variants={{
      success: {
        classNames: {
          root: 'w-fit bg-green-200 border border-green-300/30 rounded-md',
          content: 'pr-2 py-1',
          icon: 'w-10 h-10 text-green-200 fill-green-600',
          progressBar: 'bg-green-500 h-1 transition-transform duration-300 ease-in-out'
        }
      }
    }}
  >
    <Story />
    <NotificationButton />
  </NotificationProvider>
)

const withNotificationProviderNoAutoClose: Decorator = (Story) => (
  <NotificationProvider
    autoClose={false}
    variants={{
      success: {
        classNames: {
          root: 'w-fit bg-green-200 border border-green-300/30 rounded-md',
          content: 'pr-2 py-1',
          icon: 'w-10 h-10 text-green-200 fill-green-600',
          progressBar: 'bg-green-500 h-1 transition-transform duration-300 ease-in-out'
        }
      }
    }}
  >
    <Story />
    <NotificationButton />
  </NotificationProvider>
)

export const Default = {
  decorators: [withNotificationProvider]
}

export const NoAutoClose = {
  decorators: [withNotificationProviderNoAutoClose]
}
