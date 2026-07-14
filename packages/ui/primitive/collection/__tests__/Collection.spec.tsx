import { useRovingFocus } from '@negative-space/roving-focus'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Collection } from '..'
import { CollectionContext } from '../src/CollectionContext'

jest.mock('@negative-space/grid', () => ({
  Grid: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, ...props }, ref) => (
      <div ref={ref} data-testid="grid" {...props}>
        {children}
      </div>
    )
  )
}))

jest.mock('@negative-space/roving-focus', () => ({
  useRovingFocus: jest.fn()
}))

const mockedUseRovingFocus = jest.mocked(useRovingFocus)

function ContextConsumer() {
  return (
    <CollectionContext.Consumer>
      {(value) =>
        value ? (
          <div data-testid="context">
            {JSON.stringify({
              disabled: value.disabled,
              activeId: value.activeId,
              hasInteracted: value.hasInteracted
            })}
          </div>
        ) : null
      }
    </CollectionContext.Consumer>
  )
}

describe('Collection', () => {
  const rovingMock = {
    activeId: 'item-1',
    hasInteracted: false,
    registerItem: jest.fn(),
    unregisterItem: jest.fn(),
    focusItem: jest.fn(),
    focusFirst: jest.fn(),
    focusLast: jest.fn(),
    getFirstEnabledId: jest.fn(),
    reset: jest.fn(),
    handleItemKeyDown: jest.fn(),
    handleGroupKeyDown: jest.fn(),
    handleGroupBlur: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseRovingFocus.mockReturnValue(rovingMock)
  })

  it('renders children', () => {
    render(
      <Collection>
        <span>Item</span>
      </Collection>
    )

    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('sets tabindex to 0 before interaction', () => {
    render(<Collection>Item</Collection>)

    expect(screen.getByTestId('grid')).toHaveAttribute('tabindex', '0')
  })

  it('sets tabindex to -1 after interaction', () => {
    mockedUseRovingFocus.mockReturnValue({
      ...rovingMock,
      hasInteracted: true
    })

    render(<Collection>Item</Collection>)

    expect(screen.getByTestId('grid')).toHaveAttribute('tabindex', '-1')
  })

  it('sets aria-disabled when disabled', () => {
    render(<Collection disabled>Item</Collection>)

    expect(screen.getByTestId('grid')).toHaveAttribute('aria-disabled', 'true')
  })

  it('does not handle keyboard events when disabled', () => {
    render(<Collection disabled>Item</Collection>)

    fireEvent.keyDown(screen.getByTestId('grid'), {
      key: 'ArrowRight'
    })

    expect(rovingMock.handleGroupKeyDown).not.toHaveBeenCalled()
  })

  it('handles keyboard events when enabled', () => {
    render(<Collection>Item</Collection>)

    fireEvent.keyDown(screen.getByTestId('grid'), {
      key: 'ArrowRight'
    })

    expect(rovingMock.handleGroupKeyDown).toHaveBeenCalledTimes(1)
  })

  it('provides context values', () => {
    render(
      <Collection disabled>
        <ContextConsumer />
      </Collection>
    )

    expect(screen.getByTestId('context')).toHaveTextContent('"disabled":true')

    expect(screen.getByTestId('context')).toHaveTextContent('"activeId":"item-1"')

    expect(screen.getByTestId('context')).toHaveTextContent('"hasInteracted":false')
  })
})
