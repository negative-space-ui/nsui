import { useContext } from 'react'
import { RadioContext } from './RadioContext'

export const useRadioContext = () => {
  const ctx = useContext(RadioContext)

  if (!ctx) {
    throw new Error('Radio must be used within RadioGroup')
  }

  return ctx
}
