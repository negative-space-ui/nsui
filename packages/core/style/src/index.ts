import { spinKeyframes } from './effects/spin'
import { rippleKeyframe, rippleStyle } from './effects/ripple'

import { buttonStyles } from './components/button'
import { spinnerStyles } from './components/spinner'
import { typographyStyles } from './components/typography'

import { GlobalConfig, ComponentsConfigRequired } from '@negative-space/types'

export const styles = (global: GlobalConfig, components: ComponentsConfigRequired) => {
  spinKeyframes(global)
  rippleKeyframe(global)

  return {
    ...rippleStyle(global),
    ...buttonStyles(global),
    ...spinnerStyles(global, components.spinner),
    ...typographyStyles(global)
  }
}
