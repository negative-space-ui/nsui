import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Segmented } from '..'

const mockGetBoundingClientRect = jest.fn()

interface FlexMockProps extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
}

interface SegmentedItemMockProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  classNames?: unknown
  styles?: React.CSSProperties
}

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  mergeRefs:
    <T,>(...refs: React.Ref<T>[]) =>
    (node: T | null) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      })
    },
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  })
}))

jest.mock('@negative-space/flex', () => ({
  Flex: React.forwardRef<HTMLDivElement, FlexMockProps>(({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  ))
}))

jest.mock('../src/SegmentedItem', () => ({
  SegmentedItem: React.forwardRef<HTMLButtonElement, SegmentedItemMockProps>(
    ({ children, ...props }, ref) => (
      <button ref={ref} {...props}>
        {children}
      </button>
    )
  )
}))

beforeEach(() => {
  jest.clearAllMocks()

  mockGetBoundingClientRect.mockReturnValue({
    left: 0,
    top: 0,
    width: 100,
    height: 40,
    right: 100,
    bottom: 40,
    x: 0,
    y: 0,
    toJSON: () => {}
  })

  Element.prototype.getBoundingClientRect = mockGetBoundingClientRect
})

describe('Segmented', () => {
  const items = [
    {
      id: 'day',
      children: 'Day'
    },
    {
      id: 'week',
      children: 'Week'
    },
    {
      id: 'month',
      children: 'Month'
    }
  ]

  it('renders items', () => {
    render(<Segmented items={items} />)

    expect(screen.getByRole('button', { name: 'Day' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Week' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Month' })).toBeInTheDocument()
  })

  it('selects the first item by default', () => {
    render(<Segmented items={items} />)

    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('data-active', 'true')

    expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByRole('button', { name: 'Month' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('changes the selected item when clicked', () => {
    render(<Segmented items={items} />)

    const day = screen.getByRole('button', { name: 'Day' })
    const week = screen.getByRole('button', { name: 'Week' })

    fireEvent.click(week)

    expect(day).toHaveAttribute('aria-pressed', 'false')
    expect(day).toHaveAttribute('data-active', 'false')

    expect(week).toHaveAttribute('aria-pressed', 'true')
    expect(week).toHaveAttribute('data-active', 'true')
  })

  it('calls the item onClick handler', () => {
    const onClick = jest.fn()

    render(
      <Segmented
        items={[
          {
            id: 'day',
            children: 'Day',
            onClick
          },
          {
            id: 'week',
            children: 'Week'
          }
        ]}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Day' }))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith(expect.any(Object))
  })

  it('renders the overlay', () => {
    render(<Segmented items={items} />)

    const overlay = document.querySelector('.ns-segmented-overlay')

    expect(overlay).toBeInTheDocument()
    expect(overlay).toHaveAttribute('aria-hidden', 'true')
  })

  it('positions the overlay over the selected item', () => {
    mockGetBoundingClientRect
      .mockReturnValueOnce({
        left: 10,
        top: 20,
        width: 300,
        height: 50
      })
      .mockReturnValueOnce({
        left: 30,
        top: 25,
        width: 100,
        height: 40
      })

    render(<Segmented items={items} />)

    const overlay = document.querySelector<HTMLElement>('.ns-segmented-overlay')

    expect(overlay).toHaveStyle({
      transform: 'translate(20px, 5px)',
      width: '100px',
      height: '40px'
    })
  })

  it('moves the overlay when the selected item changes', () => {
    mockGetBoundingClientRect
      .mockReturnValueOnce({
        left: 0,
        top: 0,
        width: 300,
        height: 50
      })
      .mockReturnValueOnce({
        left: 0,
        top: 0,
        width: 100,
        height: 40
      })
      .mockReturnValueOnce({
        left: 0,
        top: 0,
        width: 300,
        height: 50
      })
      .mockReturnValueOnce({
        left: 100,
        top: 0,
        width: 100,
        height: 40
      })

    render(<Segmented items={items} />)

    const overlay = document.querySelector<HTMLElement>('.ns-segmented-overlay')
    const week = screen.getByRole('button', { name: 'Week' })

    fireEvent.click(week)

    expect(overlay).toHaveStyle({
      transform: 'translate(100px, 0px)',
      width: '100px',
      height: '40px'
    })
  })

  it('applies root className', () => {
    render(
      <Segmented
        items={items}
        classNames={{
          root: 'custom-root'
        }}
      />
    )

    expect(document.querySelector('.ns-segmented')).toHaveClass('custom-root')
  })

  it('applies overlay className', () => {
    render(
      <Segmented
        items={items}
        classNames={{
          overlay: 'custom-overlay'
        }}
      />
    )

    expect(document.querySelector('.ns-segmented-overlay')).toHaveClass('custom-overlay')
  })
})
