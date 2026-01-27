import { baseStyle } from './base'
import { spinKeyframes } from './effects/spin'
import { popKeyframe, popStyle } from './effects/pop'
import { rippleKeyframe, rippleStyle } from './effects/ripple'
import type { ComponentsConfigRequired, GlobalConfigRequired } from '../types'

export const styles = (components: ComponentsConfigRequired, global: GlobalConfigRequired) => {
  baseStyle(global)
  spinKeyframes(global, components.spinner)
  popKeyframe(global)
  popStyle(global)
  rippleKeyframe(global)
  rippleStyle(global)
}
