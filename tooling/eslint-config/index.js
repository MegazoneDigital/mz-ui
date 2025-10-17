import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export const prettierConfig = {
  semi: true,
  tabWidth: 2,
  printWidth: 160,
  singleQuote: true,
  trailingComma: 'es5',
  jsxSingleQuote: false,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  useTabs: false,
  bracketSameLine: false,
  quoteProps: 'as-needed',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'storybook-static', '.turbo', '.changeset'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': ['error', prettierConfig],
    },
  }
);
