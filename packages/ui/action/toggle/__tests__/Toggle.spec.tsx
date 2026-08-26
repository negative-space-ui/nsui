import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Toggle } from '..'

type FlexMockProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<'button'> & {
    as?: React.ElementType
    classNames?: {
      root?: string
    }
  }
>

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'nsui'
    },
    components: {}
  })
}))

jest.mock('@negative-space/button', () => ({
  Button: React.forwardRef<HTMLButtonElement, FlexMockProps>(
    ({ children, classNames, ...props }, ref) => (
      <button ref={ref} {...props} className={classNames?.root}>
        {children}
      </button>
    )
  )
}))

describe('Toggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render', () => {
    render(<Toggle>Toggle</Toggle>)

    expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument()
  })

  it('should be inactive by default', () => {
    render(<Toggle>Toggle</Toggle>)

    const toggle = screen.getByRole('button', { name: 'Toggle' })

    expect(toggle).toHaveAttribute('data-active', 'false')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('should render as active', () => {
    render(<Toggle active>Toggle</Toggle>)

    const toggle = screen.getByRole('button', { name: 'Toggle' })

    expect(toggle).toHaveAttribute('data-active', 'true')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
  })

  it('should toggle active state when clicked', () => {
    render(<Toggle>Toggle</Toggle>)

    const toggle = screen.getByRole('button', { name: 'Toggle' })

    expect(toggle).toHaveAttribute('data-active', 'false')

    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute('data-active', 'true')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute('data-active', 'false')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('should call onClick when clicked', () => {
    const onClick = jest.fn()

    render(<Toggle onClick={onClick}>Toggle</Toggle>)

    fireEvent.click(screen.getByRole('button', { name: 'Toggle' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should apply the toggle class', () => {
    render(<Toggle>Toggle</Toggle>)

    expect(screen.getByRole('button', { name: 'Toggle' })).toHaveClass('nsui-toggle')
  })

  it('should preserve custom root class', () => {
    render(
      <Toggle
        classNames={{
          root: 'custom-class'
        }}
      >
        Toggle
      </Toggle>
    )

    const toggle = screen.getByRole('button', { name: 'Toggle' })

    expect(toggle).toHaveClass('nsui-toggle')
    expect(toggle).toHaveClass('custom-class')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLButtonElement>()

    render(<Toggle ref={ref}>Toggle</Toggle>)

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Toggle' }))
  })
})
