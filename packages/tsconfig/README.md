# tsconfig

This package provides `tsconfig.json` files for sharing.

## `default.tsconfig.json`

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@tsconfig/strictest/tsconfig.json",
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowJs": true,
    "verbatimModuleSyntax": true,
    "noEmit": true
  }
}
```

## License

The code in this package under the [MIT License](./LICENSE).
