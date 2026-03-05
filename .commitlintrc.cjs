module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'perf', 'test']
    ],
    'scope-empty': [2, 'never'],
    'scope-case': [
      2,
      'always',
      ['lower-case', 'kebab-case', 'pascal-case', 'camel-case', 'sentence-case']
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case']],
    'subject-full-stop': [2, 'never', '.'],
    'subject-min-length': [2, 'always', 10]
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)\(([@\w\-/\.]+)\):\s(.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  }
}
