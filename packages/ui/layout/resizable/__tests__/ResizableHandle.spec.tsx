import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { ResizableHandle } from '..'
import { useResizable } from '../src/useResizable'

jest.mock('../src/useResizable', () => ({
  useResizable: jest.fn()
}))

jest.mock('@negative-space/system', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
  mergeRefs:
    (...refs: Array<React.Ref<HTMLElement> | undefined>) =>
    (node: HTMLElement | null) => {
      refs.forEach((ref) => {
        if (!ref) return

        if (typeof ref === 'function') {
          ref(node)
          return
        }

        ref.current = node
      })
    },
  useNSUI: () => ({
    global: {
      prefixCls: 'nsui'
    }
  })
}))

jest.mock('@negative-space/divider', () => ({
  Divider: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, ...props }, ref) => (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  )
}))

class MockPointerEvent extends MouseEvent {
  pointerId: number

  constructor(type: string, init?: PointerEventInit) {
    super(type, init)
    this.pointerId = init?.pointerId ?? 0
  }
}

beforeAll(() => {
  Object.defineProperty(window, 'PointerEvent', {
    writable: true,
    value: MockPointerEvent
  })
})

const mockedUseResizable = useResizable as jest.Mock

describe('ResizableHandle', () => {
  const resizePair = jest.fn()

  beforeEach(() => {
    resizePair.mockClear()

    mockedUseResizable.mockReturnValue({
      direction: 'row',
      resizePair,
      sizes: {
        left: 50,
        right: 50
      }
    })
  })

  it('renders correctly', () => {
    const { container } = render(<ResizableHandle />)

    expect(container.firstChild).toHaveClass('nsui-resizable-handle')
  })

  it('renders disabled state', () => {
    const { container } = render(<ResizableHandle disabled />)

    expect(container.firstChild).toHaveAttribute('aria-disabled', 'true')
  })

  it('does not resize when disabled', () => {
    const { container } = render(<ResizableHandle disabled />)

    fireEvent.pointerDown(container.firstChild!, {
      pointerId: 1,
      clientX: 100
    })

    window.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 200
      })
    )

    expect(resizePair).not.toHaveBeenCalled()
  })

  it('resizes panels on pointer move', () => {
    const { container } = render(
      <>
        <div data-resizable-id="left" />
        <ResizableHandle />
        <div data-resizable-id="right" />
      </>
    )

    const handle = container.querySelector('.nsui-resizable-handle') as HTMLElement

    handle.setPointerCapture = jest.fn()

    Object.defineProperty(handle.parentElement, 'getBoundingClientRect', {
      value: () => ({
        width: 500,
        height: 500
      })
    })

    fireEvent.pointerDown(handle, {
      pointerId: 1,
      clientX: 100
    })

    window.dispatchEvent(
      new PointerEvent('pointermove', {
        clientX: 150
      })
    )

    expect(resizePair).toHaveBeenCalledWith('left', 'right', 10)
  })

  it('uses height when direction is column', () => {
    mockedUseResizable.mockReturnValue({
      direction: 'column',
      resizePair,
      sizes: {
        top: 50,
        bottom: 50
      }
    })

    const { container } = render(
      <>
        <div data-resizable-id="top" />
        <ResizableHandle />
        <div data-resizable-id="bottom" />
      </>
    )

    const handle = container.querySelector('.nsui-resizable-handle') as HTMLElement

    handle.setPointerCapture = jest.fn()

    Object.defineProperty(handle.parentElement, 'getBoundingClientRect', {
      value: () => ({
        width: 500,
        height: 500
      })
    })

    fireEvent.pointerDown(handle, {
      pointerId: 1,
      clientY: 100
    })

    window.dispatchEvent(
      new PointerEvent('pointermove', {
        clientY: 200
      })
    )

    expect(resizePair).toHaveBeenCalledWith('top', 'bottom', 20)
  })

  it('does nothing when panels are missing', () => {
    const { container } = render(<ResizableHandle />)

    fireEvent.pointerDown(container.firstChild!, {
      pointerId: 1,
      clientX: 100
    })

    expect(resizePair).not.toHaveBeenCalled()
  })
})
