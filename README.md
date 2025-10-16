# @mz-ui/core

Megazone ICT React UI Design System - shadcn/ui 기반 컴포넌트 라이브러리

## 🎯 프로젝트 개요

shadcn/ui 기반의 재사용 가능한 React 컴포넌트를 **Storybook에서 개발/문서화**하고 **NPM으로 배포**하는 프로젝트입니다.

### 주요 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS 4** - 스타일링
- **Vite** - 빌드 도구
- **Storybook 9** - 컴포넌트 문서화
- **Vitest** - 테스트 프레임워크
- **Radix UI** - 접근성 Primitive

## 📦 설치

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

## 🚀 사용법

### 1. Tailwind CSS 설정

`tailwind.config.js`:

```js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@mz-ui/core/dist/**/*.{js,cjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 2. CSS Import

앱의 진입점:

```tsx
import '@mz-ui/core/styles.css';
```

### 3. 컴포넌트 사용

```tsx
import { Button } from '@mz-ui/core';

function App() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline" size="lg">
        Large Outline
      </Button>
    </div>
  );
}
```

## 🛠 개발 환경 설정

### 설치

```bash
git clone https://github.com/MegazoneDigital/mz-ui.git
cd mz-ui
pnpm install
```

### 사용 가능한 스크립트

```bash
# 개발
pnpm dev              # Vite 개발 서버
pnpm st               # Storybook 개발 서버 (권장)

# 빌드
pnpm build            # 라이브러리 빌드 (ESM + CJS + 타입)
pnpm build:watch      # Watch 모드 빌드
pnpm build-st         # Storybook 정적 빌드

# 테스트
pnpm test             # Vitest 테스트
pnpm test:st          # Storybook 테스트
pnpm test:coverage    # 커버리지 리포트

# 코드 품질
pnpm lint             # ESLint 검사
pnpm lint:fix         # ESLint 자동 수정
pnpm format           # Prettier 포맷팅
pnpm format:check     # Prettier 검사
pnpm type-check       # TypeScript 타입 체크
```

## 📁 프로젝트 구조

```
mz-ui/
├── .storybook/           # Storybook 설정
├── src/
│   ├── components/       # UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── utils/           # 유틸리티
│   │   └── cn.ts
│   ├── index.css        # Tailwind CSS
│   └── index.ts         # 라이브러리 진입점
├── dist/                # 빌드 결과물 (NPM 배포용)
│   ├── index.js         # ESM
│   ├── index.cjs        # CommonJS
│   ├── index.d.ts       # TypeScript 타입
│   └── style.css        # 번들된 CSS
└── package.json
```

## 🎨 컴포넌트 개발 가이드

### 1. 새 컴포넌트 추가

#### Option 1: shadcn CLI 사용 (권장)

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

#### Option 2: 수동 작성

```tsx
// src/components/NewComponent.tsx
import * as React from 'react';
import { cn } from '@/utils/cn';

interface NewComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
}

const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('base-classes', className)}
        {...props}
      />
    );
  }
);
NewComponent.displayName = 'NewComponent';

export { NewComponent };
export type { NewComponentProps };
```

### 2. Storybook Story 작성

```tsx
// src/components/NewComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NewComponent } from './NewComponent';

const meta: Meta<typeof NewComponent> = {
  title: 'Components/NewComponent',
  component: NewComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof NewComponent>;

export const Default: Story = {
  args: {
    children: 'Example',
  },
};
```

### 3. Export 추가

```tsx
// src/components/index.ts
export { NewComponent } from './NewComponent';
export type { NewComponentProps } from './NewComponent';

// src/index.ts
export { NewComponent } from './components/NewComponent';
export type { NewComponentProps } from './components/NewComponent';
```

## 📚 NPM 배포 가이드

### 1. 배포 전 체크리스트

```bash
# 1. 의존성 업데이트
pnpm install

# 2. 린트 검사
pnpm lint

# 3. 타입 체크
pnpm type-check

# 4. 테스트 실행
pnpm test

# 5. 빌드 테스트
pnpm build
```

### 2. 버전 업데이트

```bash
# Semantic Versioning
pnpm version patch  # 0.1.0 -> 0.1.1 (버그 수정)
pnpm version minor  # 0.1.0 -> 0.2.0 (새 기능)
pnpm version major  # 0.1.0 -> 1.0.0 (Breaking changes)
```

### 3. NPM 배포

```bash
# NPM 로그인
npm login

# 배포 (prepublishOnly로 자동 빌드됨)
npm publish --access public

# 배포 확인
npm view @mz-ui/core
```

### 4. Git Tag & Push

```bash
git push origin develop
git push --tags
```

## 🎯 개발 원칙

### 타입 안정성
- 모든 props에 TypeScript 타입 정의
- `React.forwardRef` 사용으로 ref 전달 지원
- Generic 타입 적극 활용

### 접근성 (a11y)
- Radix UI Primitive 활용
- ARIA 속성 적절히 사용
- 키보드 내비게이션 지원

### 스타일링
- Tailwind CSS 유틸리티 클래스
- `cn()` 함수로 조건부 클래스 병합
- CSS 변수로 테마 커스터마이징

### 재사용성
- Props로 다양한 변형 지원
- `className` prop으로 확장 가능
- Composition 패턴 활용

## 🧪 테스트 작성

```tsx
// NewComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NewComponent } from './NewComponent';

describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent>Test</NewComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <NewComponent className="custom">Test</NewComponent>
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
```

## 📝 커밋 컨벤션

```
<type>: <subject>

<body>
```

**Type:**
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정 변경

**Example:**
```
feat: Button 컴포넌트에 loading state 추가

- isLoading prop 추가
- Spinner 컴포넌트 통합
- disabled 상태 자동 처리
```

## 🔧 문제 해결

### 빌드 에러

```bash
# 캐시 클리어
rm -rf node_modules dist .turbo
pnpm install
pnpm build
```

### Tailwind 스타일 미적용

- `@mz-ui/core/styles.css` import 확인
- Tailwind content 경로에 `node_modules/@mz-ui/core/dist/**/*.{js,cjs}` 포함 확인

### TypeScript 타입 인식 안됨

```bash
# 타입 재생성
pnpm build
```

## 🌈 특징

- ✅ **Tree-shakable**: 사용하는 컴포넌트만 번들에 포함
- ✅ **TypeScript**: 완벽한 타입 지원
- ✅ **Dark Mode**: CSS 변수 기반 다크모드
- ✅ **Accessible**: WCAG 2.1 준수
- ✅ **Customizable**: Tailwind로 자유롭게 커스터마이징
- ✅ **Modern**: React 18, Vite, Tailwind 4 최신 기술

## 📚 참고 자료

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)

## 📄 라이선스

MIT © Megazone ICT
