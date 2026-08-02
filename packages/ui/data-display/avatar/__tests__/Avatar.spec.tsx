import { render, screen } from '@testing-library/react'
import React from 'react'

import { Avatar } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    },
    components: {
      avatar: {
        backgroundColors: ['#FF0000', '#00FF00', '#0000FF']
      }
    }
  })
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Avatar', () => {
  it('renders the first letter of the name', () => {
    render(<Avatar name="Negative Space" />)

    expect(screen.getByText('N')).toBeInTheDocument()
  })

  it('capitalizes the first letter of the name', () => {
    render(<Avatar name="negative space" />)

    expect(screen.getByText('N')).toBeInTheDocument()
  })

  it('trims whitespace before getting the first letter', () => {
    render(<Avatar name="   negative space" />)

    expect(screen.getByText('N')).toBeInTheDocument()
  })

  it('uses the background color based on the first letter', () => {
    render(<Avatar name="B" />)

    expect(screen.getByText('B')).toHaveStyle({
      backgroundColor: '#00FF00'
    })
  })

  it('uses custom background colors', () => {
    render(<Avatar name="B" backgroundColors={['#FFFFFF', '#000000']} />)

    expect(screen.getByText('B')).toHaveStyle({
      backgroundColor: '#000000'
    })
  })

  it('cycles through background colors', () => {
    render(<Avatar name="D" />)

    expect(screen.getByText('D')).toHaveStyle({
      backgroundColor: '#FF0000'
    })
  })

  it('does not apply a background color when the name does not start with a letter', () => {
    render(<Avatar name="123" />)

    expect(screen.getByText('1')).toHaveStyle({
      backgroundColor: ''
    })
  })

  it('renders an image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.png" alt="Avatar" />)

    expect(screen.getByAltText('Avatar')).toHaveAttribute('src', 'https://example.com/avatar.png')
  })

  it('uses fallbackImage when src is not provided', () => {
    render(<Avatar fallbackImage="https://example.com/fallback.png" alt="Avatar" />)

    expect(screen.getByAltText('Avatar')).toHaveAttribute('src', 'https://example.com/fallback.png')
  })

  it('prioritizes src over fallbackImage', () => {
    render(
      <Avatar
        src="https://example.com/avatar.png"
        fallbackImage="https://example.com/fallback.png"
        alt="Avatar"
      />
    )

    expect(screen.getByAltText('Avatar')).toHaveAttribute('src', 'https://example.com/avatar.png')
  })

  it('applies custom className', () => {
    render(<Avatar name="Negative Space" className="custom-avatar" />)

    expect(screen.getByText('N')).toHaveClass('custom-avatar')
  })

  it('applies the prefixed avatar class', () => {
    render(<Avatar name="Negative Space" />)

    expect(screen.getByText('N')).toHaveClass('ns-avatar')
  })

  it('passes props to the avatar element', () => {
    render(<Avatar name="Negative Space" data-testid="avatar" aria-label="Negative Space avatar" />)

    const avatar = screen.getByTestId('avatar')

    expect(avatar).toHaveAttribute('aria-label', 'Negative Space avatar')
  })

  it('renders nothing without name, src, or fallbackImage', () => {
    const { container } = render(<Avatar />)

    expect(container).toBeEmptyDOMElement()
  })

  it('forwards the ref to the image', () => {
    const ref = React.createRef<HTMLImageElement>()

    render(<Avatar src="https://example.com/avatar.png" ref={ref} alt="Avatar" />)

    expect(ref.current).toBeInstanceOf(HTMLImageElement)
  })
})
