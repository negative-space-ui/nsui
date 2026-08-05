import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { TextArea } from '../src/TextArea'

const mockUseNSUI = jest.fn()

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),

  useNSUI: () => mockUseNSUI()
}))

jest.mock('@negative-space/field', () => ({
  Field: ({
    children,
    classNames,
    styles
  }: React.PropsWithChildren<{
    classNames?: {
      root?: string
    }
    styles?: {
      root?: React.CSSProperties
    }
  }>) => (
    <div data-testid="field" className={classNames?.root} style={styles?.root}>
      {children}
    </div>
  )
}))
describe('TextArea', () => {
  beforeEach(() => {
    mockUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'ns'
      }
    })
  })

  it('should render correctly', () => {
    render(<TextArea />)

    const textarea = screen.getByRole('textbox')

    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass('ns-text-area')

    expect(document.querySelector('.ns-text-area-wrapper')).toBeInTheDocument()
  })

  it('should render inside field', () => {
    render(<TextArea />)

    expect(screen.getByTestId('field')).toBeInTheDocument()
  })

  it('should render initial value', () => {
    render(<TextArea defaultValue="Hello world" />)

    expect(screen.getByRole('textbox')).toHaveValue('Hello world')
  })

  it('should render controlled value', () => {
    render(<TextArea value="Hello world" onChange={jest.fn()} />)

    expect(screen.getByRole('textbox')).toHaveValue('Hello world')
  })

  it('should call onChange', () => {
    const onChange = jest.fn()

    render(<TextArea onChange={onChange} />)

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Hello world' }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('should update character count on change', () => {
    render(<TextArea showCharacterCount maxLength={100} />)

    const textarea = screen.getByRole('textbox')

    expect(screen.getByText('0/100')).toBeInTheDocument()

    fireEvent.change(textarea, {
      target: { value: 'Hello' }
    })

    expect(screen.getByText('5/100')).toBeInTheDocument()
  })

  it('should render character count with initial value', () => {
    render(<TextArea showCharacterCount maxLength={100} defaultValue="Hello world" />)

    expect(screen.getByText('11/100')).toBeInTheDocument()
  })

  it('should not render character count by default', () => {
    render(<TextArea maxLength={100} />)

    expect(screen.queryByText('0/100')).not.toBeInTheDocument()
  })

  it('should not render character count without maxLength', () => {
    render(<TextArea showCharacterCount />)

    expect(screen.queryByText(/\/\d+/)).not.toBeInTheDocument()
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>()

    render(<TextArea ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('should apply custom classes', () => {
    render(
      <TextArea
        classNames={{
          wrapper: 'custom-wrapper',
          root: 'custom-root',
          characterCount: 'custom-character-count',
          field: {
            root: 'custom-field'
          }
        }}
      />
    )

    expect(screen.getByRole('textbox')).toHaveClass('custom-root')

    expect(document.querySelector('.custom-wrapper')).toBeInTheDocument()
    expect(document.querySelector('.custom-field')).toBeInTheDocument()
  })

  it('should apply custom character count class', () => {
    render(
      <TextArea
        showCharacterCount
        maxLength={100}
        classNames={{
          characterCount: 'custom-character-count'
        }}
      />
    )

    expect(document.querySelector('.custom-character-count')).toBeInTheDocument()
  })

  it('should apply custom styles', () => {
    render(
      <TextArea
        styles={{
          wrapper: {
            padding: '10px'
          },
          root: {
            backgroundColor: 'red'
          },
          characterCount: {
            fontSize: '12px'
          }
        }}
        showCharacterCount
        maxLength={100}
      />
    )

    expect(screen.getByRole('textbox')).toHaveStyle({
      backgroundColor: 'rgb(255, 0, 0)'
    })

    expect(document.querySelector('.ns-text-area-wrapper')).toHaveStyle({
      padding: '10px'
    })

    expect(screen.getByText('0/100')).toHaveStyle({
      fontSize: '12px'
    })
  })

  it('should pass textarea props', () => {
    render(
      <TextArea
        aria-label="description"
        placeholder="Enter description"
        disabled
        required
        rows={5}
      />
    )

    const textarea = screen.getByRole('textbox')

    expect(textarea).toHaveAttribute('aria-label', 'description')
    expect(textarea).toHaveAttribute('placeholder', 'Enter description')
    expect(textarea).toBeDisabled()
    expect(textarea).toBeRequired()
    expect(textarea).toHaveAttribute('rows', '5')
  })

  it('should pass maxLength to textarea', () => {
    render(<TextArea maxLength={100} />)

    expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '100')
  })

  it('should not fail without onChange', () => {
    render(<TextArea />)

    expect(() =>
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'Hello' }
      })
    ).not.toThrow()
  })

  it('should preserve the character count when onChange is provided', () => {
    const onChange = jest.fn()

    render(<TextArea showCharacterCount maxLength={100} onChange={onChange} />)

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Hello' }
    })

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(screen.getByText('5/100')).toBeInTheDocument()
  })
})
