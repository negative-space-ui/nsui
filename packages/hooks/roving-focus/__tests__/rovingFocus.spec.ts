import { act, renderHook } from '@testing-library/react'

import { useRovingFocus } from '..'

const createItem = (
  id: string,
  disabled = false
): {
  id: string
  ref: React.RefObject<HTMLElement>
  disabled?: boolean
} => ({
  id,
  ref: {
    current: document.createElement('button')
  },
  disabled
})

const createKeyboardEvent = (key: string, target: HTMLElement): React.KeyboardEvent =>
  ({
    key,
    target,
    currentTarget: target,
    preventDefault: jest.fn(),
    shiftKey: false
  }) as unknown as React.KeyboardEvent

describe('useRovingFocus', () => {
  it('should set first enabled item as active when registering', () => {
    const { result } = renderHook(() => useRovingFocus())

    act(() => {
      result.current.registerItem(createItem('one'))
    })

    expect(result.current.activeId).toBe('one')
  })

  it('should ignore disabled items when registering', () => {
    const { result } = renderHook(() => useRovingFocus())

    act(() => {
      result.current.registerItem(createItem('disabled', true))
      result.current.registerItem(createItem('enabled'))
    })

    expect(result.current.activeId).toBe('enabled')
  })

  it('should move focus forward with wrap enabled', () => {
    const first = createItem('one')
    const second = createItem('two')

    const focusSpy = jest.spyOn(second.ref.current as HTMLElement, 'focus')

    const { result } = renderHook(() => useRovingFocus())

    act(() => {
      result.current.registerItem(first)
      result.current.registerItem(second)

      result.current.handleItemKeyDown(
        createKeyboardEvent('ArrowDown', first.ref.current as HTMLElement),
        'one'
      )
    })

    expect(result.current.activeId).toBe('two')
    expect(focusSpy).toHaveBeenCalled()
  })

  it('should wrap focus when moving past last item', () => {
    const first = createItem('one')
    const second = createItem('two')

    const { result } = renderHook(() =>
      useRovingFocus({
        wrap: true
      })
    )

    act(() => {
      result.current.registerItem(first)
      result.current.registerItem(second)
      result.current.focusItem('two')

      result.current.handleItemKeyDown(
        createKeyboardEvent('ArrowDown', second.ref.current as HTMLElement),
        'two'
      )
    })

    expect(result.current.activeId).toBe('one')
  })

  it('should not wrap when wrap is disabled', () => {
    const first = createItem('one')
    const second = createItem('two')

    const { result } = renderHook(() =>
      useRovingFocus({
        wrap: false
      })
    )

    act(() => {
      result.current.registerItem(first)
      result.current.registerItem(second)
      result.current.focusItem('two')

      result.current.handleItemKeyDown(
        createKeyboardEvent('ArrowDown', second.ref.current as HTMLElement),
        'two'
      )
    })

    expect(result.current.activeId).toBe('two')
  })

  it('should focus first item with Home key', () => {
    const first = createItem('one')
    const second = createItem('two')

    const { result } = renderHook(() => useRovingFocus())

    act(() => {
      result.current.registerItem(first)
      result.current.registerItem(second)
      result.current.focusItem('two')

      result.current.handleItemKeyDown(
        createKeyboardEvent('Home', second.ref.current as HTMLElement),
        'two'
      )
    })

    expect(result.current.activeId).toBe('one')
  })

  it('should focus last item with End key', () => {
    const first = createItem('one')
    const second = createItem('two')

    const { result } = renderHook(() => useRovingFocus())

    act(() => {
      result.current.registerItem(first)
      result.current.registerItem(second)

      result.current.handleItemKeyDown(
        createKeyboardEvent('End', first.ref.current as HTMLElement),
        'one'
      )
    })

    expect(result.current.activeId).toBe('two')
  })

  it('should call onSelect when pressing Enter', () => {
    const onSelect = jest.fn()

    const { result } = renderHook(() => useRovingFocus())

    const element = document.createElement('button')

    act(() => {
      result.current.handleItemKeyDown(createKeyboardEvent('Enter', element), 'item', onSelect)
    })

    expect(onSelect).toHaveBeenCalledWith('item')
  })

  it('should reset interaction state', () => {
    const { result } = renderHook(() => useRovingFocus())

    act(() => {
      result.current.focusItem('item')
    })

    expect(result.current.hasInteracted).toBe(true)

    act(() => {
      result.current.reset()
    })

    expect(result.current.hasInteracted).toBe(false)
  })

  it('should unregister active item and select next enabled item', () => {
    const first = createItem('one')
    const second = createItem('two')

    const { result } = renderHook(() => useRovingFocus())

    act(() => {
      result.current.registerItem(first)
      result.current.registerItem(second)
      result.current.unregisterItem('one')
    })

    expect(result.current.activeId).toBe('two')
  })

  it('should return first enabled id', () => {
    const { result } = renderHook(() => useRovingFocus())

    act(() => {
      result.current.registerItem(createItem('disabled', true))
      result.current.registerItem(createItem('enabled'))
    })

    expect(result.current.getFirstEnabledId()).toBe('enabled')
  })
})
