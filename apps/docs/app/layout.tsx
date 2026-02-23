import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import RootCRS from '@/components/layouts/RootCRS'
import './globals.css'

const inter = Inter({
  variable: '--inter'
})

export const metadata: Metadata = {
  title: 'Negative Space UI',
  description: 'A collection of headless UI components by Negative Space'
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <RootCRS>
        <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
      </RootCRS>
    </html>
  )
}
