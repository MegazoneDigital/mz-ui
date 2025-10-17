# 개발자 가이드

MZ UI 모노레포 개발 가이드입니다.

## 시작하기

```bash
git clone https://github.com/megazone/mz-ui.git
cd mz-ui
pnpm install
pnpm dev  # Storybook 실행
```

## 명령어

```bash
pnpm dev           # Storybook 개발 서버
pnpm build         # 전체 빌드
pnpm lint          # 린트 검사
pnpm lint:fix      # 린트 + 자동 수정
pnpm type-check    # 타입 체크
pnpm changeset     # 변경사항 기록
```

## 프로젝트 구조

```
mz-ui/
├── apps/storybook/    # 문서 사이트
├── packages/core/     # @mz-ui/core
└── tooling/           # 공통 설정
```

## 컴포넌트 개발

### 1. shadcn CLI 사용

```bash
cd packages/core
npx shadcn@latest add button
```

### 2. 수동 작성

```tsx
// packages/core/src/components/MyComponent.tsx
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const variants = cva('base-classes', {
  variants: { variant: { default: 'default-classes' } },
});

export const MyComponent = ({ className, variant, ...props }) => {
  return <div className={cn(variants({ variant }), className)} {...props} />;
};
```

### 3. Storybook

```tsx
// packages/core/src/components/MyComponent.stories.tsx
import { MyComponent } from './MyComponent';

export default {
  title: 'Components/MyComponent',
  component: MyComponent,
};

export const Default = {
  args: { children: 'Hello' },
};
```

### 4. Export

```ts
// packages/core/src/components/index.ts
export * from './MyComponent';
```

## 새 패키지 추가

```bash
mkdir -p packages/hooks
```

```json
// packages/hooks/package.json
{
  "name": "@mz-ui/hooks",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "devDependencies": {
    "eslint-config": "workspace:*",
    "typescript-config": "workspace:*",
    "tsup": "^8.0.0"
  }
}
```

## 버전 관리

```bash
pnpm changeset        # 변경사항 기록
pnpm version          # 버전 업데이트
pnpm release          # NPM 배포
```

## 참고

- [packages/core](./packages/core/README.md) - Core 패키지
- [apps/storybook](./apps/storybook/README.md) - Storybook
- [아키텍처](./docs/ARCHITECTURE.md) - 상세 구조
