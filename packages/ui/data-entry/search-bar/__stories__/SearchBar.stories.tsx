import React from 'react'

import { SearchBar, type SearchBarProps } from '..'

export default {
  title: 'Data Entry/Search bar',
  component: SearchBar,
  tags: ['autodocs'],
  args: {
    placeholder: 'Search...',
    classNames: {
      root: {
        root: 'border-neutral-300 w-60 bg-neutral-200 border-1 rounded-md [&:has([data-has-suggestions="true"])]:rounded-b-none',
        suffix: 'gap-1',
        content: 'px-2 py-1'
      },

      clearButton: {
        root: 'cursor-pointer opacity-100 transition-opacity duration-300 ease-in-out data-[has-value=false]:opacity-0 data-[has-value=false]:pointer-events-none',
        icon: 'w-4 h-4 text-neutral-500'
      },
      searchButton: { root: 'cursor-pointer', icon: 'w-4 h-4 text-neutral-500' },
      suggestion: {
        item: {
          root: 'gap-2 items-center cursor-pointer hover:bg-black/10 rounded-md px-2 py-1',
          icon: 'w-4 h-4 text-neutral-500'
        },
        popover: {
          root: 'bg-neutral-200 px-2 py-1 w-60 rounded-b-md border-1 border-neutral-300'
        }
      }
    },
    suggestions: [
      { id: '1', children: 'apple' },
      { id: '2', children: 'banana' },
      { id: '3', children: 'orange' },
      { id: '4', children: 'pineapple' },
      { id: '5', children: 'strawberry' },
      { id: '6', children: 'watermelon' },
      { id: '7', children: 'mango' },
      { id: '8', children: 'blueberry' },
      { id: '9', children: 'avocado' },
      { id: '10', children: 'passion fruit' },
      { id: '11', children: 'coconut' },
      { id: '12', children: 'blackberry' }
    ],
    showClearButton: true
  }
}

export const Default = (args: SearchBarProps) => <SearchBar {...args} />
