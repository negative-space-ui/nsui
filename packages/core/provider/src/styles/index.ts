import type { ComponentsConfigRequired, GlobalConfigRequired } from '../types'
import { baseAnimations, baseColors } from './base'
import { ripple } from './effects/ripple'
import { spin } from './effects/spin'

export const styles = (components: ComponentsConfigRequired, global: GlobalConfigRequired) => {
  baseColors(global)
  baseAnimations(global)

  spin(global, components.spinner)

  ripple(global)
}
