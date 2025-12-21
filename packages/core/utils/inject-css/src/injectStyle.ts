import { getSheet, injected } from './styleSheet'
import { parseRules, type CSSRules } from './parseRules'

export function injectStyle(selector: string, rules: CSSRules) {
  const sheet = getSheet()
  if (!sheet) return selector

  const finalSelector = selector.trim()
  const cssText = parseRules(rules)
  const rule = `${finalSelector} { ${cssText} }`

  if (injected.has(finalSelector)) {
    const idx = injected.get(finalSelector)!
    sheet.deleteRule(idx)
    sheet.insertRule(rule, idx)
    return selector
  }

  const index = sheet.cssRules.length
  sheet.insertRule(rule, index)
  injected.set(finalSelector, index)

  return selector
}
