import { Text, type TextElement, type TextProps } from '..'

export default {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    as: 'span',
    children: 'Hello World'
  },
  children: {
    control: 'text'
  }
}

export const Default = (args: TextProps<TextElement>) => <Text {...args} />
