# Unreleased changes

### Breaking changes

### Enhancements

- Added `searchResultsOverlayVisible` prop to `TopBar` which adds a translucent background to the search dismissal overlay when results are displayed ([#2440](https://github.com/Shopify/polaris-react/pull/2440))

### Bug fixes

- Fixed `TextField` to no longer render `aria-invalid="false"` ([#2282](https://github.com/Shopify/polaris-react/pull/2282))
- Fixed `TextField` to only render `min` ,`max` and `step` attributes when explicitly passed ([#2282](https://github.com/Shopify/polaris-react/pull/2282))
- Search dismissal overlay now covers the entire screen ([#2440](https://github.com/Shopify/polaris-react/pull/2440))
- Search results component will no longer unmount when hidden ([#2440](https://github.com/Shopify/polaris-react/pull/2440))
- Search results will now match the width of the search field ([#2440](https://github.com/Shopify/polaris-react/pull/2440))

### Documentation

### Development workflow

- Refactored I18n class ([#2562](https://github.com/Shopify/polaris-react/pull/2562))

### Dependency upgrades

### Code quality

### Deprecations
