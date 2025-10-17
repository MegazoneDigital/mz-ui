# MZ UI Design System

Megazone Backoffice 프로젝트를 위한 React UI 컴포넌트 라이브러리

## 빠른 시작

### 설치

```bash
pnpm add @mz-ui/core
```

### 사용

```tsx
// 1. CSS 임포트 (App 진입점)
import '@mz-ui/core/styles.css';

// 2. 컴포넌트 사용
import { Button } from '@mz-ui/core';

function App() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  );
}
```

## 패키지

| 패키지        | 설명             | 문서                                |
| ------------- | ---------------- | ----------------------------------- |
| `@mz-ui/core` | 기본 UI 컴포넌트 | [README](./packages/core/README.md) |

## 문서

**사용자용:**

- [Core 패키지 가이드](./packages/core/README.md) - 컴포넌트 API 및 사용법

**개발자용:**

- [개발 가이드](./DEVELOPER.md) - 개발 환경 설정 및 컴포넌트 추가
- [아키텍처](./docs/ARCHITECTURE.md) - 모노레포 구조 및 설계 원칙

## 라이선스

MIT © Megazone ICT
