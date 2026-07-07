import { useNSUI } from '@negative-space/system'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { Text } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: jest.fn()
}))

const mockedUseNSUI = useNSUI as jest.Mock

describe('Text', () => {
  beforeEach(() => {
    mockedUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'nsui'
      },
      components: {
        text: {
          typeElement: 'span'
        }
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders text with default element', () => {
    render(<Text>Hello World</Text>)

    const text = screen.getByText('Hello World')

    expect(text).toBeInTheDocument()
    expect(text.tagName).toBe('SPAN')
  })

  it('renders custom text element', () => {
    render(<Text as="p">Paragraph Text</Text>)

    const text = screen.getByText('Paragraph Text')

    expect(text).toBeInTheDocument()
    expect(text.tagName).toBe('P')
  })

  it('applies default text class', () => {
    render(<Text>Text</Text>)

    expect(screen.getByText('Text')).toHaveClass('nsui-text')
  })

  it('merges custom className with text class', () => {
    render(<Text className="custom-class">Text</Text>)

    expect(screen.getByText('Text')).toHaveClass('nsui-text', 'custom-class')
  })

  it('passes HTML attributes to the element', () => {
    render(
      <Text id="text-id" data-testid="text">
        Text
      </Text>
    )

    const text = screen.getByTestId('text')

    expect(text).toHaveAttribute('id', 'text-id')
  })

  it('uses configured text element from NSUI context', () => {
    mockedUseNSUI.mockReturnValue({
      global: {
        prefixCls: 'nsui'
      },
      components: {
        text: {
          typeElement: 'small'
        }
      }
    })

    render(<Text>Text</Text>)

    expect(screen.getByText('Text').tagName).toBe('SMALL')
  })
})
