import { render, screen } from '@testing-library/react'
import React from 'react'

import { ButtonGroup } from '..'
import { ButtonContext } from '../src/ButtonContext'
import type { IconButtonProps } from '../src/IconButton'

type FlexMockProps = React.PropsWithChildren<React.ComponentPropsWithoutRef<'div'>>

type ButtonMockProps = React.PropsWithChildren<
  React.ComponentPropsWithoutRef<'button'> & {
    controlled?: boolean
    classNames?: Record<string, string>
    styles?: Record<string, React.CSSProperties>
  }
>

type IconButtonMockProps = React.ComponentPropsWithoutRef<'button'> & {
  controlled?: boolean
  classNames?: Record<string, string>
  styles?: Record<string, React.CSSProperties>
}

type IconButtonItemProps = Omit<IconButtonProps, 'controlled'>

jest.mock('@negative-space/system', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
  mergeCn: (...objects: Array<Record<string, unknown> | undefined>) =>
    Object.assign({}, ...objects.filter(Boolean)),
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  })
}))

jest.mock('@negative-space/flex', () => ({
  Flex: React.forwardRef<HTMLDivElement, FlexMockProps>(({ children, ...props }, ref) => (
    <div ref={ref} data-testid="flex-root" {...props}>
      {children}
    </div>
  ))
}))

jest.mock('../src/Button', () => ({
  Button: ({ children, controlled, classNames, styles, ...props }: ButtonMockProps) => (
    <button
      data-testid="button"
      data-controlled={String(controlled)}
      data-context-disabled={String(React.useContext(ButtonContext)?.disabled)}
      data-classnames={JSON.stringify(classNames)}
      style={styles?.root}
      {...props}
    >
      {children}
    </button>
  )
}))

jest.mock('../src/IconButton', () => ({
  IconButton: ({ controlled, classNames, styles, ...props }: IconButtonMockProps) => (
    <button
      data-testid="icon-button"
      data-controlled={String(controlled)}
      data-context-disabled={String(React.useContext(ButtonContext)?.disabled)}
      data-classnames={JSON.stringify(classNames)}
      style={styles?.root}
      {...props}
    />
  )
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('ButtonGroup', () => {
  it('renders a button item with its children', () => {
    render(<ButtonGroup items={[{ button: { children: 'Save' } }]} />)

    expect(screen.getByTestId('button')).toHaveTextContent('Save')
  })

  it('renders an icon button item', () => {
    const iconButton: IconButtonItemProps = { 'aria-label': 'Close', children: <span>close</span> }

    render(<ButtonGroup items={[{ iconButton }]} />)

    expect(screen.getByTestId('icon-button')).toHaveAttribute('aria-label', 'Close')
  })

  it('renders multiple items in order', () => {
    const iconButton: IconButtonItemProps = { 'aria-label': 'Close', children: <span>close</span> }

    render(
      <ButtonGroup
        items={[{ button: { children: 'One' } }, { iconButton }, { button: { children: 'Two' } }]}
      />
    )

    const buttons = screen.getAllByTestId('button')
    const iconButtons = screen.getAllByTestId('icon-button')

    expect(buttons).toHaveLength(2)
    expect(iconButtons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent('One')
    expect(buttons[1]).toHaveTextContent('Two')
  })

  it('marks every button item as controlled', () => {
    render(<ButtonGroup items={[{ button: { children: 'Save' } }]} />)

    expect(screen.getByTestId('button')).toHaveAttribute('data-controlled', 'true')
  })

  it('marks every icon button item as controlled', () => {
    const iconButton: IconButtonItemProps = { 'aria-label': 'Close', children: <span>close</span> }

    render(<ButtonGroup items={[{ iconButton }]} />)

    expect(screen.getByTestId('icon-button')).toHaveAttribute('data-controlled', 'true')
  })

  it('propagates disabled to children through ButtonContext', () => {
    render(<ButtonGroup disabled items={[{ button: { children: 'Save' } }]} />)

    expect(screen.getByTestId('button')).toHaveAttribute('data-context-disabled', 'true')
  })

  it('leaves context disabled as undefined when the prop is not set', () => {
    render(<ButtonGroup items={[{ button: { children: 'Save' } }]} />)

    expect(screen.getByTestId('button')).toHaveAttribute('data-context-disabled', 'undefined')
  })

  it('applies the prefixCls class and a custom root className to the root element', () => {
    render(<ButtonGroup items={[]} classNames={{ root: 'my-root' }} />)

    expect(screen.getByTestId('flex-root')).toHaveClass('ns-button-group', 'my-root')
  })

  it('applies the root style to the root element', () => {
    render(<ButtonGroup items={[]} styles={{ root: { marginTop: 8 } }} />)

    expect(screen.getByTestId('flex-root')).toHaveStyle({ marginTop: '8px' })
  })

  it('forwards a ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<ButtonGroup ref={ref} items={[]} />)

    expect(ref.current).toBe(screen.getByTestId('flex-root'))
  })

  it('merges group-level and item-level classNames for a button item', () => {
    render(
      <ButtonGroup
        items={[
          {
            button: {
              children: 'Save',
              classNames: { root: 'button-own' }
            }
          }
        ]}
        classNames={{ button: { root: 'group-button' } }}
      />
    )

    const classNames = JSON.parse(
      screen.getByTestId('button').getAttribute('data-classnames') ?? '{}'
    )

    expect(classNames).toEqual({ root: 'button-own' })
  })

  it('passes group-level classNames directly to an icon button item', () => {
    const iconButton: IconButtonItemProps = { children: <span>close</span> }

    render(
      <ButtonGroup
        items={[{ iconButton }]}
        classNames={{ iconButton: { root: 'group-icon-button' } }}
      />
    )

    const classNames = JSON.parse(
      screen.getByTestId('icon-button').getAttribute('data-classnames') ?? '{}'
    )

    expect(classNames).toEqual({ root: 'group-icon-button' })
  })

  it('applies item-level styles to a button item', () => {
    render(
      <ButtonGroup
        items={[
          {
            button: {
              children: 'Save',
              styles: { root: { color: 'red' } }
            }
          }
        ]}
      />
    )

    expect(screen.getByTestId('button')).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })
})
