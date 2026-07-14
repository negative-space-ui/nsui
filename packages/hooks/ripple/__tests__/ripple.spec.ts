import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react'

import { useRipple } from '../src'

const createMouseEvent = (
  element: HTMLElement,
  clientX = 0,
  clientY = 0
): React.MouseEvent<HTMLElement> =>
  ({
    currentTarget: element,
    clientX,
    clientY
  }) as unknown as React.MouseEvent<HTMLElement>

describe('useRipple', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create ripple element with default class', () => {
    const element = document.createElement('button')

    Object.defineProperty(element, 'getBoundingClientRect', {
      value: () => ({
        width: 100,
        height: 50,
        left: 10,
        top: 20
      })
    })

    document.body.appendChild(element)

    const { result } = renderHook(() => useRipple())

    act(() => {
      result.current.createRipple(createMouseEvent(element, 60, 45))
    })

    const ripple = element.querySelector('.ripple')

    expect(ripple).toBeInTheDocument()
    expect(ripple).toHaveStyle({
      width: '100px',
      height: '100px',
      left: '0px',
      top: '-25px'
    })
  })

  it('should use custom className', () => {
    const element = document.createElement('button')

    Object.defineProperty(element, 'getBoundingClientRect', {
      value: () => ({
        width: 50,
        height: 50,
        left: 0,
        top: 0
      })
    })

    document.body.appendChild(element)

    const { result } = renderHook(() => useRipple('custom-ripple'))

    act(() => {
      result.current.createRipple(createMouseEvent(element, 25, 25))
    })

    expect(element.querySelector('.custom-ripple')).toBeInTheDocument()
  })

  it('should center ripple when centered option is true', () => {
    const element = document.createElement('button')

    Object.defineProperty(element, 'getBoundingClientRect', {
      value: () => ({
        width: 100,
        height: 50,
        left: 10,
        top: 20
      })
    })

    document.body.appendChild(element)

    const { result } = renderHook(() => useRipple())

    act(() => {
      result.current.createRipple(createMouseEvent(element), {
        centered: true
      })
    })

    const ripple = element.querySelector('.ripple')

    expect(ripple).toHaveStyle({
      left: '0px',
      top: '-25px'
    })
  })

  it('should set position and overflow when element position is static', () => {
    const element = document.createElement('button')

    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        position: 'static'
      })
    })

    Object.defineProperty(element, 'getBoundingClientRect', {
      value: () => ({
        width: 20,
        height: 20,
        left: 0,
        top: 0
      })
    })

    document.body.appendChild(element)

    const { result } = renderHook(() => useRipple())

    act(() => {
      result.current.createRipple(createMouseEvent(element, 10, 10))
    })

    expect(element.style.position).toBe('relative')
    expect(element.style.overflow).toBe('hidden')
  })

  it('should remove ripple after animation ends', () => {
    const element = document.createElement('button')

    Object.defineProperty(element, 'getBoundingClientRect', {
      value: () => ({
        width: 20,
        height: 20,
        left: 0,
        top: 0
      })
    })

    document.body.appendChild(element)

    const { result } = renderHook(() => useRipple())

    act(() => {
      result.current.createRipple(createMouseEvent(element, 10, 10))
    })

    const ripple = element.querySelector('.ripple')

    expect(ripple).toBeInTheDocument()

    act(() => {
      ripple?.dispatchEvent(new Event('animationend'))
    })

    expect(element.querySelector('.ripple')).not.toBeInTheDocument()
  })
})
