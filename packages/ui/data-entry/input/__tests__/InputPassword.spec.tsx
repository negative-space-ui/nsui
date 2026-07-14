import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { InputPassword } from '../src/InputPassword'

const mockUseNSUI = jest.fn()

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),

  Eye: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <span data-testid="eye" className={className} style={style}>
      eye
    </span>
  ),

  EyeOff: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <span data-testid="eye-off" className={className} style={style}>
      eye-off
    </span>
  ),

  useNSUI: () => mockUseNSUI()
}))

jest.mock('@negative-space/button', () => ({
  IconButton: ({
    children,
    onClick,
    title,
    classNames,
    styles,
    ...props
  }: React.PropsWithChildren<{
    onClick?: () => void
    title?: string
    classNames?: {
      root?: string
    }
    styles?: {
      root?: React.CSSProperties
    }
  }>) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={classNames?.root}
      style={styles?.root}
      {...props}
    >
      {children}
    </button>
  )
}))

jest.mock('@negative-space/tooltip', () => ({
  useTooltip: () => ({
    triggerProps: {}
  }),

  Tooltip: ({ children }: React.PropsWithChildren) => <div data-testid="tooltip">{children}</div>
}))

describe('InputPassword', () => {
  beforeEach(() => {
    mockUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'ns',
        tooltip: false
      },
      components: {
        inputPassword: {
          passwordTitle: 'Hide password',
          textTitle: 'Show password'
        }
      }
    })
  })

  it('should render password input by default', () => {
    render(<InputPassword />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('eye')).toBeInTheDocument()
  })

  it('should toggle visibility', () => {
    render(<InputPassword />)

    const button = screen.getByRole('button')
    const input = document.querySelector('input')

    fireEvent.click(button)

    expect(input).toHaveAttribute('type', 'text')
    expect(screen.getByTestId('eye-off')).toBeInTheDocument()

    fireEvent.click(button)

    expect(input).toHaveAttribute('type', 'password')
    expect(screen.getByTestId('eye')).toBeInTheDocument()
  })

  it('should call onToggleVisibility', () => {
    const onToggleVisibility = jest.fn()

    render(<InputPassword onToggleVisibility={onToggleVisibility} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onToggleVisibility).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByRole('button'))

    expect(onToggleVisibility).toHaveBeenCalledWith(false)
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>()

    render(<InputPassword ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should use custom title', () => {
    render(<InputPassword title="Custom password title" />)

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom password title')

    expect(screen.getByRole('button')).toHaveAttribute('title', 'Custom password title')
  })

  it('should apply custom root class', () => {
    render(
      <InputPassword
        classNames={{
          root: 'custom-root'
        }}
      />
    )

    expect(document.querySelector('.ns-input-password')).toHaveClass('custom-root')
  })

  it('should apply icon button class', () => {
    render(
      <InputPassword
        classNames={{
          iconButton: {
            root: 'custom-button'
          }
        }}
      />
    )

    expect(screen.getByRole('button')).toHaveClass('custom-button')
  })

  it('should pass button props', () => {
    render(
      <InputPassword
        buttonProps={{
          disabled: true,
          children: null
        }}
      />
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should render tooltip when enabled', () => {
    mockUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'ns',
        tooltip: true
      },
      components: {
        inputPassword: {
          passwordTitle: 'Hide password',
          textTitle: 'Show password'
        }
      }
    })

    render(<InputPassword />)

    expect(screen.getByTestId('tooltip')).toHaveTextContent('Show password')
  })

  it('should apply icon styles', () => {
    render(
      <InputPassword
        classNames={{
          iconButton: {
            icon: 'custom-icon'
          }
        }}
        styles={{
          iconButton: {
            icon: {
              color: 'red'
            }
          }
        }}
      />
    )

    expect(screen.getByTestId('eye')).toHaveClass('custom-icon')

    expect(screen.getByTestId('eye')).toHaveStyle({
      color: 'rgb(255, 0, 0)'
    })
  })

  it('should render input props', () => {
    render(<InputPassword placeholder="Password" name="password" />)

    const input = screen.getByPlaceholderText('Password')

    expect(input).toHaveAttribute('name', 'password')
  })
})
