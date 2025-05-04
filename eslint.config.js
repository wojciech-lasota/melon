// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const reactPlugin = require("eslint-plugin-react");
const securityPlugin = require("eslint-plugin-security");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const unusedImports = require("eslint-plugin-unused-imports");
const boundaries = require("eslint-plugin-boundaries");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  securityPlugin.configs.recommended,

  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      security: securityPlugin,
      "unused-imports": unusedImports,
      boundaries: boundaries,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {}, // eslint-import-resolver-typescript
      },
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
          pattern: [
            "src/components/**/*",
            "src/app/**/*",
            "src/lib/**/*",
            "src/utils/**/*",
            "src/hooks/**/*",
          ],
        },
        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["src/features/*/**/*"],
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"],
        },
        {
          mode: "full",
          type: "types",
          pattern: ["src/types/**/*"],
        },
      ],
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
    },
  },

  {
    ignores: ["dist/*"],
  },
]);
