import { spinKeyframes } from './effects/spin'
import { rippleKeyframe, rippleStyle } from './effects/ripple'

import { buttonStyles } from './ui/action/button'

import { listStyles } from './ui/data-display/list'

import { spinnerStyles } from './ui/feedback/spinner'

import { flexStyles } from './ui/layout/flex'

import { headingStyles } from './ui/typography/heading'
import { textStyles } from './ui/typography/text'

import { GlobalConfig, ComponentsConfigRequired } from '@negative-space/types'

export const styles = (global: GlobalConfig, components: ComponentsConfigRequired) => {
  spinKeyframes(global)
  rippleKeyframe(global)

  rippleStyle(global)

  buttonStyles(global)

  listStyles(global)

  spinnerStyles(global, components.spinner)

  flexStyles(global)

  headingStyles(global)
  textStyles(global)
}
