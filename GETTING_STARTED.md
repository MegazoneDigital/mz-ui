# 빠른 시작

## 개발자용

### 설치 및 실행

```bash
git clone https://github.com/megazone/mz-ui.git
cd mz-ui
pnpm install
pnpm --filter storybook-app dev
```

http://localhost:6006 에서 확인하세요.

### 주요 명령어

```bash
pnpm format        # 코드 포맷팅
pnpm lint          # 린트
pnpm type-check    # 타입 체크
pnpm build         # 빌드
```

---

## 사용자용 (BO 프로젝트)

### 1. 설치

```bash
pnpm add @mz-ui/core react react-dom
```

### 2. CSS Import

```tsx
import '@mz-ui/core/styles.css';
import './globals.css';
```

### 3. 컴포넌트 사용

```tsx
'use client'; // Next.js App Router

import { Button } from '@mz-ui/core';

export default function MyComponent() {
  return <Button onClick={() => alert('Clicked!')}>Click</Button>;
}
```

### 4. Tailwind 설정 (커스터마이징)

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@mz-ui/core/dist/**/*.{js,cjs}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## 다음 단계

- [개발 가이드](./DEVELOPER.md)
- [패키지 문서](./packages/core/README.md)
- [권장 라이브러리](./RECOMMENDATIONS.md)

## 도움말

[GitHub Issues](https://github.com/megazone/mz-ui/issues)
