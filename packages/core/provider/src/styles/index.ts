import type { ComponentsConfigRequired, GlobalConfigRequired } from '../types'

import { spinKeyframes } from './effects/spin'
import { popKeyframe, popStyle } from './effects/pop'
import { rippleKeyframe, rippleStyle } from './effects/ripple'

import { buttonStyles } from './ui/action/button'

import { listStyles } from './ui/data-display/list'

import { checkboxStyle } from './ui/data-entry/checkbox'
import { listboxStyle } from './ui/data-entry/listbox'
import { radioStyle } from './ui/data-entry/radio'

import { spinnerStyles } from './ui/feedback/spinner'

import { dividerStyles } from './ui/layout/divider'
import { flexStyles } from './ui/layout/flex'
import { gridStyles } from './ui/layout/grid'

import { linkStyle } from './ui/nav/link'

import { headingStyles } from './ui/typography/heading'
import { textStyles } from './ui/typography/text'

export const styles = (components: ComponentsConfigRequired, global: GlobalConfigRequired) => {
  spinKeyframes(global)
  popKeyframe(global)
  popStyle(global)
  rippleKeyframe(global)
  rippleStyle(global)

  buttonStyles(global)

  listStyles(global)

  checkboxStyle(global)
  listboxStyle(global)
  radioStyle(global)

  spinnerStyles(global, components.spinner)

  dividerStyles(global)
  flexStyles(global)
  gridStyles(global)

  linkStyle(global)

  headingStyles(global)
  textStyles(global)
}
