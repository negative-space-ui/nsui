import { useContext } from 'react'
import { RadioContext, type RadioContextValue } from './RadioContext'

export const useRadioContext = (): RadioContextValue => {
  const ctx = useContext(RadioContext)

  if (!ctx) {
    throw new Error('Radio must be used within RadioGroup')
  }

  return ctx
}
