# @negative-space/provider

## 1.4.3

### Patch Changes

- @negative-space/style@1.0.2

## 1.4.2

### Patch Changes

- Updated dependencies [212c20a]
  - @negative-space/style@1.0.1

## 1.4.1

### Patch Changes

- 5f08e0c: Updated Provider to consume shared types and styles
- Updated dependencies [809e3d7]
- Updated dependencies [5c71397]
  - @negative-space/style@1.0.0
  - @negative-space/types@1.0.0

## 1.4.0

### Minor Changes

- Remove internal `transitionDuration` from each components object
- Rename global `transitionDuration` prop to `colorTransitionDuration`
- Add `scaleTransitionDuration` prop

## 1.3.0

### Minor Changes

- Add Spinner configuration support
- Add Spinner animationDuration option

## 1.2.0

### Minor Changes

- Moved existing props into new global props structure
- Added `components` object with `button` config containing `isRippleDisabled` and `transitionDuration`

## 1.1.0

### Minor Changes

- Added `prefixCls` prop to NSUIProvider for custom class name prefixes
- Default value remains 'nsui' for backward compatibility

## 1.0.0

### Major Changes

- Add new `Provider` component
- Set up React context for the Provider
- Include `transition` duration prop for global transitions
