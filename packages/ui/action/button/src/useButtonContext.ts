import { useContext } from 'react'
import { ButtonContext, type ButtonContextValue } from './ButtonContext'

export const useButtonContextConditional = (
  controlled: boolean
): ButtonContextValue | { disabled: false } => {
  const ctx = useContext(ButtonContext)

  if (controlled && !ctx) {
    throw new Error('Button components must be used within ButtonGroup')
  }

  return ctx ?? { disabled: false }
}
