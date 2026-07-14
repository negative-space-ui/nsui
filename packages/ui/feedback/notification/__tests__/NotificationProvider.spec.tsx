import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { NotificationProvider } from '..'
import { useNotification } from '..'

const toastCustom = jest.fn()
const toastDismiss = jest.fn()

jest.mock('sonner', () => ({
  toast: {
    custom: (...args: unknown[]) => toastCustom(...args),
    dismiss: (...args: unknown[]) => toastDismiss(...args)
  },
  Toaster: () => <div data-testid="toaster" />
}))

jest.mock('@negative-space/alert', () => ({
  Alert: ({
    children,
    variant,
    onClose,
    suffix
  }: {
    children?: React.ReactNode
    variant?: string
    onClose?: () => void
    suffix?: React.ReactNode
  }) => (
    <div data-testid="alert">
      <span data-testid="variant">{variant}</span>
      {children}
      {suffix}
      <button onClick={onClose}>close</button>
    </div>
  )
}))

jest.mock('@negative-space/button', () => ({
  Button: ({ children, onClick }: { children?: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}))

const Consumer = () => {
  const notification = useNotification()

  return (
    <button
      onClick={() =>
        notification.success({
          heading: 'Success'
        })
      }
    >
      notify
    </button>
  )
}

describe('NotificationProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render toaster', () => {
    render(
      <NotificationProvider>
        <div />
      </NotificationProvider>
    )

    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  it('should create notification with default duration', () => {
    render(
      <NotificationProvider duration={3000}>
        <Consumer />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('notify'))

    expect(toastCustom).toHaveBeenCalled()

    const options = toastCustom.mock.calls[0][1]

    expect(options).toEqual({
      duration: 3000
    })
  })

  it('should use notification variant', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('notify'))

    const renderNotification = toastCustom.mock.calls[0][0]

    render(renderNotification('1'))

    expect(screen.getByTestId('variant')).toHaveTextContent('success')
  })

  it('should dismiss notification on hide', () => {
    const Test = () => {
      const notification = useNotification()

      return <button onClick={() => notification.hide('id')}>hide</button>
    }

    render(
      <NotificationProvider>
        <Test />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('hide'))

    expect(toastDismiss).toHaveBeenCalledWith('id')
  })

  it('should clear notifications', () => {
    const Test = () => {
      const notification = useNotification()

      return <button onClick={() => notification.clear()}>clear</button>
    }

    render(
      <NotificationProvider>
        <Test />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('clear'))

    expect(toastDismiss).toHaveBeenCalled()
  })

  it('should render action button', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('notify'))

    const renderNotification = toastCustom.mock.calls[0][0]

    const notification = renderNotification('1')

    render(notification)

    expect(screen.getByTestId('alert')).toBeInTheDocument()
  })
})
