import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { InputPassword } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  Eye: ({ className }: { className?: string }) => <span data-testid="eye" className={className} />,
  EyeOff: ({ className }: { className?: string }) => (
    <span data-testid="eye-off" className={className} />
  ),
  useNSUI: () => ({
    global: {
      prefixCls: 'nsui',
      tooltip: false
    },
    components: {
      inputPassword: {
        passwordTitle: 'Show password',
        textTitle: 'Hide password'
      }
    }
  })
}))

jest.mock('@negative-space/button', () => ({
  IconButton: React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
    ({ children, ...props }, ref) => (
      <button ref={ref} {...props}>
        {children}
      </button>
    )
  )
}))

jest.mock('@negative-space/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useTooltip: () => ({
    referenceRef: React.createRef<HTMLButtonElement>(),
    getReferenceProps: () => ({})
  })
}))

jest.mock('../src/Input.tsx', () => ({
  Input: React.forwardRef<
    HTMLInputElement,
    {
      suffix?: React.ReactNode
      classNames?: {
        root?: string
      }
      styles?: object
      flexProps?: object
      children?: React.ReactNode
    } & React.InputHTMLAttributes<HTMLInputElement>
  >(({ suffix, ...props }, ref) => (
    <div>
      <input ref={ref} {...props} />
      {suffix}
    </div>
  ))
}))

describe('InputPassword', () => {
  it('renders as password by default', () => {
    render(<InputPassword data-testid="password-input" />)

    const input = screen.getByTestId('password-input')

    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('data-visible', 'false')
    expect(screen.getByTestId('eye')).toBeInTheDocument()
  })

  it('toggles visibility when button is clicked', () => {
    render(<InputPassword data-testid="password-input" />)

    const button = screen.getByRole('button')
    const input = screen.getByTestId('password-input')

    fireEvent.click(button)

    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('data-visible', 'true')
    expect(screen.getByTestId('eye-off')).toBeInTheDocument()

    fireEvent.click(button)

    expect(input).toHaveAttribute('type', 'password')
    expect(input).toHaveAttribute('data-visible', 'false')
    expect(screen.getByTestId('eye')).toBeInTheDocument()
  })

  it('calls onToggleVisibility with the next state', () => {
    const onToggleVisibility = jest.fn()

    render(<InputPassword data-testid="password-input" onToggleVisibility={onToggleVisibility} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onToggleVisibility).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByRole('button'))

    expect(onToggleVisibility).toHaveBeenCalledWith(false)
  })

  it('forwards ref to input', () => {
    const ref = React.createRef<HTMLInputElement>()

    render(<InputPassword ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('uses custom title', () => {
    render(<InputPassword title="Custom title" />)

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom title')
  })
})
