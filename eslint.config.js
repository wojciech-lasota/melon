// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const reactPlugin = require('eslint-plugin-react');
const securityPlugin = require('eslint-plugin-security');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const unusedImports = require('eslint-plugin-unused-imports');
const boundaries = require('eslint-plugin-boundaries');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const errorOnlyPlugin = require('eslint-plugin-only-error');

const OFF = 0;
const ERROR = 2;

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  securityPlugin.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'only-error': errorOnlyPlugin,
      security: securityPlugin,
      'unused-imports': unusedImports,
      boundaries: boundaries,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {}, // eslint-import-resolver-typescript
      },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'shared',
          pattern: [
            'src/components/**/*',
            'src/app/**/*',
            'src/lib/**/*',
            'src/utils/**/*',
            'src/hooks/**/*',
          ],
        },
        {
          mode: 'full',
          type: 'feature',
          capture: ['featureName'],
          pattern: ['src/features/*/**/*'],
        },
        {
          mode: 'full',
          type: 'app',
          capture: ['_', 'fileName'],
          pattern: ['src/app/**/*'],
        },
        {
          mode: 'full',
          type: 'types',
          pattern: ['src/types/**/*'],
        },
      ],
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'boundaries/no-unknown': 'error',
      'boundaries/element-types': [
        ERROR,
        {
          default: 'disallow',
          rules: [
            {
              from: ['shared'],
              allow: ['shared', 'types', 'lib', 'feature'],
            },
            // {
            //   from: 'lib',
            //   allow: ['shared', 'types', 'feature', 'lib'],
            // },
            {
              from: ['components'],
              allow: ['shared', 'types', 'lib'],
            },
            {
              from: ['feature'],
              allow: [
                'shared',
                'types',
                'lib',
                ['feature', { featureName: '${from.featureName}' }],
              ],
            },
            {
              from: ['app', 'neverImport'],
              allow: ['shared', 'feature', 'types'],
            },
            {
              from: ['app'],
              allow: [['app', { fileName: '*.css' }]],
            },
          ],
        },
      ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'prettier/prettier': [
        ERROR,
        {
          useTabs: false,
          semi: true,
          singleQuote: true,
          jsxSingleQuote: false,
          trailingComma: 'all',
          arrowParens: 'always',
        },
      ],
      'arrow-parens': [ERROR, 'always', { requireForBlockBody: false }],
      'no-restricted-exports': OFF,
      'no-shadow': OFF,
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-use-before-define': ERROR,
      '@typescript-eslint/no-shadow': ERROR,
      '@typescript-eslint/explicit-module-boundary-types': ERROR,
      '@typescript-eslint/unbound-method': ERROR,
      '@typescript-eslint/explicit-function-return-type': [
        ERROR,
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  {
    ignores: [
      'dist/*',
      'tailwind.config.js',
      'postcss.config.js',
      'metro.config.js',
    ],
  },
]);
