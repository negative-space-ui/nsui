import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { CollectionItem } from '..'
import { CollectionContext } from '../src/CollectionContext'

jest.mock('@negative-space/flex', () => ({
  Flex: React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
    ({ children, ...props }, ref) => (
      <li ref={ref} data-testid="item" {...props}>
        {children}
      </li>
    )
  )
}))

describe('CollectionItem', () => {
  const contextMock = {
    activeId: 'item-1',
    hasInteracted: false,
    registerItem: jest.fn(),
    unregisterItem: jest.fn(),
    focusItem: jest.fn(),
    handleItemKeyDown: jest.fn(),
    containerRef: {
      current: document.createElement('div')
    },
    disabled: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children', () => {
    render(<CollectionItem>Item</CollectionItem>)

    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('renders with default role option', () => {
    render(<CollectionItem>Item</CollectionItem>)

    expect(screen.getByTestId('item')).toHaveAttribute('role', 'option')
  })

  it('sets tabindex to 0 without context', () => {
    render(<CollectionItem>Item</CollectionItem>)

    expect(screen.getByTestId('item')).toHaveAttribute('tabindex', '0')
  })

  it('sets tabindex to -1 with context', () => {
    render(
      <CollectionContext.Provider value={contextMock}>
        <CollectionItem>Item</CollectionItem>
      </CollectionContext.Provider>
    )

    expect(screen.getByTestId('item')).toHaveAttribute('tabindex', '-1')
  })

  it('sets aria-disabled when disabled', () => {
    render(<CollectionItem disabled>Item</CollectionItem>)

    expect(screen.getByTestId('item')).toHaveAttribute('aria-disabled', 'true')
  })

  it('registers item on mount and unregisters on unmount', () => {
    const { unmount } = render(
      <CollectionContext.Provider value={contextMock}>
        <CollectionItem value="item-1">Item</CollectionItem>
      </CollectionContext.Provider>
    )

    expect(contextMock.registerItem).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'item-1',
        disabled: false
      })
    )

    unmount()

    expect(contextMock.unregisterItem).toHaveBeenCalledWith('item-1')
  })

  it('focuses item on click', () => {
    const onClick = jest.fn()

    render(
      <CollectionContext.Provider value={contextMock}>
        <CollectionItem value="item-1" onClick={onClick}>
          Item
        </CollectionItem>
      </CollectionContext.Provider>
    )

    fireEvent.click(screen.getByTestId('item'))

    expect(contextMock.focusItem).toHaveBeenCalledWith('item-1')

    expect(onClick).toHaveBeenCalled()
  })

  it('does not click when disabled', () => {
    const onClick = jest.fn()

    render(
      <CollectionItem disabled value="item-1" onClick={onClick}>
        Item
      </CollectionItem>
    )

    fireEvent.click(screen.getByTestId('item'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('focuses item on focus', () => {
    render(
      <CollectionContext.Provider value={contextMock}>
        <CollectionItem value="item-1">Item</CollectionItem>
      </CollectionContext.Provider>
    )

    fireEvent.focus(screen.getByTestId('item'))

    expect(contextMock.focusItem).toHaveBeenCalledWith('item-1')
  })

  it('handles keyboard selection', () => {
    const onSelect = jest.fn()
    const onClick = jest.fn()

    contextMock.handleItemKeyDown.mockImplementation((_event, _id, select) => {
      select()
    })

    render(
      <CollectionContext.Provider value={contextMock}>
        <CollectionItem value="item-1" onSelect={onSelect} onClick={onClick}>
          Item
        </CollectionItem>
      </CollectionContext.Provider>
    )

    fireEvent.keyDown(screen.getByTestId('item'), {
      key: 'Enter'
    })

    expect(onSelect).toHaveBeenCalledWith('item-1')

    expect(onClick).toHaveBeenCalled()
  })

  it('does not handle keyboard events when disabled', () => {
    render(
      <CollectionContext.Provider value={contextMock}>
        <CollectionItem disabled>Item</CollectionItem>
      </CollectionContext.Provider>
    )

    fireEvent.keyDown(screen.getByTestId('item'), {
      key: 'Enter'
    })

    expect(contextMock.handleItemKeyDown).not.toHaveBeenCalled()
  })
})
