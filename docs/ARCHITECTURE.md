# 아키텍처

## 모노레포 구조

```
mz-ui/
├── apps/
│   └── storybook/          # 문서 사이트 (private)
├── packages/
│   └── core/               # @mz-ui/core (배포)
└── tooling/
    ├── eslint-config/      # ESLint + Prettier 통합 (private)
    └── typescript-config/  # 공통 TypeScript (private)
```

## 핵심 기술 스택

### 빌드 도구

| 도구          | 용도                                 |
| ------------- | ------------------------------------ |
| **Turborepo** | 모노레포 빌드 오케스트레이션 및 캐싱 |
| **Vite**      | UI 컴포넌트 번들링 (ESM + CJS + CSS) |
| **pnpm**      | 패키지 관리 및 워크스페이스          |

### 개발 도구

| 도구                  | 용도                         |
| --------------------- | ---------------------------- |
| **TypeScript**        | 타입 안전성                  |
| **ESLint + Prettier** | 코드 품질 및 포맷팅          |
| **Storybook**         | 컴포넌트 문서화 및 개발 환경 |
| **Changesets**        | 버전 관리 및 CHANGELOG 생성  |

### UI 라이브러리

| 라이브러리         | 용도                          |
| ------------------ | ----------------------------- |
| **Tailwind CSS**   | 스타일링                      |
| **Radix UI**       | 접근성 높은 headless 컴포넌트 |
| **CVA**            | 타입 안전한 variant 관리      |
| **tailwind-merge** | className 충돌 방지           |

## 설계 원칙

### 1. 단일 책임 (Single Responsibility)

각 패키지는 명확한 하나의 목적만 가집니다.

- `@mz-ui/core`: UI 컴포넌트만

### 2. 선택적 설치 (Opt-in)

필요한 패키지만 설치합니다.

```bash
pnpm add @mz-ui/core  # 필요한 것만
```

### 3. 타입 안전성 (Type Safety)

모든 패키지는 TypeScript로 작성되고 타입 정의를 export합니다.

### 4. 트리 쉐이킹 (Tree Shaking)

Named exports를 사용하여 사용하지 않는 코드는 번들에서 제외됩니다.

```tsx
import { Button } from '@mz-ui/core';  // Button만 번들에 포함
```

## 빌드 전략

### UI 컴포넌트 패키지 (core)

**도구**: Vite

**출력**:

- ESM (`dist/index.js`) - 모던 번들러용
- CJS (`dist/index.cjs`) - Node.js 및 레거시 번들러용
- CSS (`dist/style.css`) - 스타일시트
- TypeScript 정의 (`dist/index.d.ts`)

### Hooks/Utils 패키지 (향후)

**도구**: tsup

**출력**:

- ESM only - 가볍고 빠른 번들링

## 의존성 관리

### Peer Dependencies

사용자가 직접 설치해야 하는 패키지:

```json
{
  "peerDependencies": {
    "react": ">=18.0.0 <19.0.0",
    "react-dom": ">=18.0.0 <19.0.0"
  }
}
```

### Workspace Dependencies

내부 공통 설정:

```json
{
  "devDependencies": {
    "eslint-config": "workspace:*",
    "typescript-config": "workspace:*"
  }
}
```

## 워크플로우

### 개발 → 배포

```
1. 컴포넌트 개발 (packages/core/src)
   ↓
2. Storybook 확인 (pnpm dev)
   ↓
3. 린트 및 포맷팅 (pnpm lint:fix)
   ↓
4. 빌드 (pnpm build)
   ↓
5. Changeset 생성 (pnpm changeset)
   ↓
6. 배포 (pnpm release)
```

## 캐싱 전략

Turborepo가 다음을 캐싱합니다:

- **빌드 결과물** (`dist/`)
- **린트 결과**
- **타입 체크 결과**

캐시 hit 시 해당 작업은 스킵되어 빠른 빌드가 가능합니다.

## 참고 자료

- [Turborepo 공식 문서](https://turbo.build/repo/docs)
- [Changesets 가이드](https://github.com/changesets/changesets)
- [pnpm Workspaces](https://pnpm.io/workspaces)
