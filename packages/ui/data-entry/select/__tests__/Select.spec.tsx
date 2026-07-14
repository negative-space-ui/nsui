import { usePopover } from '@negative-space/popover'
import { useNSUI } from '@negative-space/system'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Select } from '../src/Select'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  ChevronDown: () => <span data-testid="chevron" />,
  useNSUI: jest.fn()
}))

jest.mock('@negative-space/button', () => ({
  Button: ({
    children,
    suffix,
    classNames,
    ...props
  }: {
    children: React.ReactNode
    suffix?: React.ReactNode
    classNames?: {
      root?: string
    }
  }) => (
    <button data-testid="button" className={classNames?.root} {...props}>
      {children}
      {suffix}
    </button>
  ),
  IconButton: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="icon-button">{children}</span>
  )
}))

jest.mock('@negative-space/field', () => ({
  Field: ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div data-testid="field">
      {label && <span>{label}</span>}
      {children}
    </div>
  )
}))

jest.mock('@negative-space/listbox', () => ({
  Listbox: ({
    items,
    onValueChange
  }: {
    items: Array<{
      option?: {
        value: string
        children: React.ReactNode
      }
    }>
    onValueChange: (value: string) => void
  }) => (
    <div data-testid="listbox">
      {items.map((item) => (
        <button
          key={item.option?.value}
          data-testid="option"
          onClick={() => onValueChange(item.option?.value ?? '')}
        >
          {item.option?.children}
        </button>
      ))}
    </div>
  )
}))

jest.mock('@negative-space/popover', () => ({
  usePopover: jest.fn(),
  Popover: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover">{children}</div>
  )
}))

describe('Select', () => {
  const close = jest.fn()
  const referenceRef = jest.fn()
  const getReferenceProps = jest.fn(() => ({}))

  beforeEach(() => {
    jest.clearAllMocks()

    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      },
      components: {
        select: {
          animation: undefined
        }
      }
    } as unknown as ReturnType<typeof useNSUI>)

    jest.mocked(usePopover).mockReturnValue({
      close,
      referenceRef,
      getReferenceProps,
      isOpen: false
    } as unknown as ReturnType<typeof usePopover>)
  })

  it('should render select with placeholder', () => {
    render(<Select items={[]} placeholder="Choose" />)

    expect(screen.getByText('Choose')).toBeInTheDocument()
  })

  it('should apply default select className', () => {
    render(<Select items={[]} placeholder="Choose" />)

    expect(screen.getByTestId('button')).toHaveClass('nsui-select')
  })

  it('should render selected item from defaultValue', () => {
    render(
      <Select
        items={[
          {
            option: {
              value: 'one',
              children: 'One'
            }
          }
        ]}
        defaultValue="one"
      />
    )

    expect(screen.getByTestId('button')).toHaveTextContent('One')
  })

  it('should render field props', () => {
    render(<Select items={[]} label="Label" />)

    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('should render custom trigger className', () => {
    render(
      <Select
        items={[]}
        classNames={{
          trigger: {
            root: 'custom-trigger'
          }
        }}
      />
    )

    expect(screen.getByTestId('button')).toHaveClass('custom-trigger')
  })

  it('should call onValueChange and close popover when selecting an item', () => {
    const onValueChange = jest.fn()

    render(
      <Select
        items={[
          {
            option: {
              value: 'one',
              children: 'One'
            }
          }
        ]}
        onValueChange={onValueChange}
      />
    )

    fireEvent.click(screen.getByTestId('option'))

    expect(onValueChange).toHaveBeenCalledWith('one')
    expect(close).toHaveBeenCalled()
  })

  it('should render custom suffix', () => {
    render(
      <Select
        items={[]}
        triggerProps={{
          suffix: <span data-testid="custom-suffix">Custom</span>
        }}
      />
    )

    expect(screen.getByTestId('custom-suffix')).toBeInTheDocument()
  })

  it('should pass popover reference props', () => {
    render(<Select items={[]} />)

    expect(getReferenceProps).toHaveBeenCalled()
  })
})
