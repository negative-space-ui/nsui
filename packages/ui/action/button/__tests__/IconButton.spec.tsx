import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { IconButton } from '..'

const createRipple = jest.fn()

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    },
    components: {
      iconButton: {
        animation: 'ripple'
      }
    }
  })
}))

jest.mock('@negative-space/ripple', () => ({
  useRipple: () => ({
    createRipple
  })
}))

jest.mock('../src/useButtonContext', () => ({
  useButtonContextConditional: () => ({
    disabled: false
  })
}))

const Icon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg data-testid="icon" className={className} style={style} />
)

beforeEach(() => {
  jest.clearAllMocks()
})

describe('IconButton', () => {
  it('renders icon', () => {
    render(
      <IconButton aria-label="menu">
        <Icon />
      </IconButton>
    )

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders text children inside an icon wrapper', () => {
    render(<IconButton aria-label="search">🔍</IconButton>)

    const icon = screen.getByText('🔍')

    expect(icon).toBeInTheDocument()
    expect(icon.tagName).toBe('SPAN')
    expect(icon).toHaveClass('ns-icon-button-icon')
  })

  it('applies icon class and style to text children wrapper', () => {
    render(
      <IconButton
        aria-label="search"
        classNames={{ icon: 'custom-icon' }}
        styles={{
          icon: {
            fontSize: 20
          }
        }}
      >
        🔍
      </IconButton>
    )

    const icon = screen.getByText('🔍')

    expect(icon).toHaveClass('ns-icon-button-icon', 'custom-icon')

    expect(icon).toHaveStyle({
      fontSize: '20px'
    })
  })

  it('calls onClick', () => {
    const onClick = jest.fn()

    render(
      <IconButton aria-label="menu" onClick={onClick}>
        <Icon />
      </IconButton>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('creates ripple on mouse click', () => {
    render(
      <IconButton aria-label="menu">
        <Icon />
      </IconButton>
    )

    fireEvent.click(screen.getByRole('button'), {
      detail: 1
    })

    expect(createRipple).toHaveBeenCalledWith(expect.any(Object), { centered: false })
  })

  it('creates centered ripple on keyboard click', () => {
    render(
      <IconButton aria-label="menu">
        <Icon />
      </IconButton>
    )

    fireEvent.click(screen.getByRole('button'), {
      detail: 0
    })

    expect(createRipple).toHaveBeenCalledWith(expect.any(Object), { centered: true })
  })

  it('does not call onClick when disabled', () => {
    const onClick = jest.fn()

    render(
      <IconButton aria-label="menu" disabled onClick={onClick}>
        <Icon />
      </IconButton>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
    expect(createRipple).not.toHaveBeenCalled()
  })

  it('does not create ripple when animation is disabled', () => {
    render(
      <IconButton aria-label="menu" animation="none">
        <Icon />
      </IconButton>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(createRipple).not.toHaveBeenCalled()
  })

  it('applies custom root class', () => {
    render(
      <IconButton aria-label="menu" classNames={{ root: 'custom-root' }}>
        <Icon />
      </IconButton>
    )

    expect(screen.getByRole('button')).toHaveClass('ns-icon-button', 'custom-root')
  })

  it('merges icon class names', () => {
    render(
      <IconButton aria-label="menu" classNames={{ icon: 'custom-icon' }}>
        <Icon className="child-icon" />
      </IconButton>
    )

    expect(screen.getByTestId('icon')).toHaveClass(
      'ns-icon-button-icon',
      'custom-icon',
      'child-icon'
    )
  })

  it('merges icon styles', () => {
    render(
      <IconButton
        aria-label="menu"
        styles={{
          icon: {
            color: 'red'
          }
        }}
      >
        <Icon
          style={{
            width: 20
          }}
        />
      </IconButton>
    )

    expect(screen.getByTestId('icon')).toHaveStyle({
      color: 'rgb(255, 0, 0)',
      width: '20px'
    })
  })

  it('accepts custom type', () => {
    render(
      <IconButton aria-label="menu" type="submit">
        <Icon />
      </IconButton>
    )

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
