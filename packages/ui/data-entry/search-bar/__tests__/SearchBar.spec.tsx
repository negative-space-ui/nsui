import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { SearchBar } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  Search: () => <span data-testid="search-icon" />,
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  })
}))

jest.mock('@negative-space/input', () => ({
  Input: React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & {
      suffix?: React.ReactNode
      classNames?: {
        root?: string
        content?: string
      }
      styles?: {
        content?: React.CSSProperties
      }
    }
  >(({ suffix, classNames, styles, ...props }, ref) => (
    <div data-testid="input-root" className={classNames?.root}>
      <input ref={ref} {...props} className={classNames?.content} style={styles?.content} />
      <div data-testid="input-suffix">{suffix}</div>
    </div>
  ))
}))

jest.mock('@negative-space/button', () => ({
  CloseButton: ({
    onClick,
    classNames,
    ...props
  }: {
    onClick?: () => void
    classNames?: { root?: string }
    [key: string]: unknown
  }) => (
    <button
      type="button"
      data-testid="clear-button"
      onClick={onClick}
      className={classNames?.root}
      {...props}
    >
      clear
    </button>
  ),

  IconButton: ({
    children,
    onClick,
    classNames,
    ...props
  }: React.PropsWithChildren<{
    onClick?: () => void
    classNames?: { root?: string }
    [key: string]: unknown
  }>) => (
    <button
      type="button"
      data-testid="search-button"
      onClick={onClick}
      className={classNames?.root}
      {...props}
    >
      {children}
    </button>
  )
}))

jest.mock('@negative-space/popover', () => ({
  Popover: ({
    children,
    id,
    role,
    classNames
  }: React.PropsWithChildren<{
    id?: string
    role?: string
    classNames?: { root?: string }
  }>) => (
    <div id={id} role={role} data-testid="popover" className={classNames?.root}>
      {children}
    </div>
  ),

  usePopover: () => ({
    referenceRef: jest.fn(),
    getReferenceProps: () => ({}),
    close: jest.fn()
  })
}))

jest.mock('../src/SearchBarSuggestionItem', () => ({
  SearchBarSuggestionItem: ({
    children,
    id,
    onClick,
    onFocus,
    onMouseEnter,
    onKeyDown,
    ...props
  }: React.PropsWithChildren<{
    id: string
    onClick?: () => void
    onFocus?: () => void
    onMouseEnter?: () => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void
    [key: string]: unknown
  }>) => (
    <div
      id={id}
      tabIndex={0}
      onClick={onClick}
      onFocus={onFocus}
      onMouseEnter={onMouseEnter}
      onKeyDown={onKeyDown}
      {...props}
    >
      {children}
    </div>
  )
}))

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = jest.fn()
})

describe('SearchBar', () => {
  const suggestions = [
    {
      id: 'suggestion-1',
      children: 'suggestion one'
    },
    {
      id: 'suggestion-2',
      children: 'suggestion two'
    },
    {
      id: 'another-3',
      children: 'another suggestion'
    }
  ]

  it('should render correctly', () => {
    render(<SearchBar placeholder="Search" />)

    const input = screen.getByPlaceholderText('Search')

    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('role', 'combobox')
    expect(input).toHaveAttribute('aria-autocomplete', 'list')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>()

    render(<SearchBar ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should call onChange', () => {
    const onChange = jest.fn()

    render(<SearchBar onChange={onChange} />)

    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        value: 'hello'
      }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].target.value).toBe('hello')
  })

  it('should filter suggestions', () => {
    render(<SearchBar suggestions={suggestions} />)

    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        value: 'another'
      }
    })

    expect(screen.getByText('another suggestion')).toBeInTheDocument()
    expect(screen.queryByText('suggestion one')).not.toBeInTheDocument()
    expect(screen.queryByText('suggestion two')).not.toBeInTheDocument()
  })

  it('should filter suggestions case-insensitively', () => {
    render(<SearchBar suggestions={suggestions} />)

    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        value: 'SUGGESTION ONE'
      }
    })

    expect(screen.getByText('suggestion one')).toBeInTheDocument()
    expect(screen.queryByText('suggestion two')).not.toBeInTheDocument()
  })

  it('should open suggestions when there are matches', () => {
    render(<SearchBar suggestions={suggestions} />)

    const input = screen.getByRole('combobox')

    fireEvent.change(input, {
      target: {
        value: 'suggestion'
      }
    })

    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(input).toHaveAttribute('data-has-suggestions', 'true')
  })

  it('should close suggestions when there are no matches', () => {
    render(<SearchBar suggestions={suggestions} />)

    const input = screen.getByRole('combobox')

    fireEvent.change(input, {
      target: {
        value: 'suggestion'
      }
    })

    expect(input).toHaveAttribute('aria-expanded', 'true')

    fireEvent.change(input, {
      target: {
        value: 'nothing'
      }
    })

    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(input).not.toHaveAttribute('data-has-suggestions')
  })

  it('should navigate suggestions with ArrowDown and ArrowUp', () => {
    render(<SearchBar suggestions={suggestions} />)

    const input = screen.getByRole('combobox')

    input.focus()

    fireEvent.change(input, {
      target: {
        value: 'suggestion'
      }
    })

    fireEvent.keyDown(input, {
      key: 'ArrowDown'
    })

    const first = screen.getByText('suggestion one')
    const second = screen.getByText('suggestion two')

    expect(first).toHaveFocus()
    expect(first).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(first, {
      key: 'ArrowDown'
    })

    expect(second).toHaveFocus()
    expect(second).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(second, {
      key: 'ArrowUp'
    })

    expect(first).toHaveFocus()
  })

  it('should return focus to input with ArrowUp from first suggestion', () => {
    render(<SearchBar suggestions={suggestions} />)

    const input = screen.getByRole('combobox')

    input.focus()

    fireEvent.change(input, {
      target: {
        value: 'suggestion'
      }
    })

    fireEvent.keyDown(input, {
      key: 'ArrowDown'
    })

    const first = screen.getByText('suggestion one')

    fireEvent.keyDown(first, {
      key: 'ArrowUp'
    })

    expect(input).toHaveFocus()
  })

  it('should select suggestion with Enter', () => {
    const onClick = jest.fn()

    render(
      <SearchBar
        suggestions={[
          {
            id: 'suggestion-1',
            children: 'suggestion one',
            onClick
          }
        ]}
      />
    )

    const input = screen.getByRole('combobox')

    input.focus()

    fireEvent.change(input, {
      target: {
        value: 'suggestion'
      }
    })

    fireEvent.keyDown(input, {
      key: 'ArrowDown'
    })

    fireEvent.keyDown(screen.getByText('suggestion one'), {
      key: 'Enter'
    })

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('should close suggestions with Escape', () => {
    render(<SearchBar suggestions={suggestions} />)

    const input = screen.getByRole('combobox')

    input.focus()

    fireEvent.change(input, {
      target: {
        value: 'suggestion'
      }
    })

    expect(input).toHaveAttribute('aria-expanded', 'true')

    fireEvent.keyDown(input, {
      key: 'Escape'
    })

    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('should return focus to input with Escape from suggestion', () => {
    render(<SearchBar suggestions={suggestions} />)

    const input = screen.getByRole('combobox')

    input.focus()

    fireEvent.change(input, {
      target: {
        value: 'suggestion'
      }
    })

    fireEvent.keyDown(input, {
      key: 'ArrowDown'
    })

    const suggestion = screen.getByText('suggestion one')

    fireEvent.keyDown(suggestion, {
      key: 'Escape'
    })

    expect(input).toHaveFocus()
    expect(input).toHaveAttribute('aria-expanded', 'false')
  })

  it('should call onSearch', () => {
    const onSearch = jest.fn()

    render(<SearchBar onSearch={onSearch} />)

    fireEvent.click(screen.getByTestId('search-button'))

    expect(onSearch).toHaveBeenCalledTimes(1)
  })

  it('should render and handle clear button', () => {
    const onClear = jest.fn()

    render(<SearchBar value="hello" showClearButton onClear={onClear} />)

    const clearButton = screen.getByTestId('clear-button')

    expect(clearButton).toHaveAttribute('data-has-value', 'true')

    fireEvent.click(clearButton)

    expect(onClear).toHaveBeenCalledTimes(1)
    expect(clearButton).toHaveAttribute('data-has-value', 'false')
  })

  it('should update input value when value prop changes', () => {
    const { rerender } = render(<SearchBar value="first" />)

    const input = screen.getByRole('combobox')

    expect(input).toHaveValue('first')

    rerender(<SearchBar value="second" />)

    expect(input).toHaveValue('second')
  })

  it('should call onFocus and onKeyDown', () => {
    const onFocus = jest.fn()
    const onKeyDown = jest.fn()

    render(<SearchBar onFocus={onFocus} onKeyDown={onKeyDown} />)

    const input = screen.getByRole('combobox')

    fireEvent.focus(input)
    fireEvent.keyDown(input, {
      key: 'a'
    })

    expect(onFocus).toHaveBeenCalledTimes(1)
    expect(onKeyDown).toHaveBeenCalledTimes(1)
  })

  it('should apply custom classes', () => {
    render(
      <SearchBar
        showClearButton
        classNames={{
          root: {
            root: 'custom-root'
          },
          clearButton: {
            root: 'custom-clear'
          },
          searchButton: {
            root: 'custom-search'
          }
        }}
      />
    )

    expect(screen.getByTestId('input-root')).toHaveClass('custom-root')
    expect(screen.getByTestId('clear-button')).toHaveClass('custom-clear')
    expect(screen.getByTestId('search-button')).toHaveClass('custom-search')
  })

  it('should pass input props', () => {
    render(<SearchBar name="search" disabled placeholder="Search" />)

    const input = screen.getByRole('combobox')

    expect(input).toHaveAttribute('name', 'search')
    expect(input).toHaveAttribute('placeholder', 'Search')
    expect(input).toBeDisabled()
  })
})
