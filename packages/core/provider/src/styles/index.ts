import { baseStyle } from './base'
import { spinKeyframes } from './effects/spin'
import { rippleKeyframe, rippleStyle } from './effects/ripple'
import type { ComponentsConfigRequired, GlobalConfigRequired } from '../types'

export const styles = (components: ComponentsConfigRequired, global: GlobalConfigRequired) => {
  baseStyle(global)
  spinKeyframes(global, components.spinner)
  rippleKeyframe(global)
  rippleStyle(global)
}
