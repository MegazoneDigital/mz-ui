# @mz-ui/core

Megazone ICT React UI Component Library - shadcn/ui 기반

[![npm version](https://img.shields.io/npm/v/@mz-ui/core.svg)](https://www.npmjs.com/package/@mz-ui/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 설치

```bash
npm install @mz-ui/core
# or
yarn add @mz-ui/core
# or
pnpm add @mz-ui/core
```

### Peer Dependencies

```bash
npm install react react-dom
```

**필수 버전:** React ^18.0.0, React-DOM ^18.0.0

## 빠른 시작

### 1. CSS 임포트

앱의 진입점에서 CSS 파일을 import 하세요:

```tsx
// main.tsx, index.tsx, App.tsx 등
import '@mz-ui/core/styles.css';
```

### 2. 컴포넌트 사용

```tsx
import { Button } from '@mz-ui/core';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline" size="lg">
        Large
      </Button>
    </div>
  );
}
```

## 프레임워크별 설정

### Create React App

```tsx
// src/index.tsx
import '@mz-ui/core/styles.css';
import './index.css';
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@mz-ui/core/styles.css';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
```

**중요:** 클라이언트 컴포넌트에서 사용 시 `'use client'` 추가 필요

```tsx
'use client';

import { Button } from '@mz-ui/core';

export default function MyComponent() {
  return <Button onClick={() => alert('Clicked!')}>Click</Button>;
}
```

### Vite

```tsx
// src/main.tsx
import '@mz-ui/core/styles.css';
import './index.css';
```

### Remix

```tsx
// app/root.tsx
import styles from '@mz-ui/core/styles.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
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
npm install -D tailwindcss postcss autoprefixer
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

### className 오버라이드

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

## 문제 해결

### CSS가 적용되지 않을 때

```tsx
// CSS import 순서 확인 (가장 먼저)
import '@mz-ui/core/styles.css'; // 1순위
import './globals.css'; // 2순위
```

### TypeScript 타입 인식 안될 때

```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install

# TypeScript 서버 재시작 (VSCode)
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Tailwind 클래스 미적용

```js
// tailwind.config.js content에 경로 추가
content: [
  './src/**/*.{js,jsx,ts,tsx}',
  './node_modules/@mz-ui/core/dist/**/*.{js,cjs}', // 필수!
],
```

### Next.js "use client" 에러

```tsx
'use client'; // 파일 최상단에 추가

import { Button } from '@mz-ui/core';

export default function MyComponent() {
  return <Button onClick={() => {}}>Click</Button>;
}
```

## 예제

### 로그인 폼

```tsx
import { Button } from '@mz-ui/core';
import { useState } from 'react';

function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" className="w-full p-2 border rounded" />
      <input type="password" className="w-full p-2 border rounded" />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
}
```

### 버튼 그룹

```tsx
import { Button } from '@mz-ui/core';

function ButtonGroup() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Save</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}
```

## 라이브러리 개발

라이브러리 개발, 빌드, 배포 방법은 [DEVELOPER.md](./DEVELOPER.md)를 참고하세요.

## 링크

- [GitHub](https://github.com/MegazoneDigital/mz-ui)
- [NPM](https://www.npmjs.com/package/@mz-ui/core)
- [Issues](https://github.com/MegazoneDigital/mz-ui/issues)

## 라이선스

MIT © Megazone ICT
