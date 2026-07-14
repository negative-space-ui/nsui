import { cleanup, render } from '@testing-library/react'
import React from 'react'

import { ResizablePanel } from '..'
import { useResizable } from '../src/useResizable'

jest.mock('../src/useResizable', () => ({
  useResizable: jest.fn()
}))

jest.mock('@negative-space/system', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
  useNSUI: () => ({
    global: {
      prefixCls: 'nsui'
    }
  })
}))

const mockedUseResizable = useResizable as jest.Mock

describe('ResizablePanel', () => {
  const registerPanel = jest.fn()
  const unregisterPanel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseResizable.mockReturnValue({
      sizes: {},
      registerPanel,
      unregisterPanel
    })
  })

  afterEach(() => {
    cleanup()
  })

  it('renders correctly', () => {
    const { container } = render(<ResizablePanel>Content</ResizablePanel>)

    const panel = container.firstChild as HTMLElement

    expect(panel).toHaveClass('nsui-resizable-panel')

    expect(panel).toHaveTextContent('Content')
  })

  it('uses provided id', () => {
    const { container } = render(<ResizablePanel id="panel-1">Content</ResizablePanel>)

    const panel = container.firstChild as HTMLElement

    expect(panel).toHaveAttribute('data-resizable-id', 'panel-1')
  })

  it('registers panel on mount', () => {
    render(
      <ResizablePanel id="panel-1" defaultSize={30} minSize={10} maxSize={80}>
        Content
      </ResizablePanel>
    )

    expect(registerPanel).toHaveBeenCalledWith('panel-1', 30, 10, 80)
  })

  it('unregisters panel on unmount', () => {
    const { unmount } = render(<ResizablePanel id="panel-1">Content</ResizablePanel>)

    unmount()

    expect(unregisterPanel).toHaveBeenCalledWith('panel-1')
  })

  it('uses size from context', () => {
    mockedUseResizable.mockReturnValue({
      sizes: {
        'panel-1': 50
      },
      registerPanel,
      unregisterPanel
    })

    const { container } = render(<ResizablePanel id="panel-1">Content</ResizablePanel>)

    const panel = container.firstChild as HTMLElement

    expect(panel.style.flexGrow).toBe('50')
    expect(panel.style.flexShrink).toBe('50')
  })

  it('uses default size when context has no size', () => {
    const { container } = render(
      <ResizablePanel id="panel-1" defaultSize={25}>
        Content
      </ResizablePanel>
    )

    const panel = container.firstChild as HTMLElement

    expect(panel.style.flexGrow).toBe('25')
    expect(panel.style.flexShrink).toBe('25')
  })

  it('supports custom element with as prop', () => {
    const { container } = render(<ResizablePanel as="section">Content</ResizablePanel>)

    expect(container.querySelector('section')).toBeTruthy()
  })

  it('merges custom className', () => {
    const { container } = render(<ResizablePanel className="custom">Content</ResizablePanel>)

    const panel = container.firstChild as HTMLElement

    expect(panel).toHaveClass('nsui-resizable-panel')

    expect(panel).toHaveClass('custom')
  })

  it('merges custom style', () => {
    const { container } = render(
      <ResizablePanel
        style={{
          backgroundColor: 'red'
        }}
      >
        Content
      </ResizablePanel>
    )

    const panel = container.firstChild as HTMLElement

    expect(panel.style.backgroundColor).toBe('red')
  })
})
