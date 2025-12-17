import { getSheet, injected } from './styleSheet'
import { parseRules, type CSSRules } from './parseRules'

export function injectStyle(name: string, rules: CSSRules) {
  const sheet = getSheet()
  if (!sheet) return name

  const cssText = parseRules(rules)
  const rule = `.${name} { ${cssText} }`

  if (injected.has(name)) {
    const idx = injected.get(name)!
    sheet.deleteRule(idx)
    sheet.insertRule(rule, idx)
    return name
  }

  const index = sheet.cssRules.length
  sheet.insertRule(rule, index)
  injected.set(name, index)

  return name
}
