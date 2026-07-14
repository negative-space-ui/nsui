import { useNSUI } from '@negative-space/system'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Listbox } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  mergeCn: (first?: { root?: string }, second?: { root?: string }) => ({
    root: [first?.root, second?.root].filter(Boolean).join(' ')
  }),
  useNSUI: jest.fn()
}))

jest.mock('@negative-space/field', () => ({
  Field: ({ children }: { children: React.ReactNode }) => <div data-testid="field">{children}</div>
}))

jest.mock('@negative-space/collection', () => ({
  Collection: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    role?: string
    className?: string
    style?: React.CSSProperties
    disabled?: boolean
    'aria-multiselectable'?: boolean
  }) => (
    <div data-testid="collection" {...props}>
      {children}
    </div>
  ),

  CollectionItem: ({
    children,
    value,
    onClick,
    ...props
  }: {
    children: React.ReactNode
    value?: string
    disabled?: boolean
    role?: string
    className?: string
    style?: React.CSSProperties
    'data-selected'?: boolean
    onClick?: (value: string | undefined, event: React.MouseEvent<HTMLLIElement>) => void
    onSelect?: () => void
  }) => (
    <li {...props} data-testid={`option-${value}`} onClick={(event) => onClick?.(value, event)}>
      {children}
    </li>
  )
}))

jest.mock('../src/ListboxGroup', () => ({
  ListboxGroup: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="group">{children}</div>
  )
}))

jest.mock('../src/ListboxSeparator', () => ({
  ListboxSeparator: () => <div data-testid="separator" />
}))

jest.mock('@negative-space/checkmark', () => ({
  Checkmark: ({ checked }: { checked?: boolean }) => (
    <span data-testid="checkmark" data-checked={checked} />
  )
}))

describe('Listbox', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)
  })

  it('should render field and collection', () => {
    render(<Listbox items={[]} />)

    expect(screen.getByTestId('field')).toBeInTheDocument()

    expect(screen.getByTestId('collection')).toHaveAttribute('role', 'listbox')
  })

  it('should apply default className', () => {
    render(<Listbox items={[]} />)

    expect(screen.getByTestId('collection')).toHaveClass('nsui-listbox')
  })

  it('should apply custom className', () => {
    render(
      <Listbox
        items={[]}
        classNames={{
          root: 'custom-listbox'
        }}
      />
    )

    expect(screen.getByTestId('collection')).toHaveClass('nsui-listbox custom-listbox')
  })

  it('should apply root style', () => {
    render(
      <Listbox
        items={[]}
        styles={{
          root: {
            display: 'flex'
          }
        }}
      />
    )

    expect(screen.getByTestId('collection')).toHaveStyle({
      display: 'flex'
    })
  })

  it('should render options', () => {
    render(
      <Listbox
        items={[
          {
            option: {
              value: 'one',
              children: 'One'
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('option-one')).toHaveTextContent('One')
  })

  it('should render groups', () => {
    render(
      <Listbox
        items={[
          {
            group: {
              children: 'Group'
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('group')).toBeInTheDocument()
  })

  it('should render separators', () => {
    render(
      <Listbox
        items={[
          {
            separator: {}
          }
        ]}
      />
    )

    expect(screen.getByTestId('separator')).toBeInTheDocument()
  })

  it('should set aria-multiselectable in multiple mode', () => {
    render(<Listbox selectionMode="multiple" items={[]} />)

    expect(screen.getByTestId('collection')).toHaveAttribute('aria-multiselectable', 'true')
  })

  it('should initialize with default value', () => {
    render(
      <Listbox
        defaultValue="one"
        items={[
          {
            option: {
              value: 'one',
              children: 'One'
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('option-one')).toBeInTheDocument()
  })

  it('should call onValueChange when option changes', () => {
    const onValueChange = jest.fn()

    render(
      <Listbox
        onValueChange={onValueChange}
        items={[
          {
            option: {
              value: 'one',
              children: 'One'
            }
          }
        ]}
      />
    )

    fireEvent.click(screen.getByTestId('option-one'))

    expect(onValueChange).toHaveBeenCalledWith('one')
  })

  it('should pass disabled to collection', () => {
    render(<Listbox disabled items={[]} />)

    expect(screen.getByTestId('collection')).toHaveAttribute('disabled')
  })
})
