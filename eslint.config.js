// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'storybook-static', 'node_modules', '**/*.css']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs['recommended-latest'], reactRefresh.configs.vite, prettier],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  // Storybook specific config
  {
    files: ['**/*.stories.{js,jsx,ts,tsx}'],
    plugins: {
      storybook,
    },
    rules: {
      ...storybook.configs.recommended.rules,
      'react-refresh/only-export-components': 'off',
    },
  },
]);
