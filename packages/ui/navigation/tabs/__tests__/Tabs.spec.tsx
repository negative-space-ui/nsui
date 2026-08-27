import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Tabs } from '..'

type FlexMockProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<'div'> & {
    as?: React.ElementType
  }
>

type LinkMockProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<'a'>>

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  mergeRefs:
    (...refs: Array<React.Ref<HTMLDivElement> | undefined>) =>
    (node: HTMLDivElement | null) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      })
    },
  useNSUI: () => ({
    global: {
      prefixCls: 'nsui'
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

jest.mock('@negative-space/link', () => ({
  Link: React.forwardRef<HTMLAnchorElement, LinkMockProps>(({ children, ...props }, ref) => (
    <a ref={ref} {...props}>
      {children}
    </a>
  ))
}))

describe('Tabs', () => {
  const items = [
    {
      id: 'general',
      children: 'General',
      href: '/general'
    },
    {
      id: 'settings',
      children: 'Settings',
      href: '/settings'
    },
    {
      id: 'advanced',
      children: 'Advanced',
      href: '/advanced'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render', () => {
    render(<Tabs items={items} />)

    expect(screen.getByRole('link', { name: 'General' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Advanced' })).toBeInTheDocument()
  })

  it('should select the first item by default', () => {
    render(<Tabs items={items} />)

    const general = screen.getByRole('link', { name: 'General' })
    const settings = screen.getByRole('link', { name: 'Settings' })
    const advanced = screen.getByRole('link', { name: 'Advanced' })

    expect(general).toHaveAttribute('data-active', 'true')
    expect(general).toHaveAttribute('aria-current', 'page')

    expect(settings).toHaveAttribute('data-active', 'false')
    expect(settings).not.toHaveAttribute('aria-current')

    expect(advanced).toHaveAttribute('data-active', 'false')
    expect(advanced).not.toHaveAttribute('aria-current')
  })

  it('should change the selected item when clicked', () => {
    render(<Tabs items={items} />)

    const general = screen.getByRole('link', { name: 'General' })
    const settings = screen.getByRole('link', { name: 'Settings' })

    expect(general).toHaveAttribute('data-active', 'true')
    expect(settings).toHaveAttribute('data-active', 'false')

    fireEvent.click(settings)

    expect(general).toHaveAttribute('data-active', 'false')
    expect(general).not.toHaveAttribute('aria-current')

    expect(settings).toHaveAttribute('data-active', 'true')
    expect(settings).toHaveAttribute('aria-current', 'page')
  })

  it('should call item onClick when clicked', () => {
    const onClick = jest.fn()

    render(
      <Tabs
        items={[
          items[0],
          {
            ...items[1],
            onClick
          }
        ]}
      />
    )

    fireEvent.click(screen.getByRole('link', { name: 'Settings' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should apply the root class', () => {
    render(
      <Tabs
        items={items}
        classNames={{
          root: 'custom-root'
        }}
      />
    )

    const root = screen.getByRole('link', { name: 'General' }).parentElement

    expect(root).toHaveClass('nsui-tabs')
    expect(root).toHaveClass('custom-root')
  })

  it('should apply the item class', () => {
    render(
      <Tabs
        items={items}
        classNames={{
          item: 'custom-item'
        }}
      />
    )

    const general = screen.getByRole('link', { name: 'General' })

    expect(general).toHaveClass('nsui-tabs-item')
    expect(general).toHaveClass('custom-item')
  })

  it('should apply the overlay class', () => {
    render(
      <Tabs
        items={items}
        classNames={{
          overlay: 'custom-overlay'
        }}
      />
    )

    const overlay = document.querySelector('.nsui-tabs-overlay')

    expect(overlay).toHaveClass('custom-overlay')
  })

  it('should render the overlay', () => {
    render(<Tabs items={items} />)

    expect(document.querySelector('.nsui-tabs-overlay')).toBeInTheDocument()
  })

  it('should update the overlay when selection changes', () => {
    render(<Tabs items={items} />)

    const general = screen.getByRole('link', { name: 'General' })
    const settings = screen.getByRole('link', { name: 'Settings' })
    const root = general.parentElement

    if (!root) {
      throw new Error('Tabs root not found')
    }

    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 300,
      height: 40,
      top: 0,
      right: 300,
      bottom: 40,
      left: 0,
      toJSON: () => ({})
    })

    jest.spyOn(general, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 80,
      height: 40,
      top: 0,
      right: 80,
      bottom: 40,
      left: 0,
      toJSON: () => ({})
    })

    jest.spyOn(settings, 'getBoundingClientRect').mockReturnValue({
      x: 80,
      y: 0,
      width: 100,
      height: 40,
      top: 0,
      right: 180,
      bottom: 40,
      left: 80,
      toJSON: () => ({})
    })

    fireEvent.click(settings)

    const overlay = document.querySelector('.nsui-tabs-overlay')

    if (!(overlay instanceof HTMLDivElement)) {
      throw new Error('Tabs overlay not found')
    }

    expect(overlay.style.transform).toBe('translateX(80px)')
    expect(overlay.style.width).toBe('100px')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Tabs ref={ref} items={items} />)

    expect(ref.current).toBe(screen.getByRole('link', { name: 'General' }).parentElement)
  })
})
