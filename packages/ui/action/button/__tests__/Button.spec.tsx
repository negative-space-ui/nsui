import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Button } from '..'

const createRipple = jest.fn()

type FlexMockProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<'button'> & {
    as?: React.ElementType
  }
>

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    },
    components: {
      button: {
        animation: 'ripple'
      }
    }
  })
}))

jest.mock('@negative-space/ripple', () => ({
  useRipple: () => ({
    createRipple
  })
}))

jest.mock('@negative-space/spinner', () => ({
  Spinner: () => <div data-testid="spinner" />
}))

jest.mock('@negative-space/flex', () => ({
  Flex: React.forwardRef<HTMLElement, FlexMockProps>(
    ({ as: Component = 'button', children, ...props }, ref) => (
      <Component ref={ref} {...props}>
        {children}
      </Component>
    )
  )
}))
jest.mock('../src/useButtonContext', () => ({
  useButtonContextConditional: () => ({
    disabled: false
  })
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('uses children as aria-label', () => {
    render(<Button>Save</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Save')
  })

  it('uses explicit ariaLabel', () => {
    render(<Button ariaLabel="custom">Save</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'custom')
  })

  it('does not set aria-label when ariaLabel is false', () => {
    render(<Button ariaLabel={false}>Save</Button>)

    expect(screen.getByRole('button')).not.toHaveAttribute('aria-label')
  })

  it('calls onClick', () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>Click</Button>)

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('creates ripple on mouse click', () => {
    render(<Button>Click</Button>)

    fireEvent.click(screen.getByRole('button'), {
      detail: 1
    })

    expect(createRipple).toHaveBeenCalledWith(expect.any(Object), { centered: false })
  })

  it('centers ripple for keyboard click', () => {
    render(<Button>Click</Button>)

    fireEvent.click(screen.getByRole('button'), {
      detail: 0
    })

    expect(createRipple).toHaveBeenCalledWith(expect.any(Object), { centered: true })
  })

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn()

    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
    expect(createRipple).not.toHaveBeenCalled()
  })

  it('does not call onClick while loading', () => {
    const onClick = jest.fn()

    render(
      <Button loading onClick={onClick}>
        Click
      </Button>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows full spinner when loading', () => {
    render(<Button loading>Click</Button>)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.queryByText('Click')).not.toBeInTheDocument()
  })

  it('shows spinner in prefix position', () => {
    render(
      <Button loading spinnerPosition="prefix" prefix={<span>icon</span>}>
        Click
      </Button>
    )

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
    expect(screen.getByText('Click')).toBeInTheDocument()
  })

  it('renders prefix and suffix', () => {
    render(
      <Button prefix={<span>left</span>} suffix={<span>right</span>}>
        Click
      </Button>
    )

    expect(screen.getByText('left')).toBeInTheDocument()
    expect(screen.getByText('Click')).toBeInTheDocument()
    expect(screen.getByText('right')).toBeInTheDocument()
  })
})
