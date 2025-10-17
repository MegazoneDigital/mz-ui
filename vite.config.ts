/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Storybook 테스트 통합에 대한 자세한 정보: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => ({
  plugins: mode === 'lib' ? [] : [react()], // 라이브러리 모드에서는 react 플러그인 제거
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  // 라이브러리 빌드 설정
  build:
    mode === 'lib'
      ? {
          emptyOutDir: true, // 빌드 전 dist 폴더 클리어
          lib: {
            entry: resolve(__dirname || dirname, 'src/components/index.ts'),
            name: 'MzUI',
            formats: ['es'],
            fileName: 'index',
          },
          rollupOptions: {
            external: id => {
              // React 관련 모든 패키지를 external로 처리
              return /^react($|\/)|^react-dom($|\/)/.test(id);
            },
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'React',
              },
            },
          },
          cssCodeSplit: false,
        }
      : undefined,
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // 플러그인이 Storybook 설정에 정의된 스토리에 대한 테스트를 실행합니다
          // 옵션 참조: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
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
  },
}));
