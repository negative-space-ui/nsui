import type { ComponentSettings } from '../types/components'
import type { GlobalSettings } from '../types/global'
import { baseAnimations, baseColors } from './base'
import { ripple } from './effects/ripple'
import { spin } from './effects/spin'

export const styles = (
  components: Required<ComponentSettings>,
  global: Required<GlobalSettings>
) => {
  baseColors(global)
  baseAnimations(global)

  spin(global, components.spinner)

  ripple(global)
}
