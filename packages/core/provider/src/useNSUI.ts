import { useContext } from 'react'

import { NSUIContext } from './ProviderContext'

export const useNSUI = () => {
  const context = useContext(NSUIContext)
  if (!context) {
    throw new Error(
      'useNSUI must be used within an NSUIProvider. Wrap your app with <NSUIProvider />'
    )
  }
  return context
}
