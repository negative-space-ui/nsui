import { ListboxRoot, type ListboxRootProps } from './ListboxRoot'
import { ListboxGroup, type ListboxGroupProps } from './ListboxGroup'
import { ListboxOption, type ListboxOptionProps } from './ListboxOption'
import { ListboxSeparator, type ListboxSeparatorProps } from './ListboxSeparator'

export const Listbox = Object.assign(ListboxRoot, {
  Group: ListboxGroup,
  Option: ListboxOption,
  Separator: ListboxSeparator
})

export type {
  ListboxRootProps as ListboxProps,
  ListboxGroupProps,
  ListboxOptionProps,
  ListboxSeparatorProps
}
