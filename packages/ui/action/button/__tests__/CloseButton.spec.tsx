import { render, screen } from '@testing-library/react'
import React from 'react'

import { CloseButton, type IconButtonProps } from '..'

const iconButtonMock = jest.fn()

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    },
    components: {
      closeButton: {
        animation: 'ripple'
      }
    }
  }),
  X: ({ className }: { className?: string }) => (
    <svg data-testid="close-icon" className={className} />
  )
}))

type MockIconButtonProps = React.PropsWithChildren<IconButtonProps>

jest.mock('../src/IconButton', () => ({
  IconButton: React.forwardRef<HTMLButtonElement, MockIconButtonProps>(
    ({ children, ...props }, ref) => {
      iconButtonMock(props)

      return (
        <button ref={ref} data-testid="icon-button">
          {children}
        </button>
      )
    }
  )
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('CloseButton', () => {
  it('renders close icon', () => {
    render(<CloseButton aria-label="Close" />)

    expect(screen.getByTestId('close-icon')).toBeInTheDocument()
  })

  it('uses animation from theme by default', () => {
    render(<CloseButton aria-label="Close" />)

    expect(iconButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        animation: 'ripple'
      })
    )
  })

  it('uses custom animation when provided', () => {
    render(<CloseButton aria-label="Close" animation="none" />)

    expect(iconButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        animation: 'none'
      })
    )
  })

  it('merges root class name', () => {
    render(
      <CloseButton
        aria-label="Close"
        classNames={{
          root: 'custom-root'
        }}
      />
    )

    expect(iconButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        classNames: {
          root: 'ns-close-button custom-root',
          icon: undefined
        }
      })
    )
  })

  it('passes icon class to IconButton and icon', () => {
    render(
      <CloseButton
        aria-label="Close"
        classNames={{
          icon: 'custom-icon'
        }}
      />
    )

    expect(iconButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        classNames: {
          root: 'ns-close-button',
          icon: 'custom-icon'
        }
      })
    )

    expect(screen.getByTestId('close-icon')).toHaveClass('ns-close-button-icon', 'custom-icon')
  })
})
