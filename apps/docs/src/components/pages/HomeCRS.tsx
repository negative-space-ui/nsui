'use client'

import { Flex } from 'negative-space/layout'
import { Menu } from 'negative-space/nav'
import { Heading, Text } from 'negative-space/typography'

export default function HomeCRS() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Flex as="section" direction="column" gap="1rem" className="w-[34rem]">
        <Flex direction="column" gap="0">
          <Heading as="h1" className="text-6xl">
            Negative Space UI
          </Heading>
          <Text as="p" className="secondary text-justify text-2xl">
            A lightweight foundation for building fully custom, flexible, and accessible UI
            components.
          </Text>
        </Flex>
        <Menu
          columns={2}
          gap="0.6rem"
          classNames={{ root: 'self-end', item: { root: 'nsui-btn' } }}
          items={[
            { item: { prefix: '🚀', content: 'Docs', href: '/docs' } },
            {
              item: {
                prefix: '👨‍💻',
                content: 'GitHub',
                href: 'https://github.com/negative-space-ui/nsui',
                target: '_blank'
              }
            }
          ]}
        />
      </Flex>
    </main>
  )
}
