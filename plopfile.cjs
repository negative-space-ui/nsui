const fs = require('fs')
const path = require('path')

module.exports = function (plop) {
  plop.setHelper('capitalize', (text) => text.charAt(0).toUpperCase() + text.slice(1))

  plop.setHelper('depth', function (_, options) {
    const answers = options.data.root
    const fullPath = [answers.layer, answers.subLayer, answers.uiSubLayer].filter(Boolean).join('/')
    const parts = fullPath.split('/').length + 2
    return '../'.repeat(parts)
  })

  plop.setGenerator('package', {
    description: 'Create a new package',
    prompts: [
      {
        type: 'list',
        name: 'layer',
        message: 'Which layer?',
        choices: ['core', 'kits', 'ui']
      },
      {
        type: 'list',
        name: 'subLayer',
        message: 'Choose sublayer (only for core)',
        when: (answers) => answers.layer === 'core',
        choices: ['hooks', 'utils']
      },
      {
        type: 'list',
        name: 'uiSubLayer',
        message: 'Choose subfolder (only for UI packages)',
        when: (answers) => answers.layer === 'ui',
        choices: () => {
          const uiPath = path.join(__dirname, 'packages/ui')
          if (!fs.existsSync(uiPath)) return []
          return fs
            .readdirSync(uiPath)
            .filter((f) => fs.statSync(path.join(uiPath, f)).isDirectory())
        }
      },
      {
        type: 'input',
        name: 'name',
        message: 'Package name (kebab-case)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/package.json',
        templateFile: 'plop-templates/package.json.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/tsconfig.json',
        templateFile: 'plop-templates/tsconfig.json.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/tsup.config.ts',
        templateFile: 'plop-templates/tsup.config.ts.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/README.md',
        templateFile: 'plop-templates/README.md.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/src/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
        skip: (answers) => (answers.layer === 'ui' ? 'Ui packages have no empty index' : false)
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/src/index.ts',
        templateFile: 'plop-templates/ui-index.ts.hbs',
        skip: (answers) =>
          answers.layer !== 'ui' ? 'Default UI index is only available for UI packages' : false
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/src/{{capitalize name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
        skip: (answers) =>
          answers.layer !== 'ui' ? 'Components are only available for UI packages' : false
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/__stories__/{{capitalize name}}.stories.tsx',
        templateFile: 'plop-templates/component.stories.tsx.hbs',
        skip: (answers) =>
          answers.layer !== 'ui' ? 'Stories are only available for UI packages' : false
      }
    ]
  })
}
