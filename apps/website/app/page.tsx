'use client'

import { NSUIProvider } from 'negative-space'
import { Button } from 'negative-space/action'
import { Flex } from 'negative-space/layout'
import { Heading, Text } from 'negative-space/typography'

export default function Home() {
  return (
    <>
      <NSUIProvider>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-135 flex flex-col items-center justify-center">
            <Heading as="h1" className="text-6xl">
              Negative Space UI
            </Heading>
            <Text className="text-2xl mb-4 secondary">
              A lightweight foundation for building fully custom,
              <br />
              flexible, and accessible UI components.
            </Text>
            <Flex justify="end" className="w-full !gap-4">
              <Button classNames={{ btn: 'w-20 h-12' }}>Docs</Button>
              <Button classNames={{ btn: 'w-45 h-12' }}>{'See components -->'}</Button>
            </Flex>
          </div>
        </div>
      </NSUIProvider>
    </>
  )
}
