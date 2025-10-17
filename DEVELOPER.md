# 개발자 가이드

MZ UI 모노레포 개발 환경 설정 및 워크플로우 가이드

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/megazone/mz-ui.git
cd mz-ui
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

→ http://localhost:6006 에서 Storybook 확인

## 📋 주요 명령어

| 명령어           | 설명                                       |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Storybook 개발 서버 실행                   |
| `pnpm build`     | 전체 패키지 빌드                           |
| `pnpm lint`      | 코드 검사 (ESLint)                         |
| `pnpm lint:fix`  | 코드 검사 및 자동 수정 (ESLint + Prettier) |
| `pnpm clean`     | 빌드 결과물 및 node_modules 삭제           |
| `pnpm changeset` | 변경사항 기록 (배포 전)                    |

## 📁 프로젝트 구조

```
mz-ui/
├── apps/
│   └── storybook/              # Storybook 문서 사이트
├── packages/
│   └── core/                   # @mz-ui/core 패키지
│       ├── src/
│       │   ├── components/     # UI 컴포넌트
│       │   └── utils/          # 유틸리티
│       └── dist/               # 빌드 결과물
└── tooling/
    ├── eslint-config/          # ESLint + Prettier 설정
    └── typescript-config/      # TypeScript 설정
```

## 🔧 컴포넌트 개발 워크플로우

### 방법 1: shadcn CLI 사용 (권장)

가장 빠르고 표준화된 방법입니다.

```bash
cd packages/core
npx shadcn@latest add [component-name]
```

예시:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### 방법 2: 수동 작성

커스텀 컴포넌트가 필요한 경우:

#### 1) 컴포넌트 작성

```tsx
// packages/core/src/components/MyComponent.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utils/cn';

const myComponentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-classes',
        outline: 'outline-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

#### 2) Storybook 스토리 작성

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
    children: 'Hello World',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Variant',
  },
};
```

#### 3) Export 추가

```ts
// packages/core/src/components/index.ts
export * from './MyComponent';
```

#### 4) 테스트

```bash
pnpm dev  # Storybook에서 확인
```

## 📦 새 패키지 추가

새로운 패키지를 추가하려면:

### 1. 패키지 디렉토리 생성

```bash
mkdir -p packages/[package-name]
cd packages/[package-name]
```

### 2. package.json 생성

```json
{
  "name": "@mz-ui/[package-name]",
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
  "files": ["dist", "README.md"],
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

### 3. 설정 파일 추가

```js
// eslint.config.js
import baseConfig from 'eslint-config';
export default [...baseConfig];
```

```json
// tsconfig.json
{
  "extends": "typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

### 4. 소스 작성

```bash
mkdir src
# src/index.ts 등 작성
```

## 🚀 배포 프로세스

### 1. 변경사항 기록

```bash
pnpm changeset
```

대화형으로 다음을 선택:

- 변경된 패키지
- 버전 변경 타입 (major/minor/patch)
- 변경사항 요약

### 2. 버전 업데이트

```bash
pnpm changeset version
```

### 3. 빌드 및 배포

```bash
pnpm release  # 빌드 후 NPM 배포
```

## 📚 참고 문서

- [Core 패키지 가이드](./packages/core/README.md) - 컴포넌트 API
- [Storybook 가이드](./apps/storybook/README.md) - 문서 사이트
- [아키텍처](./docs/ARCHITECTURE.md) - 모노레포 구조
- [Tooling](./tooling/README.md) - 공통 설정
