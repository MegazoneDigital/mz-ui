import baseConfig from 'eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['.next/**', 'out/**', 'next-env.d.ts'],
  },
];
