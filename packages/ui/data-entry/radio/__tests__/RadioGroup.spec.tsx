import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { RadioGroup } from '../src/RadioGroup'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  mergeCn: (
    first?: {
      root?: string
    },
    second?: {
      root?: string
    }
  ) => ({
    root: [first?.root, second?.root].filter(Boolean).join(' ')
  }),

  useNSUI: jest.fn()
}))

jest.mock('@negative-space/field', () => ({
  Field: ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div data-testid="field">
      {label && <span>{label}</span>}
      {children}
    </div>
  )
}))

jest.mock('@negative-space/collection', () => ({
  Collection: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    role?: string
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
  }) => (
    <div data-testid="collection" {...props}>
      {children}
    </div>
  )
}))

jest.mock('../src/RadioOption', () => ({
  RadioOption: ({
    value,
    label,
    classNames,
    styles
  }: {
    value?: string
    label?: string
    classNames?: {
      root?: string
    }
    styles?: {
      root?: React.CSSProperties
    }
  }) => (
    <div
      data-testid="radio-option"
      data-value={value}
      className={classNames?.root}
      style={styles?.root}
    >
      {label}
    </div>
  )
}))

describe('RadioGroup', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as unknown as ReturnType<typeof useNSUI>)
  })

  it('should render radio group', () => {
    render(
      <RadioGroup
        options={[
          {
            value: 'one',
            label: 'One'
          }
        ]}
      />
    )

    expect(screen.getByTestId('collection')).toHaveAttribute('role', 'radiogroup')

    expect(screen.getByText('One')).toBeInTheDocument()
  })

  it('should apply default className', () => {
    render(<RadioGroup />)

    expect(screen.getByTestId('collection')).toHaveClass('nsui-radio-group')
  })

  it('should apply custom root className', () => {
    render(
      <RadioGroup
        classNames={{
          root: 'custom-root'
        }}
      />
    )

    expect(screen.getByTestId('collection')).toHaveClass('custom-root')
  })

  it('should render multiple options', () => {
    render(
      <RadioGroup
        options={[
          {
            value: 'one',
            label: 'One'
          },
          {
            value: 'two',
            label: 'Two'
          }
        ]}
      />
    )

    expect(screen.getAllByTestId('radio-option')).toHaveLength(2)
  })

  it('should pass disabled state', () => {
    render(<RadioGroup disabled />)

    expect(screen.getByTestId('collection')).toHaveAttribute('disabled')
  })

  it('should merge option classes', () => {
    render(
      <RadioGroup
        classNames={{
          option: {
            root: 'group-option'
          }
        }}
        options={[
          {
            value: 'one',
            label: 'One',
            classNames: {
              root: 'option-root'
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('radio-option')).toHaveClass('group-option option-root')
  })

  it('should merge option styles', () => {
    render(
      <RadioGroup
        styles={{
          option: {
            root: {
              display: 'flex'
            }
          }
        }}
        options={[
          {
            value: 'one',
            label: 'One',
            styles: {
              root: {
                alignItems: 'center'
              }
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('radio-option')).toHaveStyle({
      alignItems: 'center'
    })
  })

  it('should pass field props', () => {
    render(
      <RadioGroup
        fieldProps={{
          label: 'Label'
        }}
      />
    )

    expect(screen.getByText('Label')).toBeInTheDocument()
  })
})
