import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

jest.mock('@negative-space/flex', () => ({
  Flex: React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & {
      as?: 'ol' | 'ul' | 'div'
      children?: React.ReactNode
    }
  >(({ as: Component = 'div', children, ...props }, ref) =>
    React.createElement(Component, { ...props, ref }, children)
  )
}))

import { List } from '../src/List'

describe('List', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      },
      components: {
        list: {
          typeElement: 'ol',
          olMarker: 'decimal',
          ulMarker: 'disc'
        }
      }
    } as never)
  })

  it('should render with default element', () => {
    render(<List items={[{ content: 'Item 1' }, { content: 'Item 2' }]} />)

    const list = screen.getByText('Item 1').closest('ol')

    expect(list).toBeInTheDocument()
    expect(list).toHaveClass('nsui-list')
  })

  it('should render as unordered list', () => {
    render(<List as="ul" items={[{ content: 'Item' }]} />)

    expect(screen.getByText('Item').closest('ul')).toBeInTheDocument()
  })

  it('should render items as ListItem', () => {
    render(<List items={[{ content: 'First item' }, { content: 'Second item' }]} />)

    expect(screen.getByText('First item')).toHaveClass('nsui-list-item')
    expect(screen.getByText('Second item')).toHaveClass('nsui-list-item')
  })

  it('should apply custom root class', () => {
    render(
      <List
        classNames={{
          root: 'custom-root'
        }}
        items={[{ content: 'Item' }]}
      />
    )

    expect(screen.getByText('Item').closest('ol')).toHaveClass('custom-root')
  })

  it('should apply custom item class', () => {
    render(
      <List
        classNames={{
          item: 'custom-item'
        }}
        items={[{ content: 'Item' }]}
      />
    )

    expect(screen.getByText('Item')).toHaveClass('custom-item')
  })

  it('should apply custom styles', () => {
    render(
      <List
        styles={{
          root: {
            marginTop: 10
          },
          item: {
            padding: 5
          }
        }}
        items={[{ content: 'Item' }]}
      />
    )

    expect(screen.getByText('Item').closest('ol')).toHaveStyle({
      marginTop: '10px'
    })

    expect(screen.getByText('Item')).toHaveStyle({
      padding: '5px'
    })
  })

  it('should apply marker', () => {
    render(<List marker="square" items={[{ content: 'Item' }]} />)

    expect(screen.getByText('Item').closest('ol')).toHaveStyle({
      listStyleType: 'square'
    })
  })

  it('should disable marker on row direction', () => {
    render(<List direction="row" items={[{ content: 'Item' }]} />)

    expect(screen.getByText('Item').closest('ol')).toHaveStyle({
      listStyleType: 'none'
    })
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLOListElement>()

    render(<List ref={ref} items={[{ content: 'Item' }]} />)

    expect(ref.current).toBeInstanceOf(HTMLOListElement)
  })
})
