'use client'

import { NSUIProvider } from 'negative-space'

export default function RootCRS({ children }: Readonly<{ children: React.ReactNode }>) {
  return <NSUIProvider>{children}</NSUIProvider>
}
