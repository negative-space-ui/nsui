import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../src'

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: [
        'div',
        'aside',
        'header',
        'footer',
        'main',
        'section',
        'nav',
        'article',
        'label',
        'fieldset',
        'ol',
        'ul',
        'li',
        'dl',
        'dt',
        'dd',
        'form'
      ]
    },
    columns: {
      control: 'text'
    },
    rows: {
      control: 'text'
    },
    alignItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch']
    },
    justifyItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch']
    },
    alignContent: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'between', 'around', 'evenly']
    },
    justifyContent: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'between', 'around', 'evenly']
    }
  }
}

export default meta

export const Default: StoryObj<typeof Grid> = {
  args: {
    className: 'w-md',
    children: (
      <>
        <span>Grid Item 1</span>
        <span>Grid Item 2</span>
        <span>Grid Item 3</span>
        <span>Grid Item 4</span>
      </>
    )
  }
}
