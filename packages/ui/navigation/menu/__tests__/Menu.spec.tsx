import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Menu } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  mergeCn: (first?: { root?: string }, second?: { root?: string }) => ({
    root: [first?.root, second?.root].filter(Boolean).join(' ')
  }),
  useNSUI: jest.fn()
}))

jest.mock('@negative-space/collection', () => ({
  Collection: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    role?: string
    className?: string
    style?: React.CSSProperties
    disabled?: boolean
    columns?: number
  }) => (
    <div data-testid="collection" {...props}>
      {children}
    </div>
  )
}))

jest.mock('../src/MenuGroup', () => ({
  MenuGroup: ({
    children,
    classNames
  }: {
    children?: React.ReactNode
    classNames?: {
      root?: string
    }
  }) => (
    <div data-testid="menu-group" className={classNames?.root}>
      {children}
    </div>
  )
}))

jest.mock('../src/MenuItem', () => ({
  MenuItem: ({
    children,
    classNames
  }: {
    children?: React.ReactNode
    classNames?: {
      root?: string
    }
  }) => (
    <div data-testid="menu-item" className={classNames?.root}>
      {children}
    </div>
  )
}))

jest.mock('../src/MenuSeparator', () => ({
  MenuSeparator: ({ className }: { className?: string }) => (
    <div data-testid="menu-separator" className={className} />
  )
}))

describe('Menu', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)
  })

  it('should render menu container', () => {
    render(<Menu items={[]} />)

    const menu = screen.getByTestId('collection')

    expect(menu).toHaveAttribute('role', 'menu')
    expect(menu).toHaveClass('nsui-menu')
  })

  it('should render menu items', () => {
    render(
      <Menu
        items={[
          {
            item: {
              value: 'item-1',
              children: 'Item'
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('menu-item')).toBeInTheDocument()
  })

  it('should render groups', () => {
    render(
      <Menu
        items={[
          {
            group: {
              children: 'Group'
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('menu-group')).toBeInTheDocument()
  })

  it('should render separators', () => {
    render(
      <Menu
        items={[
          {
            separator: {}
          }
        ]}
      />
    )

    expect(screen.getByTestId('menu-separator')).toBeInTheDocument()
  })

  it('should apply custom root className', () => {
    render(
      <Menu
        classNames={{
          root: 'custom-menu'
        }}
        items={[]}
      />
    )

    expect(screen.getByTestId('collection')).toHaveClass('nsui-menu custom-menu')
  })

  it('should apply root style', () => {
    render(
      <Menu
        styles={{
          root: {
            display: 'flex'
          }
        }}
        items={[]}
      />
    )

    expect(screen.getByTestId('collection')).toHaveStyle({
      display: 'flex'
    })
  })

  it('should pass disabled prop to collection', () => {
    render(<Menu disabled items={[]} />)

    expect(screen.getByTestId('collection')).toHaveAttribute('disabled')
  })
})
