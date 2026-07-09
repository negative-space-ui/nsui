import { Button } from '@negative-space/button'
import type { Decorator } from '@storybook/react'
import React from 'react'

import { NotificationProvider, useNotification } from '..'

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
        root: 'bg-neutral-300 border border-neutral-400/50 px-2 py-1 rounded-md active:scale-97'
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

const NotificationDefaultCallButton = () => {
  const notification = useNotification()

  return (
    <Button
      classNames={{
        root: 'bg-neutral-300 border border-neutral-400/50 px-2 py-1 rounded-md active:scale-97'
      }}
      onClick={() =>
        notification({
          heading: 'Title',
          description: 'Description',
          classNames: {
            root: 'bg-neutral-300 border border-neutral-400/50 px-2 py-1 rounded-md active:scale-97',
            content: 'pr-2 py-1'
          }
        })
      }
    >
      Show
    </Button>
  )
}

const NotificationActionButton = () => {
  const notification = useNotification()

  return (
    <Button
      classNames={{
        root: 'bg-neutral-300 border border-neutral-400/50 px-2 py-1 rounded-md active:scale-97'
      }}
      onClick={() => {
        const toast = notification.info({
          heading: 'Item removed',
          description: 'You can undo this action',
          closable: false,
          classNames: {
            root: 'w-fit bg-blue-200 border border-blue-300/30 rounded-md',
            content: 'pr-2 py-1 !gap-4',
            icon: 'w-10 h-10 text-blue-200 fill-blue-600'
          }
        })

        toast.action({
          children: 'Undo',
          classNames: {
            root: 'bg-blue-600 border border-blue-700/50 px-2 text-white rounded-md active:scale-97'
          },
          onClick: () => {
            notification.hide(toast)
            notification.success({
              heading: 'Action undone'
            })
          }
        })
      }}
    >
      Show with action
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

const withNotificationProviderDefaultCall: Decorator = (Story) => (
  <NotificationProvider>
    <Story />
    <NotificationDefaultCallButton />
  </NotificationProvider>
)

const withNotificationProviderAction: Decorator = (Story) => (
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
      },
      error: {
        classNames: {
          root: 'w-fit bg-red-200 border border-red-300/30 rounded-md',
          content: 'pr-2 py-1',
          icon: 'w-10 h-10 text-red-200 fill-red-600',
          progressBar: 'bg-red-500 h-1 transition-transform duration-300 ease-in-out'
        }
      }
    }}
  >
    <Story />
    <NotificationActionButton />
  </NotificationProvider>
)

export const Default = {
  decorators: [withNotificationProvider]
}

export const NoAutoClose = {
  decorators: [withNotificationProviderNoAutoClose]
}

export const CallableDefault = {
  decorators: [withNotificationProviderDefaultCall]
}

export const WithAction = {
  decorators: [withNotificationProviderAction]
}
