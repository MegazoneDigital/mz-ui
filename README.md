# MZ UI Design System

Megazone의 Backoffice 프로젝트를 위한 디자인 시스템 모노레포입니다.

## 📦 패키지

- **[@mz-ui/core](./packages/core)** - 기본 컴포넌트, 레이아웃, 유틸리티

### 향후 확장

- `@mz-ui/hooks` - React Hooks
- `@mz-ui/data-grid` - 데이터 그리드
- `@mz-ui/charts` - 차트
- `@mz-ui/forms` - 폼 컴포넌트

## 🚀 빠른 시작

### 개발자

```bash
pnpm install
pnpm --filter storybook-app dev  # http://localhost:6006
```

### 사용자 (BO 프로젝트)

```bash
pnpm add @mz-ui/core
```

```tsx
import '@mz-ui/core/styles.css';
import { Button } from '@mz-ui/core';

function App() {
  return <Button>Click me</Button>;
}
```

## 📝 주요 명령어

```bash
pnpm dev           # 개발 모드
pnpm build         # 빌드
pnpm format        # 코드 포맷팅
pnpm lint          # 린트
pnpm type-check    # 타입 체크
pnpm changeset     # 변경사항 기록
```

## 🛠️ 기술 스택

- **Turborepo** - 모노레포 빌드 시스템
- **React 18** + **TypeScript**
- **Tailwind CSS 4**
- **Vite** - 빌드 도구
- **Storybook** - 문서화
- **Changesets** - 버전 관리

## 📖 문서

- [시작하기](./GETTING_STARTED.md) - 설치 및 사용법
- [개발 가이드](./DEVELOPER.md) - 컴포넌트 개발
- [아키텍처](./ARCHITECTURE.md) - 모노레포 구조
- [권장 라이브러리](./RECOMMENDATIONS.md) - BO 프로젝트용

## 📄 라이선스

MIT © Megazone ICT
