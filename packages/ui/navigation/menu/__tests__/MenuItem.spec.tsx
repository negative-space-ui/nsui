import { useNSUI } from '@negative-space/system'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { MenuItem } from '../src/MenuItem'
import { useMenuContext } from '../src/useMenuContext'

jest.mock('../src/useMenuContext', () => ({
  useMenuContext: jest.fn()
}))

jest.mock('@negative-space/system', () => ({
  useNSUI: jest.fn(),
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ')
}))

jest.mock('@negative-space/collection', () => ({
  CollectionItem: ({
    children,
    onClick,
    onSelect,
    ...props
  }: {
    children: React.ReactNode
    onClick?: (value: string | undefined, event: React.MouseEvent<HTMLLIElement>) => void
    onSelect?: (value: string | undefined) => void
    value?: string
    disabled?: boolean
    role?: string
    className?: string
  }) => (
    <li
      {...props}
      data-testid="collection-item"
      onClick={(event) => onClick?.(props.value, event)}
      onKeyDown={() => onSelect?.(props.value)}
    >
      {children}
    </li>
  )
}))

jest.mock('@negative-space/link', () => ({
  Link: React.forwardRef<
    HTMLAnchorElement,
    {
      children: React.ReactNode
      href?: string
      disabled?: boolean
      tabIndex?: number
      className?: string
      style?: React.CSSProperties
      onClick?: React.MouseEventHandler<HTMLAnchorElement>
    }
  >((props, ref) => (
    <a {...props} ref={ref} data-testid="link" href={props.href}>
      {props.children}
    </a>
  ))
}))

const mockedUseMenuContext = useMenuContext as jest.MockedFunction<typeof useMenuContext>

describe('MenuItem', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)

    mockedUseMenuContext.mockReturnValue({
      disabled: false,
      collapsed: false
    })
  })

  it('renders children correctly', () => {
    render(<MenuItem value="item-1">Item label</MenuItem>)

    expect(screen.getByText('Item label')).toBeInTheDocument()
  })

  it('renders prefix and suffix', () => {
    render(
      <MenuItem value="item-1" prefix={<span>Prefix</span>} suffix={<span>Suffix</span>}>
        Item
      </MenuItem>
    )

    expect(screen.getByText('Prefix')).toBeInTheDocument()
    expect(screen.getByText('Suffix')).toBeInTheDocument()
  })

  it('does not render content when collapsed', () => {
    mockedUseMenuContext.mockReturnValue({
      disabled: false,
      collapsed: true
    })

    render(<MenuItem value="item-1">Hidden</MenuItem>)

    expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
  })

  it('calls item onClick when clicked', () => {
    const onClick = jest.fn()

    render(
      <MenuItem
        value="item-1"
        itemProps={{
          onClick
        }}
      >
        Item
      </MenuItem>
    )

    fireEvent.click(screen.getByTestId('collection-item'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledWith('item-1', expect.any(Object))
  })

  it('does not call click when disabled', () => {
    mockedUseMenuContext.mockReturnValue({
      disabled: true,
      collapsed: false
    })

    const onClick = jest.fn()

    render(
      <MenuItem
        value="item-1"
        itemProps={{
          onClick
        }}
      >
        Item
      </MenuItem>
    )

    fireEvent.click(screen.getByTestId('collection-item'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('calls link click when item has href', () => {
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click')

    render(
      <MenuItem value="item-1" href="/test">
        Item
      </MenuItem>
    )

    fireEvent.keyDown(screen.getByTestId('collection-item'))

    expect(clickSpy).toHaveBeenCalled()

    clickSpy.mockRestore()
  })
})
