# NSUI - Negative Space UI

NSUI is a monorepo for building flexible, accessible React UI components in TypeScript. It brings together composable primitives, themed building blocks, and package-level APIs that are easy to adapt for custom design systems.

## What’s in this project

- Modular packages for actions, app composition, data display, data entry, feedback, layout, navigation, and typography
- A foundation for building custom interfaces without being tied to a single visual style.
- Documentation and Storybook examples to explore components locally.

## Installation

```bash
pnpm add negative-space
# or
npm install negative-space
```

## Development

```bash
pnpm install
pnpm build
pnpm lint
pnpm typecheck
```

## Repository structure

- apps/docs — documentation site
- apps/storybook — component playground
- packages/react — main entry point for the published package
- packages/kits/\* — category-based packages
- packages/core — shared foundation and hooks

## Contributing

Contributions are welcome. If you want to add or improve a component, start with the most relevant package and keep the changes focused.
