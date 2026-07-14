import React from 'react'

export type GlobalSettings = {
  colors?: Colors
  motionDurations?: MotionDurations
  prefixCls?: string
  tooltip?: boolean
}

export type MotionDurations = {
  fade?: number
  pop?: number
  ripple?: number
  fadeScale?: number
}

export type Colors = {
  error: NonNullable<React.CSSProperties['color']>
}
