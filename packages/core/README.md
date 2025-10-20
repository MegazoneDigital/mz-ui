# @mz-ui/core

[![npm version](https://img.shields.io/npm/v/@mz-ui/core.svg)](https://www.npmjs.com/package/@mz-ui/core)
[![npm downloads](https://img.shields.io/npm/dm/@mz-ui/core.svg)](https://www.npmjs.com/package/@mz-ui/core)
[![license](https://img.shields.io/npm/l/@mz-ui/core.svg)](https://github.com/MegazoneDigital/mz-ui/blob/main/LICENSE)

MZ UI 디자인 시스템의 핵심 패키지입니다. 기본 컴포넌트, 레이아웃, 유틸리티를 제공합니다.

## 특징

- ⚡️ **React 18+** - 최신 React 기능 지원
- 🎨 **Tailwind CSS** - 유틸리티 우선 스타일링
- 🔧 **TypeScript** - 완전한 타입 지원
- 📦 **Tree-shakeable** - 최적화된 번들 크기
- 🌗 **Dark Mode** - 다크 모드 지원
- ♿️ **접근성** - Radix UI 기반의 접근 가능한 컴포넌트

## 설치

```bash
pnpm add @mz-ui/core
# or
npm install @mz-ui/core
# or
yarn add @mz-ui/core
```

### Peer Dependencies

```bash
pnpm add react react-dom
```

**필수 버전:** React >=18.0.0

## 사용법

### 1. CSS Import

앱의 진입점에서 CSS를 import 하세요:

```tsx
// main.tsx, index.tsx, App.tsx 등
import '@mz-ui/core/styles.css';
import './globals.css';
```

### 2. 컴포넌트 사용

```tsx
'use client';

import { Button } from '@mz-ui/core';

export default function MyComponent() {
  return <Button onClick={() => alert('Clicked!')}>Click</Button>;
}
```

## 컴포넌트

### Button

```tsx
import { Button } from '@mz-ui/core';

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

// Props
<Button onClick={() => console.log('Clicked!')}>Click</Button>
<Button disabled>Disabled</Button>
<Button className="custom-class">Custom</Button>

// asChild (Radix UI Slot)
<Button asChild>
  <a href="/login">Go to Login</a>
</Button>
```

### TypeScript

```tsx
import type { ButtonProps } from '@mz-ui/core';

interface MyButtonProps extends ButtonProps {
  loading?: boolean;
}

function MyButton({ loading, children, ...props }: MyButtonProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading ? 'Loading...' : children}
    </Button>
  );
}
```

## Tailwind CSS 설정 (선택)

컴포넌트를 커스터마이징하려면 Tailwind 설정이 필요합니다:

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@mz-ui/core/dist/**/*.{js,cjs}', // 필수
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 커스터마이징

### className Override

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">Custom Color</Button>
```

### CSS 변수

```css
/* globals.css */
:root {
  --primary: 262 83% 58%;
  --primary-foreground: 0 0% 100%;
}

.dark {
  --primary: 262 83% 58%;
  --primary-foreground: 0 0% 100%;
}
```

### 다크모드

```tsx
// HTML에 dark class 추가
<html className="dark">

// 또는 JavaScript로
document.documentElement.classList.add('dark');
```

## 유틸리티

### cn (className 병합)

```tsx
import { cn } from '@mz-ui/core';

function MyComponent({ className }) {
  return <div className={cn('base-class', className)} />;
}
```

## 트러블슈팅

### CSS가 적용되지 않을 때

CSS import 순서를 확인하세요:

```tsx
// ✅ Correct
import '@mz-ui/core/styles.css'; // 1순위
import './globals.css'; // 2순위

// ❌ Wrong
import './globals.css';
import '@mz-ui/core/styles.css'; // 너무 늦음
```

### TypeScript 타입 인식 안될 때

```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
pnpm install

# TypeScript 서버 재시작 (VSCode)
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Tailwind 클래스 미적용

```js
// tailwind.config.js content에 경로 추가
content: [
  './src/**/*.{js,jsx,ts,tsx}',
  './node_modules/@mz-ui/core/dist/**/*.{js,cjs}', // 필수!
],
```

## 라이선스

MIT © Megazone ICT
