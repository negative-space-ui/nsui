import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Sortable, SortableHandle, SortableItem } from '..'

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
  GripHorizontal: () => <svg data-testid="grip-horizontal" />,
  GripVertical: () => <svg data-testid="grip-vertical" />
}))

beforeAll(() => {
  Element.prototype.setPointerCapture = jest.fn()
  Element.prototype.releasePointerCapture = jest.fn()
  document.elementFromPoint = jest.fn()
})

describe('SortableHandle', () => {
  it('should render inside a SortableItem with handle={false}', () => {
    render(
      <Sortable>
        <SortableItem handle={false} data-testid="item">
          <SortableHandle data-testid="handle" />
          Item 1
        </SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('handle')).toBeInTheDocument()
  })

  it('should apply default className', () => {
    render(
      <Sortable>
        <SortableItem handle={false}>
          <SortableHandle data-testid="handle" />
        </SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('handle')).toHaveClass('ns-sortable-handle')
  })

  it('should append custom className', () => {
    render(
      <Sortable>
        <SortableItem handle={false}>
          <SortableHandle data-testid="handle" className="custom" />
        </SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('handle')).toHaveClass('ns-sortable-handle', 'custom')
  })

  it('should mark as disabled via aria/data attributes', () => {
    render(
      <Sortable>
        <SortableItem handle={false}>
          <SortableHandle data-testid="handle" disabled />
        </SortableItem>
      </Sortable>
    )

    const handle = screen.getByTestId('handle')
    expect(handle).toHaveAttribute('aria-disabled', 'true')
    expect(handle).toHaveAttribute('data-disabled', 'true')
    expect(handle).toHaveAttribute('tabIndex', '-1')
  })

  it('should be focusable when not disabled', () => {
    render(
      <Sortable>
        <SortableItem handle={false}>
          <SortableHandle data-testid="handle" />
        </SortableItem>
      </Sortable>
    )

    expect(screen.getByTestId('handle')).toHaveAttribute('tabIndex', '0')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(
      <Sortable>
        <SortableItem handle={false}>
          <SortableHandle ref={ref} />
        </SortableItem>
      </Sortable>
    )

    expect(ref.current).toBeTruthy()
  })

  it('should reorder items when dragging from one item onto another', () => {
    const onSort = jest.fn()

    render(
      <Sortable onSort={onSort}>
        <SortableItem id="a" handle={false} data-testid="item-a">
          <SortableHandle data-testid="handle-a" />
          Item A
        </SortableItem>
        <SortableItem id="b" handle={false} data-testid="item-b">
          <SortableHandle data-testid="handle-b" />
          Item B
        </SortableItem>
      </Sortable>
    )

    const handleA = screen.getByTestId('handle-a')
    const itemB = screen.getByTestId('item-b')

    const elementFromPointSpy = jest.spyOn(document, 'elementFromPoint').mockReturnValue(itemB)

    fireEvent.pointerDown(handleA, { pointerId: 1, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 10, clientY: 10 })
    fireEvent.pointerUp(window, { pointerId: 1 })

    expect(onSort).toHaveBeenCalledWith(['b', 'a'])

    elementFromPointSpy.mockRestore()
  })

  it('should not reorder when disabled', () => {
    const onSort = jest.fn()

    render(
      <Sortable onSort={onSort}>
        <SortableItem id="a" handle={false} data-testid="item-a">
          <SortableHandle data-testid="handle-a" disabled />
          Item A
        </SortableItem>
        <SortableItem id="b" handle={false} data-testid="item-b">
          <SortableHandle data-testid="handle-b" />
          Item B
        </SortableItem>
      </Sortable>
    )

    const handleA = screen.getByTestId('handle-a')
    const itemB = screen.getByTestId('item-b')

    const elementFromPointSpy = jest.spyOn(document, 'elementFromPoint').mockReturnValue(itemB)

    fireEvent.pointerDown(handleA, { pointerId: 1, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(window, { clientX: 10, clientY: 10 })
    fireEvent.pointerUp(window, { pointerId: 1 })

    expect(onSort).not.toHaveBeenCalled()

    elementFromPointSpy.mockRestore()
  })
})
