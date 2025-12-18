# @negative-space/button

## 1.3.3

### Patch Changes

- @negative-space/provider@1.4.3
- @negative-space/spinner@1.0.4

## 1.3.2

### Patch Changes

- @negative-space/provider@1.4.2
- @negative-space/spinner@1.0.3

## 1.3.1

### Patch Changes

- a1028df: Updated Button to align with new ripple behavior and shared styles
- Updated dependencies [5f08e0c]
- Updated dependencies [a2ac6dd]
- Updated dependencies [fdf47f3]
  - @negative-space/provider@1.4.1
  - @negative-space/spinner@1.0.2
  - @negative-space/ripple@1.1.0

## 1.3.0

### Minor Changes

- Reform span rendering in component
- Move internal `classNames/styles` props from `root` to `btn`
- Add spinner with `isLoading`, `spinnerPosition`, `spinner`, `spinnerProps`

### Patch Changes

- Separate scale transition from other transitions, now managed by `colorTransitionDuration` and `scaleTransitionDuration` (previously `transitionDuration`)
- Updated dependencies
- Updated dependencies
  - @negative-space/provider@1.4.0
  - @negative-space/spinner@1.0.1

## 1.2.1

### Patch Changes

- Updated dependencies
  - @negative-space/provider@1.3.0

## 1.2.0

### Minor Changes

- Rename styling prop from children to content
- Improve accessibility
- Refine style usage

## 1.1.0

### Minor Changes

- Renamed Button props: `left` → `prefix`, `right` → `suffix`
- Ripple effect now disabled when Button is `disabled`
- Integration with provider: Button now supports `isRippleDisabled` and a `transitionDuration` prop specific to Button, overriding the global value
- Updated dependencies
  - @negative-space/provider@1.2.0

## 1.0.1

### Patch Changes

- Fixed a bug in the Button component
- Added the .stories file for the Button component

## 1.0.0

### Major Changes

- Created main component with `children`
- Added optional `left` and `right` props for icons or auxiliary elements
- Added `disableRipple` prop
- Applied essential styling
