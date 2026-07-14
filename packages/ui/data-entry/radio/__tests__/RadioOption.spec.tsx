import { useNSUI } from '@negative-space/system'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { RadioOption } from '../src/RadioOption'
import { useRadioContext } from '../src/useRadioContext'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

jest.mock('../src/useRadioContext', () => ({
  useRadioContext: jest.fn()
}))

jest.mock('@negative-space/collection', () => ({
  CollectionItem: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode
    value?: string
    role?: string
    disabled?: boolean
    className?: string
    style?: React.CSSProperties
    'data-checked'?: boolean
    'aria-checked'?: boolean
    'data-visible'?: boolean
    onClick?: () => void
    onSelect?: () => void
  }) => (
    <li {...props} data-testid="radio-option" onClick={onClick}>
      {children}
    </li>
  )
}))

const mockRadioContext = (overrides?: Partial<ReturnType<typeof useRadioContext>>) => {
  jest.mocked(useRadioContext).mockReturnValue({
    name: 'radio-group',
    selectedValue: undefined,
    onChange: jest.fn(),
    disabled: false,
    ...overrides
  })
}

describe('RadioOption', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      },
      components: {
        radio: {
          animation: 'scale'
        }
      }
    } as unknown as ReturnType<typeof useNSUI>)
  })

  it('should render option', () => {
    mockRadioContext()

    render(<RadioOption value="one" label="One" />)

    expect(screen.getByTestId('radio-option')).toHaveAttribute('role', 'radio')

    expect(screen.getByText('One')).toBeInTheDocument()
  })

  it('should apply default className', () => {
    mockRadioContext()

    render(<RadioOption value="one" label="One" />)

    expect(screen.getByTestId('radio-option')).toHaveClass('nsui-radio-option')
  })

  it('should render checked state', () => {
    mockRadioContext({
      selectedValue: 'one'
    })

    render(<RadioOption value="one" label="One" />)

    const option = screen.getByTestId('radio-option')

    expect(option).toHaveAttribute('data-checked', 'true')

    expect(option).toHaveAttribute('aria-checked', 'true')

    expect(option).toHaveAttribute('data-visible', 'true')
  })

  it('should call onChange when selected', () => {
    const onChange = jest.fn()

    mockRadioContext({
      onChange
    })

    render(<RadioOption value="one" label="One" />)

    fireEvent.click(screen.getByTestId('radio-option'))

    expect(onChange).toHaveBeenCalledWith('one')
  })

  it('should not call onChange when disabled', () => {
    const onChange = jest.fn()

    mockRadioContext({
      onChange,
      disabled: true
    })

    render(<RadioOption value="one" label="One" />)

    fireEvent.click(screen.getByTestId('radio-option'))

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should prioritize option disabled over group disabled', () => {
    const onChange = jest.fn()

    mockRadioContext({
      onChange,
      disabled: true
    })

    render(<RadioOption value="one" label="One" disabled={false} />)

    fireEvent.click(screen.getByTestId('radio-option'))

    expect(onChange).toHaveBeenCalledWith('one')
  })

  it('should apply custom classes', () => {
    mockRadioContext()

    render(
      <RadioOption
        value="one"
        label="One"
        classNames={{
          root: 'root-class',
          radio: 'radio-class',
          inner: 'inner-class'
        }}
      />
    )

    const option = screen.getByTestId('radio-option')

    expect(option).toHaveClass('root-class')

    expect(option.querySelector('.radio-class')).toBeInTheDocument()

    expect(option.querySelector('.inner-class')).toBeInTheDocument()
  })

  it('should apply custom styles', () => {
    mockRadioContext()

    render(
      <RadioOption
        value="one"
        label="One"
        styles={{
          root: {
            display: 'flex'
          }
        }}
      />
    )

    expect(screen.getByTestId('radio-option')).toHaveStyle({
      display: 'flex'
    })
  })

  it('should use custom animation', () => {
    mockRadioContext({
      selectedValue: 'one'
    })

    render(<RadioOption value="one" label="One" animation="fade" />)

    expect(screen.getByTestId('radio-option').querySelector('.nsui-fade')).toBeInTheDocument()
  })
})
