import { render, screen } from '@testing-library/react'
import React from 'react'

import { Sortable, SortableItem } from '../src'

jest.mock('@negative-space/system', () => ({
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  }),
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  mergeRefs:
    <T,>(...refs: Array<React.Ref<T> | undefined>) =>
    (node: T) => {
      refs.forEach((ref) => {
        if (!ref) return
        if (typeof ref === 'function') ref(node)
        else (ref as React.MutableRefObject<T>).current = node
      })
    },
  GripHorizontal: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg data-testid="grip-horizontal" className={className} style={style} />
  ),
  GripVertical: ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg data-testid="grip-vertical" className={className} style={style} />
  )
}))

describe('SortableItem', () => {
  it('should throw when rendered outside a Sortable', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<SortableItem>Item</SortableItem>)).toThrow(
      'useSortable must be used within a <Sortable> component'
    )

    spy.mockRestore()
  })

  it('should render children', () => {
    render(
      <Sortable>
        <SortableItem>Item 1</SortableItem>
      </Sortable>
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('should apply default className', () => {
    render(
      <Sortable>
        <SortableItem data-testid="item">Item 1</SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('item')).toHaveClass('ns-sortable-item')
  })

  it('should register with data-sortable-id using provided id', () => {
    render(
      <Sortable>
        <SortableItem id="a" data-testid="item">
          Item 1
        </SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('item')).toHaveAttribute('data-sortable-id', 'a')
  })

  it('should render a handle by default', () => {
    render(
      <Sortable>
        <SortableItem>Item 1</SortableItem>
      </Sortable>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should not render a handle when handle={false}', () => {
    render(
      <Sortable>
        <SortableItem handle={false}>Item 1</SortableItem>
      </Sortable>
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render GripVertical icon for column direction by default', () => {
    render(
      <Sortable direction="column">
        <SortableItem>Item 1</SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('grip-vertical')).toBeInTheDocument()
  })

  it('should render GripHorizontal icon for row direction', () => {
    render(
      <Sortable direction="row">
        <SortableItem>Item 1</SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('grip-horizontal')).toBeInTheDocument()
  })

  it('should render custom handleIcon when provided', () => {
    render(
      <Sortable>
        <SortableItem handleIcon={<span data-testid="custom-icon" />}>Item 1</SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('grip-vertical')).not.toBeInTheDocument()
  })

  it('should mark handle as disabled when item is disabled', () => {
    render(
      <Sortable>
        <SortableItem disabled>Item 1</SortableItem>
      </Sortable>
    )

    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should apply custom classNames to root and handle', () => {
    render(
      <Sortable>
        <SortableItem
          data-testid="item"
          classNames={{ root: 'custom-root', handle: 'custom-handle' }}
        >
          Item 1
        </SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('item')).toHaveClass('custom-root')
    expect(screen.getByTestId('grip-vertical')).toHaveClass('custom-handle')
  })

  it('should apply classNames.item.handle propagated from Sortable', () => {
    render(
      <Sortable classNames={{ item: { handle: 'w-4 h-4' } }}>
        <SortableItem>Item 1</SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('grip-vertical')).toHaveClass('w-4', 'h-4')
  })

  it('should render handle before children by default (handlePosition=start)', () => {
    render(
      <Sortable>
        <SortableItem data-testid="item">Item 1</SortableItem>
      </Sortable>
    )

    const item = screen.getByTestId('item')
    const handle = screen.getByRole('button')
    const content = screen.getByText('Item 1')

    expect(handle.compareDocumentPosition(content) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(item).toContainElement(handle)
  })

  it('should render handle after children when handlePosition="end"', () => {
    render(
      <Sortable>
        <SortableItem handlePosition="end">Item 1</SortableItem>
      </Sortable>
    )

    const handle = screen.getByRole('button')
    const content = screen.getByText('Item 1')

    expect(content.compareDocumentPosition(handle) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('should assign incremental order style based on registration order', () => {
    render(
      <Sortable>
        <SortableItem id="a" data-testid="item-a">
          Item A
        </SortableItem>
        <SortableItem id="b" data-testid="item-b">
          Item B
        </SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('item-a')).toHaveStyle({ order: 0 })
    expect(screen.getByTestId('item-b')).toHaveStyle({ order: 1 })
  })

  it('should unregister item on unmount', () => {
    const { rerender } = render(
      <Sortable>
        <SortableItem id="a" data-testid="item-a">
          Item A
        </SortableItem>
        <SortableItem id="b" data-testid="item-b">
          Item B
        </SortableItem>
      </Sortable>
    )

    rerender(
      <Sortable>
        <SortableItem id="b" data-testid="item-b">
          Item B
        </SortableItem>
      </Sortable>
    )

    expect(screen.queryByTestId('item-a')).not.toBeInTheDocument()
    expect(screen.getByTestId('item-b')).toBeInTheDocument()
  })
})
