/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(dirname, './src'),
      },
    },
    build: {
      lib: {
        entry: path.resolve(dirname, 'src/index.ts'),
        name: 'MzUI',
        formats: ['es', 'cjs'],
        fileName: (format: string) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name?.endsWith('.css')) return 'style.css';
            return assetInfo.name || '';
          },
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
      emptyOutDir: true,
    },
  };

  // Storybook 테스트 설정은 테스트 모드에서만 로드
  if (mode === 'test') {
    const { storybookTest } = await import('@storybook/addon-vitest/vitest-plugin');
    (config as any).test = {
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: 'playwright',
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
          },
        },
      ],
    };
  }

  return config;
});
