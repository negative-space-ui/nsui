import React, { useEffect, useState } from 'react'

import { ProgressBar, type ProgressBarProps } from '..'

export default {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: {
    className: 'h-5 bg-blue-500 transition-transform duration-300 ease-in-out'
  }
}

export const Default = (args: ProgressBarProps) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v + 1) % 101)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return <ProgressBar value={value} {...args} />
}
