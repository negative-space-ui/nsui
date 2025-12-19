module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'chore', // changes to the build process or auxiliary tools
        'docs', // changes to documentation
        'style', // changes that do not affect the meaning of the code
        'refactor', // a code change that neither fixes a bug nor adds a feature
        'perf', // a code change that improves performance
        'test', // adding missing tests
        'ci' // changes to our CI configuration files and scripts
      ]
    ],

    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case']],
    'subject-full-stop': [2, 'never', '.'],
    'subject-min-length': [2, 'always', 10]
  },

  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)\(([@\w\-/]+)\):\s(.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  }
}
