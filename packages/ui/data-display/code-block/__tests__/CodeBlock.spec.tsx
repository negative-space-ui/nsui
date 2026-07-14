import { render, screen } from '@testing-library/react'
import React from 'react'

jest.mock('prismjs/themes/prism-tomorrow.css', () => ({}))

const highlightAllUnder = jest.fn()

jest.mock('prismjs', () => ({
  highlightAllUnder
}))

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),

  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  })
}))

import { CodeBlock } from '../src/CodeBlock'

describe('CodeBlock', () => {
  beforeEach(() => {
    highlightAllUnder.mockClear()
  })

  it('should render correctly', () => {
    render(<CodeBlock>const value = true</CodeBlock>)

    const pre = screen.getByText('const value = true').parentElement

    expect(pre).toHaveClass('ns-code-block')
  })

  it('should use javascript as default language', () => {
    render(<CodeBlock>code</CodeBlock>)

    expect(screen.getByText('code')).toHaveClass('ns-code', 'language-javascript')
  })

  it('should apply custom language', () => {
    render(<CodeBlock language="typescript">code</CodeBlock>)

    expect(screen.getByText('code')).toHaveClass('ns-code', 'language-typescript')
  })

  it('should apply custom className', () => {
    render(<CodeBlock className="custom-class">code</CodeBlock>)

    expect(screen.getByText('code').parentElement).toHaveClass('custom-class')
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLPreElement>()

    render(<CodeBlock ref={ref}>code</CodeBlock>)

    expect(ref.current).toBeInstanceOf(HTMLPreElement)
  })

  it('should call Prism highlight on render', () => {
    render(<CodeBlock>code</CodeBlock>)

    expect(highlightAllUnder).toHaveBeenCalledTimes(1)
    expect(highlightAllUnder).toHaveBeenCalledWith(expect.any(HTMLElement))
  })

  it('should call Prism highlight when children change', () => {
    const { rerender } = render(<CodeBlock>first</CodeBlock>)

    expect(highlightAllUnder).toHaveBeenCalledTimes(1)

    rerender(<CodeBlock>second</CodeBlock>)

    expect(highlightAllUnder).toHaveBeenCalledTimes(2)
  })

  it('should pass html props', () => {
    render(
      <CodeBlock data-testid="code-block" aria-label="source">
        code
      </CodeBlock>
    )

    const pre = screen.getByTestId('code-block')

    expect(pre).toHaveAttribute('aria-label', 'source')
  })
})
