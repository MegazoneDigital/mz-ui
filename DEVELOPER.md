# 개발자 가이드

## 기술 스택

- **Turborepo** - 빌드 시스템
- **pnpm Workspaces** - 패키지 관리
- **Changesets** - 버전 관리
- **React 18** + **TypeScript 5.9**
- **Tailwind CSS 4** + **Vite 7**
- **Storybook 8**

## 프로젝트 구조

```
mz-ui/
├── apps/
│   └── storybook/          # 문서 사이트
├── packages/
│   └── core/               # @mz-ui/core
└── tooling/
    ├── eslint-config/      # 공통 ESLint
    ├── prettier-config/    # 공통 Prettier
    └── typescript-config/  # 공통 TypeScript
```

## 주요 명령어

```bash
# 개발
pnpm --filter storybook-app dev     # Storybook
pnpm --filter @mz-ui/core dev       # Core 개발 모드

# 빌드
pnpm build                           # 전체 빌드 (Turborepo)
pnpm --filter @mz-ui/core build     # Core만 빌드

# 코드 품질
pnpm format                          # 포맷팅
pnpm lint                            # 린트
pnpm type-check                      # 타입 체크

# 버전 관리
pnpm changeset                       # 변경사항 기록
pnpm version                         # 버전 업데이트
pnpm release                         # NPM 배포
```

## 컴포넌트 개발

### shadcn CLI 사용

```bash
cd packages/core
npx shadcn@latest add button
```

### 수동 작성

```tsx
// packages/core/src/components/MyComponent.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utils/cn';

const variants = cva('base-classes', {
  variants: {
    variant: {
      default: 'default-classes',
      primary: 'primary-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variants> {}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(({ className, variant, ...props }, ref) => {
  return <div ref={ref} className={cn(variants({ variant }), className)} {...props} />;
});

MyComponent.displayName = 'MyComponent';
```

### Storybook Story

```tsx
// packages/core/src/components/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    children: 'MyComponent',
  },
};
```

### Export 추가

```typescript
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
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "peerDependencies": {
    "react": ">=18.0.0 <19.0.0"
  },
  "devDependencies": {
    "eslint-config": "workspace:*",
    "typescript-config": "workspace:*",
    "tsup": "^8.0.0"
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  }
}
```

## 버전 관리

```bash
# 1. 코드 변경
# 2. changeset 추가
pnpm changeset

# 3. 버전 업데이트
pnpm version

# 4. 배포
pnpm release
```

## 트러블슈팅

### 타입 에러

```bash
rm -rf node_modules/.cache packages/*/node_modules/.cache
pnpm install
```

### 빌드 에러

```bash
rm -rf .turbo
pnpm clean
pnpm install
pnpm build
```

## 참고

- [Turborepo](https://turbo.build/repo/docs)
- [Changesets](https://github.com/changesets/changesets)
- [shadcn/ui](https://ui.shadcn.com/)
