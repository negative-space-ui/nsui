import react from 'react'

export type MotionDurations = {
  fade?: number
  pop?: number
  ripple?: number
  fadeScale?: number
}

export type Colors = {
  error: NonNullable<react.CSSProperties['color']>
}

export type GlobalConfig = {
  colors?: Colors
  motionDurations?: MotionDurations
  prefixCls?: string
  tooltip?: boolean
}

export type GlobalConfigRequired = Required<GlobalConfig>
