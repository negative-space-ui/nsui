import { injectKeyframes } from '..'
import * as styleSheet from '../src/styleSheet'

jest.mock('../src/styleSheet', () => {
  const injected = new Map<string, number>()

  return {
    injected,
    getSheet: jest.fn()
  }
})

function createSheet() {
  const cssRules: unknown[] = []

  return {
    cssRules: cssRules as unknown as CSSRuleList,
    insertRule: jest.fn(() => {
      cssRules.push({})
      return cssRules.length - 1
    }),
    deleteRule: jest.fn((index: number) => {
      cssRules.splice(index, 1)
    })
  } as unknown as CSSStyleSheet
}

describe('injectKeyframes', () => {
  const getSheet = jest.mocked(styleSheet.getSheet)

  beforeEach(() => {
    styleSheet.injected.clear()
    getSheet.mockReset()
  })

  it('returns the name when no stylesheet exists', () => {
    getSheet.mockReturnValue(null)

    expect(
      injectKeyframes('fade', {
        from: { opacity: 0 },
        to: { opacity: 1 }
      })
    ).toBe('fade')
  })

  it('inserts a keyframes rule', () => {
    const sheet = createSheet()

    getSheet.mockReturnValue(sheet)

    injectKeyframes('fade', {
      from: { opacity: 0 },
      to: { opacity: 1 }
    })

    expect(sheet.insertRule).toHaveBeenCalledWith(
      '@keyframes fade { from { opacity: 0; } to { opacity: 1; } }',
      0
    )

    expect(styleSheet.injected.get('@keyframes fade')).toBe(0)
  })

  it('does not insert duplicated keyframes', () => {
    const sheet = createSheet()

    getSheet.mockReturnValue(sheet)
    styleSheet.injected.set('@keyframes fade', 0)

    injectKeyframes('fade', {
      from: { opacity: 0 },
      to: { opacity: 1 }
    })

    expect(sheet.insertRule).not.toHaveBeenCalled()
  })
})
