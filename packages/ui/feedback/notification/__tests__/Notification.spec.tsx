import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { toast } from 'sonner'

import { NotificationProvider } from '..'
import { NotificationContext } from '../src/notificationContext'

jest.mock('sonner', () => ({
  toast: {
    custom: jest.fn(),
    dismiss: jest.fn()
  },
  Toaster: () => <div data-testid="toaster" />
}))

jest.mock('@negative-space/alert', () => ({
  Alert: ({ variant, onClose }: { variant?: string; onClose?: () => void }) => (
    <div data-testid="alert">
      <span data-testid="variant">{variant}</span>

      <button onClick={onClose}>close</button>
    </div>
  )
}))

jest.mock('@negative-space/button', () => ({
  Button: () => <button>action</button>
}))

const Consumer = () => {
  const notification = React.useContext(NotificationContext)

  if (!notification) return null

  return (
    <>
      <button
        onClick={() =>
          notification.success({
            heading: 'Success'
          })
        }
      >
        success
      </button>

      <button onClick={() => notification.hide('1')}>hide</button>

      <button onClick={() => notification.clear()}>clear</button>
    </>
  )
}

describe('NotificationProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render toaster', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    )

    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  it('should create notification', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('success'))

    expect(toast.custom).toHaveBeenCalledTimes(1)
  })

  it('should render success variant', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('success'))

    const renderNotification = jest.mocked(toast.custom).mock.calls[0][0]

    render(renderNotification('1'))

    expect(screen.getByTestId('variant')).toHaveTextContent('success')
  })

  it('should hide notification by id', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('hide'))

    expect(toast.dismiss).toHaveBeenCalledWith('1')
  })

  it('should clear notifications', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('clear'))

    expect(toast.dismiss).toHaveBeenCalled()
  })

  it('should use provider duration', () => {
    render(
      <NotificationProvider duration={2000}>
        <Consumer />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('success'))

    expect(jest.mocked(toast.custom).mock.calls[0][1]).toEqual({
      duration: 2000
    })
  })
})
