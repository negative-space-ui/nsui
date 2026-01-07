import { spinKeyframes } from './effects/spin'
import { popKeyframe, popStyle } from './effects/pop'
import { rippleKeyframe, rippleStyle } from './effects/ripple'

import { buttonStyles } from './ui/action/button'

import { listStyles } from './ui/data-display/list'

import { checkboxStyle } from './ui/data-entry/checkbox'
import { radioStyle } from './ui/data-entry/radio'

import { spinnerStyles } from './ui/feedback/spinner'

import { flexStyles } from './ui/layout/flex'
import { gridStyles } from './ui/layout/grid'

import { linkStyle } from './ui/nav/link'

import { headingStyles } from './ui/typography/heading'
import { textStyles } from './ui/typography/text'

import type {
  AnimationsConfigRequired,
  ComponentsConfigRequired,
  GlobalConfigRequired
} from '@negative-space/types'

export const styles = (
  animation: AnimationsConfigRequired,
  components: ComponentsConfigRequired,
  global: GlobalConfigRequired
) => {
  spinKeyframes(global)
  popKeyframe(global)
  popStyle(global, animation.popDuration)
  rippleKeyframe(global)
  rippleStyle(global, animation.rippleDuration)

  buttonStyles(global)

  listStyles(global)

  checkboxStyle(global)
  radioStyle(global)

  spinnerStyles(global, components.spinner)

  flexStyles(global)
  gridStyles(global)

  linkStyle(global)

  headingStyles(global)
  textStyles(global)
}
