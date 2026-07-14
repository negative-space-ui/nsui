import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Link } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    },
    components: {
      link: {
        underline: false
      }
    }
  })
}))

describe('Link', () => {
  it('renders correctly', () => {
    render(<Link href="/test">Test link</Link>)

    const link = screen.getByRole('link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('ns-link')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies custom className', () => {
    render(
      <Link href="/test" className="custom">
        Link
      </Link>
    )

    expect(screen.getByRole('link')).toHaveClass('ns-link', 'custom')
  })

  it('sets underline from prop', () => {
    render(
      <Link href="/test" underline>
        Link
      </Link>
    )

    expect(screen.getByRole('link')).toHaveAttribute('data-underline', 'true')
  })

  it('uses default underline from config', () => {
    render(<Link href="/test">Link</Link>)

    expect(screen.getByRole('link')).toHaveAttribute('data-underline', 'false')
  })

  it('sets disabled attributes', () => {
    render(
      <Link href="/test" disabled>
        Disabled
      </Link>
    )

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('data-disabled', 'true')
    expect(link).toHaveAttribute('tabindex', '-1')
  })

  it('prevents click when disabled', () => {
    const onClick = jest.fn()

    render(
      <Link href="/test" disabled onClick={onClick}>
        Disabled
      </Link>
    )

    fireEvent.click(screen.getByRole('link'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('calls onClick when enabled', () => {
    const onClick = jest.fn()

    render(
      <Link href="/test" onClick={onClick}>
        Enabled
      </Link>
    )

    fireEvent.click(screen.getByRole('link'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('adds noopener noreferrer for external links', () => {
    render(
      <Link href="https://example.com" target="_blank">
        External
      </Link>
    )

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('rel', 'noopener noreferrer')

    expect(link).toHaveAttribute('target', '_blank')
  })

  it('keeps provided rel for non external links', () => {
    render(
      <Link href="/test" rel="author">
        Link
      </Link>
    )

    expect(screen.getByRole('link')).toHaveAttribute('rel', 'author')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLAnchorElement>()

    render(
      <Link href="/test" ref={ref}>
        Link
      </Link>
    )

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
  })
})
