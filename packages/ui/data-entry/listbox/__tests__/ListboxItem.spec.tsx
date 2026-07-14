import { useNSUI } from '@negative-space/system'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { ListboxOption } from '../src/ListboxOption'
import { useListboxContext } from '../src/useListboxContext'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

jest.mock('../src/useListboxContext', () => ({
  useListboxContext: jest.fn()
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
    onSelect?: () => void
    value?: string
    disabled?: boolean
    role?: string
    className?: string
    style?: React.CSSProperties
    'data-selected'?: boolean
  }) => (
    <li
      {...props}
      data-testid="option"
      onClick={(event) => onClick?.(props.value, event)}
      onKeyDown={() => onSelect?.()}
    >
      {children}
    </li>
  )
}))

jest.mock('@negative-space/checkmark', () => ({
  Checkmark: ({
    checked,
    className
  }: {
    checked?: boolean
    className?: string
    style?: React.CSSProperties
  }) => <span data-testid="checkmark" data-checked={checked} className={className} />
}))

describe('ListboxOption', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)
  })

  it('should render option', () => {
    jest.mocked(useListboxContext).mockReturnValue({
      value: null,
      selectionMode: 'single',
      onChange: jest.fn(),
      disabled: false
    })

    render(<ListboxOption value="one">Option</ListboxOption>)

    const option = screen.getByTestId('option')

    expect(option).toHaveAttribute('role', 'option')
    expect(option).toHaveTextContent('Option')
  })

  it('should apply default className', () => {
    jest.mocked(useListboxContext).mockReturnValue({
      value: null,
      selectionMode: 'single',
      onChange: jest.fn(),
      disabled: false
    })

    render(<ListboxOption value="one">Option</ListboxOption>)

    expect(screen.getByTestId('option')).toHaveClass('nsui-listbox-option')
  })

  it('should render selected in single mode', () => {
    jest.mocked(useListboxContext).mockReturnValue({
      value: 'one',
      selectionMode: 'single',
      onChange: jest.fn(),
      disabled: false
    })

    render(<ListboxOption value="one">Option</ListboxOption>)

    expect(screen.getByTestId('option')).toHaveAttribute('data-selected', 'true')

    expect(screen.getByTestId('checkmark')).toHaveAttribute('data-checked', 'true')
  })

  it('should select value in single mode', () => {
    const onChange = jest.fn()

    jest.mocked(useListboxContext).mockReturnValue({
      value: null,
      selectionMode: 'single',
      onChange,
      disabled: false
    })

    render(<ListboxOption value="one">Option</ListboxOption>)

    fireEvent.click(screen.getByTestId('option'))

    expect(onChange).toHaveBeenCalledWith('one')
  })

  it('should select value in multiple mode', () => {
    const onChange = jest.fn()

    jest.mocked(useListboxContext).mockReturnValue({
      value: ['one'],
      selectionMode: 'multiple',
      onChange,
      disabled: false
    })

    render(<ListboxOption value="two">Option</ListboxOption>)

    fireEvent.click(screen.getByTestId('option'))

    expect(onChange).toHaveBeenCalledWith(['one', 'two'])
  })

  it('should remove value in multiple mode when selected', () => {
    const onChange = jest.fn()

    jest.mocked(useListboxContext).mockReturnValue({
      value: ['one', 'two'],
      selectionMode: 'multiple',
      onChange,
      disabled: false
    })

    render(<ListboxOption value="one">Option</ListboxOption>)

    fireEvent.click(screen.getByTestId('option'))

    expect(onChange).toHaveBeenCalledWith(['two'])
  })

  it('should not select when disabled', () => {
    const onChange = jest.fn()

    jest.mocked(useListboxContext).mockReturnValue({
      value: null,
      selectionMode: 'single',
      onChange,
      disabled: true
    })

    render(<ListboxOption value="one">Option</ListboxOption>)

    fireEvent.click(screen.getByTestId('option'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should call custom onClick', () => {
    const onClick = jest.fn()

    jest.mocked(useListboxContext).mockReturnValue({
      value: null,
      selectionMode: 'single',
      onChange: jest.fn(),
      disabled: false
    })

    render(
      <ListboxOption value="one" onClick={onClick}>
        Option
      </ListboxOption>
    )

    fireEvent.click(screen.getByTestId('option'))

    const [value, event] = onClick.mock.calls[0]

    expect(value).toBe('one')
    expect(event.type).toBe('click')
  })

  it('should apply custom styles and classes', () => {
    jest.mocked(useListboxContext).mockReturnValue({
      value: null,
      selectionMode: 'single',
      onChange: jest.fn(),
      disabled: false
    })

    render(
      <ListboxOption
        value="one"
        classNames={{
          root: 'custom-root',
          checkmark: 'custom-check'
        }}
        styles={{
          root: {
            display: 'flex'
          }
        }}
      >
        Option
      </ListboxOption>
    )

    expect(screen.getByTestId('option')).toHaveClass('custom-root')

    expect(screen.getByTestId('checkmark')).toHaveClass('custom-check')
  })
})
