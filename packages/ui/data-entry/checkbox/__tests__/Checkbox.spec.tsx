import { useNSUI } from '@negative-space/system'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Checkbox } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

jest.mock('@negative-space/field', () => ({
  Field: React.forwardRef<HTMLFieldSetElement, React.ComponentPropsWithoutRef<'fieldset'>>(
    ({ children, ...props }, ref) => (
      <fieldset ref={ref} {...props}>
        {children}
      </fieldset>
    )
  )
}))

jest.mock('@negative-space/checkmark', () => ({
  Checkmark: ({
    checked,
    className,
    style
  }: {
    checked?: boolean
    className?: string
    style?: React.CSSProperties
  }) => <span data-testid="checkmark" data-checked={checked} className={className} style={style} />
}))

describe('Checkbox', () => {
  beforeEach(() => {
    jest.mocked(useNSUI).mockReturnValue({
      global: {
        prefixCls: 'nsui'
      }
    } as ReturnType<typeof useNSUI>)

    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    render(<Checkbox>Label</Checkbox>)

    const checkbox = screen.getByRole('checkbox')
    const wrapper = document.querySelector('.nsui-checkbox')

    expect(wrapper).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('should toggle when clicked', () => {
    render(<Checkbox>Label</Checkbox>)

    const checkbox = screen.getByRole('checkbox')
    const checkmark = screen.getByTestId('checkmark')

    fireEvent.click(checkbox)

    expect(checkbox).toHaveAttribute('aria-checked', 'true')
    expect(checkmark).toHaveAttribute('data-checked', 'true')

    fireEvent.click(checkbox)

    expect(checkbox).toHaveAttribute('aria-checked', 'false')
    expect(checkmark).toHaveAttribute('data-checked', 'false')
  })

  it('should call onChange with the next checked value', () => {
    const onChange = jest.fn()

    render(<Checkbox onChange={onChange}>Label</Checkbox>)

    fireEvent.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('should work as controlled component', () => {
    const onChange = jest.fn()

    const { rerender } = render(
      <Checkbox checked={false} onChange={onChange}>
        Label
      </Checkbox>
    )

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(onChange).toHaveBeenCalledWith(true)
    expect(checkbox).toHaveAttribute('aria-checked', 'false')

    rerender(
      <Checkbox checked onChange={onChange}>
        Label
      </Checkbox>
    )

    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('should not toggle when disabled', () => {
    const onChange = jest.fn()

    render(
      <Checkbox disabled onChange={onChange}>
        Label
      </Checkbox>
    )

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(onChange).not.toHaveBeenCalled()
    expect(checkbox).toHaveAttribute('aria-disabled', 'true')
    expect(checkbox).toHaveAttribute('tabindex', '-1')
  })

  it('should toggle with keyboard', () => {
    const onChange = jest.fn()

    render(<Checkbox onChange={onChange}>Label</Checkbox>)

    fireEvent.keyDown(screen.getByRole('checkbox'), {
      key: 'Enter'
    })

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('should call custom event handlers', () => {
    const onClick = jest.fn()
    const onKeyDown = jest.fn()

    render(
      <Checkbox onClick={onClick} onKeyDown={onKeyDown}>
        Label
      </Checkbox>
    )

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)
    fireEvent.keyDown(checkbox, {
      key: 'Tab'
    })

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onKeyDown).toHaveBeenCalledTimes(1)
  })

  it('should apply custom classes and styles', () => {
    render(
      <Checkbox
        classNames={{
          checkbox: 'custom-checkbox',
          checkboxInner: 'custom-inner',
          checkmark: 'custom-checkmark'
        }}
        styles={{
          checkbox: {
            padding: '10px'
          }
        }}
      >
        Label
      </Checkbox>
    )

    expect(document.querySelector('.custom-checkbox')).toBeInTheDocument()

    expect(document.querySelector('.custom-inner')).toBeInTheDocument()

    expect(screen.getByTestId('checkmark')).toHaveClass('custom-checkmark')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLFieldSetElement>()

    render(<Checkbox ref={ref}>Label</Checkbox>)

    expect(ref.current).toBeInstanceOf(HTMLFieldSetElement)
  })
})
