import type { ComponentsConfigRequired, GlobalConfigRequired } from '../types'
import { baseStyle } from './base'
import { rippleKeyframe, rippleStyle } from './effects/ripple'
import { spinKeyframes } from './effects/spin'

export const styles = (components: ComponentsConfigRequired, global: GlobalConfigRequired) => {
  baseStyle(global)
  spinKeyframes(global, components.spinner)
  rippleKeyframe(global)
  rippleStyle(global)
}
