import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { CollectionSubmenu } from '..'
import { useCollectionSubmenu } from '../src/useCollectionSubmenu'

jest.mock('@negative-space/flex', () => ({
  Flex: React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
    ({ children, ...props }, ref) => (
      <li ref={ref} data-testid="submenu" {...props}>
        {children}
      </li>
    )
  )
}))

jest.mock('@negative-space/popover', () => ({
  Popover: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover">{children}</div>
  )
}))

jest.mock('@negative-space/roving-focus', () => ({
  useRovingFocus: jest.fn()
}))

jest.mock('../src/useCollectionSubmenu', () => ({
  useCollectionSubmenu: jest.fn()
}))

jest.mock('../src/Collection', () => ({
  Collection: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="collection">{children}</div>
  )
}))

const mockedUseCollectionSubmenu = jest.mocked(useCollectionSubmenu)

describe('CollectionSubmenu', () => {
  const submenuMock = {
    setItemRef: jest.fn(),
    contentRef: React.createRef<HTMLDivElement>(),
    itemRef: React.createRef<HTMLLIElement>(),
    isDisabled: false,

    popover: {
      isOpen: false,
      open: jest.fn(),
      close: jest.fn(),
      toggle: jest.fn(),
      getReferenceProps: jest.fn(() => ({
        'data-reference': 'true'
      }))
    },

    triggerProps: {
      'data-trigger': 'true',
      onClick: jest.fn()
    },

    contentProps: {
      'data-content': 'true'
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseCollectionSubmenu.mockReturnValue(
      submenuMock as unknown as ReturnType<typeof useCollectionSubmenu>
    )
  })

  it('renders label', () => {
    render(
      <CollectionSubmenu value="menu" label="Menu">
        Item
      </CollectionSubmenu>
    )

    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(
      <CollectionSubmenu value="menu" label="Menu">
        <span>Item</span>
      </CollectionSubmenu>
    )

    expect(screen.getByText('Item')).toBeInTheDocument()
  })

  it('renders with default role', () => {
    render(
      <CollectionSubmenu value="menu" label="Menu">
        Item
      </CollectionSubmenu>
    )

    expect(screen.getByTestId('submenu')).toHaveAttribute('role', 'menuitem')
  })

  it('sets custom role', () => {
    render(
      <CollectionSubmenu value="menu" label="Menu" role="option">
        Item
      </CollectionSubmenu>
    )

    expect(screen.getByTestId('submenu')).toHaveAttribute('role', 'option')
  })

  it('passes value to useCollectionSubmenu', () => {
    render(
      <CollectionSubmenu value="item-1" label="Menu">
        Item
      </CollectionSubmenu>
    )

    expect(mockedUseCollectionSubmenu).toHaveBeenCalledWith({
      value: 'item-1',
      disabled: false,
      popoverOptions: undefined
    })
  })

  it('passes disabled to useCollectionSubmenu', () => {
    render(
      <CollectionSubmenu value="item-1" label="Menu" disabled>
        Item
      </CollectionSubmenu>
    )

    expect(mockedUseCollectionSubmenu).toHaveBeenCalledWith({
      value: 'item-1',
      disabled: true,
      popoverOptions: undefined
    })
  })

  it('passes popover options to useCollectionSubmenu', () => {
    const popoverOptions = {}

    render(
      <CollectionSubmenu value="item-1" label="Menu" popoverOptions={popoverOptions}>
        Item
      </CollectionSubmenu>
    )

    expect(mockedUseCollectionSubmenu).toHaveBeenCalledWith({
      value: 'item-1',
      disabled: false,
      popoverOptions
    })
  })

  it('applies trigger props', () => {
    render(
      <CollectionSubmenu value="menu" label="Menu">
        Item
      </CollectionSubmenu>
    )

    expect(screen.getByTestId('submenu')).toHaveAttribute('data-trigger', 'true')
  })

  it('applies popover reference props', () => {
    render(
      <CollectionSubmenu value="menu" label="Menu">
        Item
      </CollectionSubmenu>
    )

    expect(submenuMock.popover.getReferenceProps).toHaveBeenCalledTimes(1)
  })

  it('handles trigger click', () => {
    render(
      <CollectionSubmenu value="menu" label="Menu">
        Item
      </CollectionSubmenu>
    )

    fireEvent.click(screen.getByTestId('submenu'))

    expect(submenuMock.triggerProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('renders popover', () => {
    render(
      <CollectionSubmenu value="menu" label="Menu">
        Item
      </CollectionSubmenu>
    )

    expect(screen.getByTestId('popover')).toBeInTheDocument()
  })

  it('renders collection inside popover', () => {
    render(
      <CollectionSubmenu value="menu" label="Menu">
        <span>Item</span>
      </CollectionSubmenu>
    )

    expect(screen.getByTestId('collection')).toBeInTheDocument()
    expect(screen.getByText('Item')).toBeInTheDocument()
  })
})
