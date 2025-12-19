import { getSheet, injected } from './styleSheet'
import { parseRules, type CSSRules } from './parseRules'

export function injectStyle(raw: string, rules: CSSRules) {
  const sheet = getSheet()
  if (!sheet) return raw.split(/\s+/)[0]

  const tokens = raw.trim().split(/\s+/)
  const name = tokens[0]
  const selector = tokens.slice(1).join(' ')

  const cssText = parseRules(rules)

  const finalSelector = selector
    ? selector.replace(/(^|,)\s*([^\s,]+)(?=\s*|,|$)/g, `$1$2.${name}`)
    : `.${name}`

  const rule = `${finalSelector} { ${cssText} }`

  const key = selector ? `${name}__${selector}` : name

  if (injected.has(key)) {
    const idx = injected.get(key)!
    sheet.deleteRule(idx)
    sheet.insertRule(rule, idx)
    return name
  }

  const index = sheet.cssRules.length
  sheet.insertRule(rule, index)
  injected.set(key, index)

  return name
}
