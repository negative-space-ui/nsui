import type { ComponentsConfigRequired } from '../types/components'
import type { GlobalConfigRequired } from '../types/global'
import { baseAnimations, baseColors } from './base'
import { ripple } from './effects/ripple'
import { spin } from './effects/spin'

export const styles = (components: ComponentsConfigRequired, global: GlobalConfigRequired) => {
  baseColors(global)
  baseAnimations(global)

  spin(global, components.spinner)

  ripple(global)
}
