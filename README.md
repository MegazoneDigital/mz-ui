# MZ UI Design System

Megazone Backoffice 프로젝트를 위한 React UI 컴포넌트 라이브러리

## 설치

```bash
pnpm add @mz-ui/core
```

## 사용법

```tsx
import '@mz-ui/core/styles.css';
import { Button } from '@mz-ui/core';

function App() {
  return <Button>Click me</Button>;
}
```

자세한 사용법은 [packages/core/README.md](./packages/core/README.md)를 참고하세요.

## 패키지

- **[@mz-ui/core](./packages/core)** - 기본 컴포넌트

## 개발자

- [개발 가이드](./DEVELOPER.md) - 컴포넌트 개발
- [아키텍처](./docs/ARCHITECTURE.md) - 모노레포 구조
- [권장 라이브러리](./docs/RECOMMENDATIONS.md) - BO 프로젝트용

## 라이선스

MIT © Megazone ICT
