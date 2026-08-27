import { useCallback } from 'react'

import { useSortable } from './useSortable'

export function useDragHandle(id: string, disabled?: boolean) {
  const { moveItem, setDraggingId } = useSortable()

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return

      e.currentTarget.setPointerCapture(e.pointerId)
      setDraggingId(id)

      const onMove = (ev: PointerEvent) => {
        const target = document.elementFromPoint(ev.clientX, ev.clientY)
        let node: Element | null = target
        while (node) {
          const targetId = (node as HTMLElement).dataset?.sortableId
          if (targetId) {
            if (targetId !== id) moveItem(id, targetId)
            break
          }
          node = node.parentElement
        }
      }

      const onUp = () => {
        setDraggingId(null)
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
      }

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
    },
    [id, disabled, moveItem, setDraggingId]
  )

  return { onPointerDown }
}
