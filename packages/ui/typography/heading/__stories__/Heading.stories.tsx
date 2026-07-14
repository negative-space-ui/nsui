import { Heading, type HeadingElement, type HeadingProps } from '..'

export default {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  args: {
    as: 'h1',
    children: 'Hello World'
  }
}

export const Default = (args: HeadingProps<HeadingElement>) => <Heading {...args} />
