import { Flex, type FlexProps } from '@negative-space/flex'
import { cn, useNSUI } from '@negative-space/system'
import React, { forwardRef } from 'react'

import { ResizableProvider } from './ResizableProvider'

export type ResizableProps = FlexProps

export const Resizable = forwardRef<HTMLDivElement, ResizableProps>(
  ({ direction = 'row', className, children, ...props }, ref) => {
    const { global } = useNSUI()

    return (
      <ResizableProvider direction={direction}>
        <Flex
          gap="0"
          {...props}
          direction={direction}
          ref={ref}
          className={cn(`${global.prefixCls}-resizable`, className)}
        >
          {children}
        </Flex>
      </ResizableProvider>
    )
  }
)

Resizable.displayName = 'Resizable'
