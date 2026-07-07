import { Eye } from '@negative-space/system'
import React, { useState } from 'react'

import { Alert, type AlertProps } from '..'

export default {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    heading: 'Alert title',
    description: 'Alert description example'
  }
}

const styles = {
  neutral: {
    root: 'w-fit bg-neutral-200 border border-neutral-300/30 rounded-md',
    content: 'py-1 pr-2',
    icon: 'w-10 h-10 text-neutral-200 fill-neutral-600'
  },
  info: {
    root: 'w-fit bg-blue-200 border border-blue-300/30 rounded-md',
    content: 'py-1 pr-2',
    icon: 'w-10 h-10 text-blue-200 fill-blue-600'
  },
  success: {
    root: 'w-fit bg-green-200 border border-green-300/30 rounded-md',
    content: 'py-1 pr-2',
    icon: 'w-10 h-10 text-green-200 fill-green-600'
  },
  warning: {
    root: 'w-fit bg-yellow-200 border border-yellow-300/30 rounded-md',
    content: 'py-1 pr-2',
    icon: 'w-10 h-10 text-yellow-200 fill-yellow-600'
  },
  error: {
    root: 'w-fit bg-red-200 border border-red-300/30 rounded-md',
    content: 'py-1 pr-2',
    icon: 'w-10 h-10 text-red-200 fill-red-600'
  }
} as const

const AlertExample = ({ variant = 'success', ...args }: AlertProps) => {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  const style = styles[variant]

  return (
    <Alert
      {...args}
      variant={variant}
      onClose={() => setIsOpen(false)}
      classNames={{
        root: style.root,
        content: style.content,
        info: { heading: 'font-medium' },
        icon: style.icon,
        closeButton: 'opacity-50 hover:opacity-100'
      }}
    />
  )
}

export const Default = (args: AlertProps) => <AlertExample {...args} variant="neutral" />

export const Icons = (args: AlertProps) => (
  <div className="flex flex-col gap-4">
    <AlertExample {...args} variant="neutral" />
    <AlertExample {...args} variant="info" />
    <AlertExample {...args} variant="success" />
    <AlertExample {...args} variant="warning" />
    <AlertExample {...args} variant="error" />
  </div>
)

export const CustomIcon = (args: AlertProps) => (
  <AlertExample
    {...args}
    variant="info"
    icon={<Eye className="h-10 w-10 fill-blue-600 text-blue-200" />}
  />
)

export const AccentBar = (args: AlertProps) => {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return null

  return (
    <Alert
      {...args}
      variant="success"
      onClose={() => setIsOpen(false)}
      classNames={{
        root: 'w-fit pr-2 bg-green-200 border border-green-300/30 rounded-md',
        content: 'pb-2',
        icon: 'w-10 h-10 text-green-200 fill-green-600',
        prefix: 'w-1 self-stretch bg-green-500'
      }}
    />
  )
}
