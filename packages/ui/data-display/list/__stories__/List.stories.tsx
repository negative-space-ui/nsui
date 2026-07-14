import { List, ListProps } from '..'

export default {
  title: 'Data display/List',
  component: List,
  tags: ['autodocs'],
  args: {
    items: [{ content: 'Item 1' }, { content: 'Item 2' }, { content: 'Item 3' }]
  }
}

export const Ordered = (args: ListProps<'ol'>) => <List as="ol" marker="decimal" {...args} />

export const Unordered = (args: ListProps<'ul'>) => <List as="ul" marker="disc" {...args} />

export const Horizontal = (args: ListProps<'ul'>) => (
  <List direction="row" gap={'0.5rem'} {...args} />
)
