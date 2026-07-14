import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Sidebar } from '..'

jest.mock('@negative-space/system', () => ({
  cn: (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' '),
  PanelLeft: () => <span data-testid="panel-left" />,
  PanelRight: () => <span data-testid="panel-right" />,
  useNSUI: () => ({
    global: {
      prefixCls: 'ns'
    }
  })
}))

jest.mock('@negative-space/button', () => ({
  IconButton: ({
    children,
    onClick
  }: {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  }) => (
    <button data-testid="collapse-button" onClick={onClick}>
      {children}
    </button>
  )
}))

jest.mock('@negative-space/resizable', () => ({
  ResizablePanel: React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & {
      as?: React.ElementType
    }
  >(({ children, as: Component = 'div', ...props }, ref) => (
    <Component ref={ref} data-testid="resizable-panel" {...props}>
      {children}
    </Component>
  ))
}))

describe('Sidebar', () => {
  it('renders correctly', () => {
    render(
      <Sidebar>
        <span>Content</span>
      </Sidebar>
    )

    const sidebar = screen.getByText('Content').closest('aside')

    expect(sidebar).toBeInTheDocument()
    expect(sidebar).toHaveAttribute('data-collapsed', 'false')
    expect(sidebar).toHaveClass('ns-sidebar')
  })

  it('toggles collapsed state internally', () => {
    render(
      <Sidebar>
        <span>Content</span>
      </Sidebar>
    )

    const sidebar = screen.getByText('Content').closest('aside')

    expect(sidebar).toHaveAttribute('data-collapsed', 'false')
    expect(screen.getByTestId('panel-left')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('collapse-button'))

    const updatedSidebar = screen.getByText('Content').closest('aside')

    expect(updatedSidebar).toHaveAttribute('data-collapsed', 'true')
    expect(updatedSidebar).toHaveClass('ns-sidebar-collapsed')
    expect(screen.getByTestId('panel-right')).toBeInTheDocument()
  })

  it('uses controlled collapsed state', () => {
    const onCollapsedChange = jest.fn()

    render(
      <Sidebar collapsed onCollapsedChange={onCollapsedChange}>
        <span>Content</span>
      </Sidebar>
    )

    const sidebar = screen.getByText('Content').closest('aside')

    expect(sidebar).toHaveAttribute('data-collapsed', 'true')
    expect(screen.getByTestId('panel-right')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('collapse-button'))

    expect(onCollapsedChange).toHaveBeenCalledWith(false)

    expect(sidebar).toHaveAttribute('data-collapsed', 'true')
  })

  it('applies custom classes and styles', () => {
    render(
      <Sidebar
        classNames={{
          root: 'custom-sidebar'
        }}
        styles={{
          root: {
            backgroundColor: 'red'
          }
        }}
      >
        <span>Content</span>
      </Sidebar>
    )

    const sidebar = screen.getByText('Content').closest('aside')

    expect(sidebar).toHaveClass('custom-sidebar')
    expect(sidebar).toHaveStyle({
      backgroundColor: '#ff0000'
    })
  })

  it('renders ResizablePanel when resizable is true', () => {
    render(
      <Sidebar resizable>
        <span>Content</span>
      </Sidebar>
    )

    expect(screen.getByTestId('resizable-panel')).toBeInTheDocument()
    expect(screen.getByText('Content').closest('aside')).toBeTruthy()
  })

  it('applies collapsed size when resizable sidebar is collapsed', () => {
    render(
      <Sidebar resizable collapsed collapsedSize={120}>
        <span>Content</span>
      </Sidebar>
    )

    const sidebar = screen.getByTestId('resizable-panel')

    expect(sidebar).toHaveStyle({
      flexGrow: '0',
      flexShrink: '0',
      flexBasis: '120px'
    })
  })
})
