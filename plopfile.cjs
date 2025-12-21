module.exports = function (plop) {
  plop.setHelper('capitalize', (text) => text.charAt(0).toUpperCase() + text.slice(1))
  plop.setHelper('depth', (layer) => {
    const parts = layer.split('/').length + 2
    return '../'.repeat(parts)
  })

  plop.setGenerator('package', {
    description: 'Create a new package',
    prompts: [
      {
        type: 'list',
        name: 'layer',
        message: 'Which layer?',
        choices: ['core/hooks', 'core/utils', 'kits', 'ui']
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
        path: 'packages/{{layer}}/{{name}}/package.json',
        templateFile: 'plop-templates/package.json.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{layer}}/{{name}}/tsconfig.json',
        templateFile: 'plop-templates/tsconfig.json.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{layer}}/{{name}}/tsup.config.ts',
        templateFile: 'plop-templates/tsup.config.ts.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{layer}}/{{name}}/README.md',
        templateFile: 'plop-templates/README.md.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{layer}}/{{name}}/src/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
        skip: (answers) => (answers.layer === 'ui' ? 'Ui packages have no empty index' : false)
      },
      {
        type: 'add',
        path: 'packages/{{layer}}/{{name}}/src/index.ts',
        templateFile: 'plop-templates/ui-index.ts.hbs',
        skip: (answers) =>
          answers.layer !== 'ui' ? 'Default UI index is only available for UI packages' : false
      },
      {
        type: 'add',
        path: 'packages/{{layer}}/{{name}}/src/{{capitalize name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
        skip: (answers) =>
          answers.layer !== 'ui' ? 'Stories are only available for UI packages' : false
      },
      {
        type: 'add',
        path: 'packages/{{layer}}/{{name}}/__stories__/{{capitalize name}}.stories.tsx',
        templateFile: 'plop-templates/component.stories.tsx.hbs',
        skip: (answers) =>
          answers.layer !== 'ui' ? 'Stories are only available for UI packages' : false
      }
    ]
  })
}
