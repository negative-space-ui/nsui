export type ComponentItem = {
  name: string
}

export const ComponentsMap = {
  Action: {
    button: { name: 'Button' },
    iconButton: { name: 'Icon Button' },
    buttonGroup: { name: 'Button Group' }
  },
  DataDisplay: {
    list: { name: 'List' }
  },
  DataEntry: {
    Checkbox: { name: 'Checkbox' },
    Input: { name: 'Input' },
    Listbox: { name: 'Listbox' },
    Radio: { name: 'Radio' }
  },
  Feedback: {
    Checkmark: { name: 'Checkmark' },
    Spinner: { name: 'Spinner' }
  },
  Layout: {
    Divider: { name: 'Divider' },
    Field: { name: 'Field' },
    Flex: { name: 'Flex' },
    Grid: { name: 'Grid' }
  },
  Navigation: {
    Link: { name: 'Link' },
    Menu: { name: 'Menu' }
  },
  Primivite: {
    Collection: { name: 'Collection' }
  },
  Typography: {
    Text: { name: 'Text' },
    Heading: { name: 'Heading' }
  }
} as const satisfies Record<string, Record<string, ComponentItem>>
