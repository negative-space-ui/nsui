import { type PopoverHandle, usePopover, type UsePopoverOptions } from '@negative-space/popover'

export type UseDropdownOptions = UsePopoverOptions

export type DropdownHandle = PopoverHandle

export function useDropdown(options: UseDropdownOptions = {}): DropdownHandle {
  return usePopover({
    trigger: 'click',
    ...options
  })
}
