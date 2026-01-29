import { useContext } from 'react'
import { ButtonContext } from './ButtonContext'

export const useButtonContextConditional = (controlled: boolean) => {
  const ctx = useContext(ButtonContext)

  if (controlled && !ctx) {
    throw new Error('Button components must be used within ButtonGroup')
  }

  return ctx ?? { disabled: false }
}
