import { Flex } from 'negative-space/layout'
import { Heading } from 'negative-space/typography'

export function Header() {
  return (
    <Flex className="absolute top-0 px-3 py-2">
      <Heading className="text-2xl font-bold">NSUI</Heading>
    </Flex>
  )
}
