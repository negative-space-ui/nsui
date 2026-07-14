import fs from 'node:fs'
import path from 'node:path'

import type { NodePlopAPI } from 'plop'

type Answers = {
  layer: 'core' | 'kits' | 'ui'
  subLayer?: 'hooks' | 'utils'
  uiSubLayer?: string
  name: string
}

export default function (plop: NodePlopAPI) {
  plop.setHelper('capitalize', (text: string) => text.charAt(0).toUpperCase() + text.slice(1))

  plop.setHelper('snakeCase', (text: string) =>
    text
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[-\s]+/g, '_')
      .toLowerCase()
  )

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
          const uiPath = path.join(import.meta.dirname, 'packages/ui')

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
        skip: (answers: Answers) =>
          answers.layer === 'ui' ? 'UI packages have no empty index' : false
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/src/index.ts',
        templateFile: 'plop-templates/ui-index.ts.hbs',
        skip: (answers: Answers) =>
          answers.layer !== 'ui' ? 'Default UI index is only available for UI packages' : false
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/src/{{capitalize name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
        skip: (answers: Answers) =>
          answers.layer !== 'ui' ? 'Components are only available for UI packages' : false
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/__stories__/{{capitalize name}}.stories.tsx',
        templateFile: 'plop-templates/component.stories.tsx.hbs',
        skip: (answers: Answers) =>
          answers.layer !== 'ui' ? 'Stories are only available for UI packages' : false
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/__tests__/{{capitalize name}}.spec.tsx',
        templateFile: 'plop-templates/component.spec.tsx.hbs',
        skip: (answers: Answers) =>
          answers.layer !== 'ui' ? 'Use ts spec for non-ui packages' : false
      },
      {
        type: 'add',
        path: 'packages/{{layer}}{{#if subLayer}}/{{subLayer}}{{/if}}{{#if uiSubLayer}}/{{uiSubLayer}}{{/if}}/{{name}}/__tests__/{{snakeCase name}}.spec.ts',
        templateFile: 'plop-templates/component.spec.ts.hbs',
        skip: (answers: Answers) =>
          answers.layer === 'ui' ? 'Use tsx spec for UI packages' : false
      }
    ]
  })
}
