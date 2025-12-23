import { useCallback } from 'react'

export function useRipple(className?: string) {
  const createRipple = useCallback(
    (event: React.MouseEvent<HTMLElement>, options?: { centered?: boolean }) => {
      const target = event.currentTarget as HTMLElement

      const computed = window.getComputedStyle(target)
      if (computed.position === 'static') {
        target.style.position = 'relative'
        target.style.overflow = 'hidden'
      }

      const rect = target.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)

      const x = options?.centered ? rect.width / 2 - size / 2 : event.clientX - rect.left - size / 2
      const y = options?.centered ? rect.height / 2 - size / 2 : event.clientY - rect.top - size / 2

      const ripple = document.createElement('span')
      ripple.className = className ?? 'ripple'
      ripple.style.width = ripple.style.height = `${size}px`
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      target.appendChild(ripple)

      const remove = () => {
        ripple.remove()
        ripple.removeEventListener('animationend', remove)
      }

      ripple.addEventListener('animationend', remove)
    },
    []
  )

  return { createRipple }
}
