#!/usr/bin/env node

import fs from 'node:fs'

const COMMIT_TYPES = 'build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test'

const typePattern = new RegExp(`^(${COMMIT_TYPES})`)

const fullPattern = new RegExp(`^(${COMMIT_TYPES})(\\([@a-z0-9._/-]+\\))?(!)?: [^\\s].+$`)

function main(): void {
  const file: string | undefined = process.argv[2]

  if (!file) {
    fail('commit message file not provided')
  }

  let content: string

  try {
    content = fs.readFileSync(file, 'utf8')
  } catch {
    fail('could not read commit message file')
  }

  const message = normalize(content)

  if (shouldSkip(message)) {
    process.exit(0)
  }

  validate(message)
}

function validate(message: string): void {
  if (fullPattern.test(message)) {
    process.exit(0)
  }

  if (!typePattern.test(message)) {
    fail('missing or invalid commit type')
  }

  validateScope(message)
  validateSeparator(message)

  fail('invalid commit message format')
}

function validateScope(message: string): void {
  const open = (message.match(/\(/g) || []).length
  const close = (message.match(/\)/g) || []).length

  if (open > 0 && close === 0) {
    fail('scope is malformed (missing closing parenthesis)')
  }

  if (close > 0 && open === 0) {
    fail('scope is malformed (missing opening parenthesis)')
  }

  if (open !== close) {
    fail('scope is malformed')
  }

  if (message.includes('()')) {
    fail('scope cannot be empty')
  }
}

function validateSeparator(message: string): void {
  const index = message.indexOf(':')

  if (index === -1) {
    fail("missing ':' after type or scope")
  }

  const after = message.slice(index + 1)

  if (after.trim() === '') {
    fail('commit description is required')
  }

  if (!after.startsWith(' ')) {
    fail("use ': ' (colon + space) before description")
  }
}

function normalize(value: string): string {
  const lines = value.replace(/\r\n/g, '\n').split('\n')

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed !== '') {
      return trimmed
    }
  }

  return ''
}

function shouldSkip(message: string): boolean {
  return message.startsWith('Merge ') || message.startsWith('Revert ')
}

function fail(message: string): never {
  console.error(`error: ${message}`)
  process.exit(1)
}

main()
