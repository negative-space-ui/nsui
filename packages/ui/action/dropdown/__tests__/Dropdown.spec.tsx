import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Dropdown } from '..'
import { type DropdownHandle } from '../src/useDropdown'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),

  mergeCn: (first?: Record<string, unknown>, second?: Record<string, unknown>) => ({
    ...first,
    ...second
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
  ),

  CollectionGroup: ({
    children,
    classNames,
    styles
  }: {
    children?: React.ReactNode
    classNames?: {
      root?: string
      heading?: string
    }
    styles?: {
      root?: React.CSSProperties
      heading?: React.CSSProperties
    }
  }) => (
    <div data-testid="dropdown-group" className={classNames?.root} style={styles?.root}>
      {children}
    </div>
  )
}))

jest.mock('@negative-space/popover', () => ({
  Popover: ({
    children,
    classNames,
    styles
  }: {
    children?: React.ReactNode
    classNames?: {
      root?: string
      content?: string
      arrow?: string
      overlay?: string
    }
    styles?: {
      root?: React.CSSProperties
      content?: React.CSSProperties
      arrow?: React.CSSProperties
      overlay?: React.CSSProperties
    }
  }) => (
    <div data-testid="popover" className={classNames?.root} style={styles?.root}>
      {children}
    </div>
  )
}))

jest.mock('../src/DropdownItem', () => ({
  DropdownItem: ({
    children,
    classNames,
    styles
  }: {
    children?: React.ReactNode
    classNames?: {
      button?: {
        root?: string
      }
    }
    styles?: {
      button?: {
        root?: React.CSSProperties
      }
    }
  }) => (
    <div
      data-testid="dropdown-item"
      className={classNames?.button?.root}
      style={styles?.button?.root}
    >
      {children}
    </div>
  )
}))

jest.mock('../src/DropdownGroup', () => ({
  DropdownGroup: ({
    children,
    classNames,
    styles
  }: {
    children?: React.ReactNode
    classNames?: {
      root?: string
    }
    styles?: {
      root?: React.CSSProperties
    }
  }) => (
    <div data-testid="dropdown-group" className={classNames?.root} style={styles?.root}>
      {children}
    </div>
  )
}))

jest.mock('../src/DropdownSeparator', () => ({
  DropdownSeparator: ({
    className,
    style
  }: {
    className?: string
    style?: React.CSSProperties
  }) => <div data-testid="dropdown-separator" className={className} style={style} />
}))

jest.mock('../src/DropdownSubmenu', () => ({
  DropdownSubmenu: ({
    children,
    classNames,
    styles
  }: {
    children?: React.ReactNode
    classNames?: {
      heading?: string
      popover?: {
        root?: string
        content?: string
        arrow?: string
        overlay?: string
      }
    }
    styles?: {
      heading?: React.CSSProperties
      popover?: {
        root?: React.CSSProperties
        content?: React.CSSProperties
        arrow?: React.CSSProperties
        overlay?: React.CSSProperties
      }
    }
  }) => (
    <div
      data-testid="dropdown-submenu"
      className={classNames?.popover?.root}
      style={styles?.popover?.root}
    >
      {children}
    </div>
  )
}))

describe('Dropdown', () => {
  const dropdown = {
    referenceRef: jest.fn(),
    getReferenceProps: jest.fn(() => ({}))
  } as unknown as DropdownHandle

  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)
  })

  it('should render dropdown container', () => {
    render(<Dropdown dropdown={dropdown} items={[]} />)

    expect(screen.getByTestId('popover')).toBeInTheDocument()
    expect(screen.getByTestId('collection')).toBeInTheDocument()
  })

  it('should apply default root className', () => {
    render(<Dropdown dropdown={dropdown} items={[]} />)

    expect(screen.getByTestId('popover')).toHaveClass('nsui-dropdown')
  })

  it('should apply custom root className', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        classNames={{
          root: 'custom-dropdown'
        }}
        items={[]}
      />
    )

    expect(screen.getByTestId('popover')).toHaveClass('nsui-dropdown custom-dropdown')
  })

  it('should apply content className', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        classNames={{
          content: 'custom-content'
        }}
        items={[]}
      />
    )

    expect(screen.getByTestId('collection')).toHaveClass('nsui-dropdown-content custom-content')
  })

  it('should apply root style', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        styles={{
          root: {
            display: 'flex'
          }
        }}
        items={[]}
      />
    )

    expect(screen.getByTestId('popover')).toHaveStyle({
      display: 'flex'
    })
  })

  it('should apply content style', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        styles={{
          content: {
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

  it('should render dropdown items', () => {
    render(
      <Dropdown
        dropdown={dropdown}
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

    expect(screen.getByTestId('dropdown-item')).toBeInTheDocument()
  })

  it('should apply item classNames', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        classNames={{
          item: {
            button: {
              root: 'custom-item'
            }
          }
        }}
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

    expect(screen.getByTestId('dropdown-item')).toHaveClass('custom-item')
  })

  it('should apply item styles', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        styles={{
          item: {
            button: {
              root: {
                padding: '8px'
              }
            }
          }
        }}
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

    expect(screen.getByTestId('dropdown-item')).toHaveStyle({
      padding: '8px'
    })
  })

  it('should render groups', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        items={[
          {
            group: {
              heading: 'Group',
              items: [
                {
                  item: {
                    value: 'item-1',
                    children: 'Item 1'
                  }
                }
              ]
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('dropdown-group')).toBeInTheDocument()
  })

  it('should apply group classNames', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        classNames={{
          group: {
            root: 'custom-group'
          }
        }}
        items={[
          {
            group: {
              heading: 'Group',
              items: []
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('dropdown-group')).toHaveClass('custom-group')
  })

  it('should apply group styles', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        styles={{
          group: {
            root: {
              marginBottom: '8px'
            }
          }
        }}
        items={[
          {
            group: {
              heading: 'Group',
              items: []
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('dropdown-group')).toHaveStyle({
      marginBottom: '8px'
    })
  })

  it('should render separators', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        items={[
          {
            separator: {}
          }
        ]}
      />
    )

    expect(screen.getByTestId('dropdown-separator')).toBeInTheDocument()
  })

  it('should apply separator className', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        classNames={{
          separator: 'custom-separator'
        }}
        items={[
          {
            separator: {}
          }
        ]}
      />
    )

    expect(screen.getByTestId('dropdown-separator')).toHaveClass('custom-separator')
  })

  it('should apply separator style', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        styles={{
          separator: {
            margin: '4px'
          }
        }}
        items={[
          {
            separator: {}
          }
        ]}
      />
    )

    expect(screen.getByTestId('dropdown-separator')).toHaveStyle({
      margin: '4px'
    })
  })

  it('should render submenus', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        items={[
          {
            submenu: {
              heading: 'Submenu',
              value: 'submenu',
              items: [
                {
                  item: {
                    value: 'item-1',
                    children: 'Item'
                  }
                }
              ]
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('dropdown-submenu')).toBeInTheDocument()
  })

  it('should apply submenu classNames', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        classNames={{
          submenu: {
            popover: {
              root: 'custom-submenu'
            }
          }
        }}
        items={[
          {
            submenu: {
              heading: 'Submenu',
              value: 'submenu',
              items: []
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('dropdown-submenu')).toHaveClass('custom-submenu')
  })

  it('should apply disabled prop to collection', () => {
    render(<Dropdown dropdown={dropdown} disabled items={[]} />)

    expect(screen.getByTestId('collection')).toHaveAttribute('disabled')
  })

  it('should pass columns to collection', () => {
    render(<Dropdown dropdown={dropdown} columns={2} items={[]} />)

    expect(screen.getByTestId('collection')).toHaveAttribute('columns', '2')
  })

  it('should render nested items inside groups', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        items={[
          {
            group: {
              heading: 'Group',
              items: [
                {
                  item: {
                    value: 'item-1',
                    children: 'Item 1'
                  }
                },
                {
                  item: {
                    value: 'item-2',
                    children: 'Item 2'
                  }
                }
              ]
            }
          }
        ]}
      />
    )

    expect(screen.getAllByTestId('dropdown-item')).toHaveLength(2)
  })

  it('should render nested items inside submenus', () => {
    render(
      <Dropdown
        dropdown={dropdown}
        items={[
          {
            submenu: {
              heading: 'Submenu',
              value: 'submenu',
              items: [
                {
                  item: {
                    value: 'item-1',
                    children: 'Item 1'
                  }
                },
                {
                  item: {
                    value: 'item-2',
                    children: 'Item 2'
                  }
                }
              ]
            }
          }
        ]}
      />
    )

    expect(screen.getAllByTestId('dropdown-item')).toHaveLength(2)
  })
})
