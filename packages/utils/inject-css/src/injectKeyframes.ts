import { getSheet, injected } from './styleSheet'
import { parseRules, type CSSRules } from './parseRules'

export function injectKeyframes(name: string, frames: CSSRules) {
  const sheet = getSheet()
  if (!sheet) return name

  const body = Object.entries(frames)
    .map(([step, rules]) => `${step} { ${parseRules(rules as CSSRules)} }`)
    .join(' ')

  const rule = `@keyframes ${name} { ${body} }`

  if (injected.has(`@keyframes ${name}`)) return name

  sheet.insertRule(rule, sheet.cssRules.length)
  injected.set(`@keyframes ${name}`, sheet.cssRules.length - 1)

  return name
}
