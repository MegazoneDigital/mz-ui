# 개발자 가이드

## 프로젝트 개요

`@mz-ui/core`는 shadcn/ui 기반 React 컴포넌트 라이브러리입니다.

### 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript 5.9** - 타입 시스템
- **Tailwind CSS 4** - 스타일링
- **Vite 7** - 빌드 도구
- **Storybook 9** - 컴포넌트 문서화
- **Vitest 3** - 테스트
- **Radix UI** - 접근성 Primitive
- **pnpm** - 패키지 매니저

### 프로젝트 구조

```
mz-ui/
├── src/
│   ├── components/          # UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── utils/              # 유틸리티
│   │   └── cn.ts
│   ├── index.css           # Tailwind CSS
│   └── index.ts            # 라이브러리 진입점
├── dist/                   # 빌드 결과물
│   ├── index.js            # ESM
│   ├── index.cjs           # CommonJS
│   ├── index.d.ts          # TypeScript 타입
│   └── style.css           # CSS 번들
├── .storybook/             # Storybook 설정
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 개발 환경 설정

### 1. 저장소 클론

```bash
git clone https://github.com/MegazoneDigital/mz-ui.git
cd mz-ui
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
# Storybook (권장)
pnpm st

# Vite 개발 서버
pnpm dev
```

Storybook: http://localhost:6006

## 스크립트

```bash
# 개발
pnpm dev              # Vite 개발 서버
pnpm st               # Storybook 개발 서버

# 빌드
pnpm build            # 라이브러리 빌드 (ESM + CJS + 타입)
pnpm build:watch      # Watch 모드 빌드
pnpm build-st         # Storybook 정적 빌드

# 테스트
pnpm test             # Vitest 실행
pnpm test:st          # Storybook 테스트
pnpm test:coverage    # 커버리지 리포트

# 코드 품질
pnpm lint             # ESLint 검사
pnpm lint:fix         # ESLint 자동 수정
pnpm format           # Prettier 포맷팅
pnpm format:check     # Prettier 검사
pnpm type-check       # TypeScript 타입 체크

# 기타
pnpm preview          # 프로덕션 빌드 미리보기
```

## 컴포넌트 개발

### 1. shadcn CLI 사용 (권장)

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add input
npx shadcn@latest add select
```

### 2. 수동 작성

```tsx
// src/components/NewComponent.tsx
import * as React from 'react';
import { cn } from '@/utils/cn';

interface NewComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
}

const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(({ className, variant = 'default', ...props }, ref) => {
  return <div ref={ref} className={cn('base-classes', className)} {...props} />;
});
NewComponent.displayName = 'NewComponent';

export { NewComponent };
export type { NewComponentProps };
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

### 4. Storybook Story 작성

```tsx
// src/components/NewComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NewComponent } from './NewComponent';

const meta: Meta<typeof NewComponent> = {
  title: 'Components/NewComponent',
  component: NewComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NewComponent>;

export const Default: Story = {
  args: {
    children: 'Example',
  },
};
```

## 개발 원칙

### TypeScript

- 모든 컴포넌트에 타입 정의
- `React.forwardRef` 사용하여 ref 전달
- Generic 타입 적극 활용
- `export type` 명시적 선언

### 접근성

- Radix UI Primitive 활용
- ARIA 속성 적절히 사용
- 키보드 내비게이션 지원
- 시맨틱 HTML 사용

### 스타일링

- Tailwind CSS 유틸리티 클래스 사용
- `cn()` 함수로 className 병합
- CSS 변수로 테마 지원
- `className` prop으로 확장 가능하게

### 코드 품질

- ESLint/Prettier 규칙 준수
- 커밋 전 lint & format 실행
- 주석은 필요한 경우만 한글로
- 컴포넌트는 PascalCase, 파일명도 PascalCase

## 빌드

### 빌드 실행

```bash
pnpm build
```

### 빌드 결과물

```
dist/
├── index.js (ESM)         # ES Modules
├── index.cjs (CJS)        # CommonJS
├── index.d.ts             # TypeScript 타입 정의
├── index.d.ts.map         # 타입 소스맵
├── style.css              # CSS 번들
├── *.js.map               # JavaScript 소스맵
└── components/utils/      # 하위 타입 정의
```

### 빌드 검증

```bash
# 빌드 결과 확인
ls -lh dist/

# 타입 정의 확인
find dist -name "*.d.ts"

# 번들 크기 확인
du -sh dist/*
```

## NPM 배포

### 사전 준비

```bash
# 1. 의존성 최신화
pnpm install

# 2. 린트 검사
pnpm lint

# 3. 타입 체크
pnpm type-check

# 4. 빌드 테스트
pnpm build
```

### NPM 계정 설정

```bash
# NPM 로그인
npm login

# 로그인 확인
npm whoami

# 2FA 설정 (권장)
npm profile enable-2fa auth-and-writes
```

### 버전 관리

**Semantic Versioning:**

- **PATCH** (0.1.0 → 0.1.1): 버그 수정
- **MINOR** (0.1.0 → 0.2.0): 새 기능 추가 (하위 호환)
- **MAJOR** (0.1.0 → 1.0.0): Breaking changes

```bash
# 버전 자동 업데이트
pnpm version patch   # 버그 수정
pnpm version minor   # 새 기능
pnpm version major   # Breaking change

# 수동 버전 지정
pnpm version 1.0.0
```

### 배포

```bash
# Scoped 패키지는 --access public 필수
npm publish --access public
```

`prepublishOnly` 훅이 자동으로 빌드를 실행합니다.

### Git Push

```bash
# 코드 푸시
git push origin develop

# 태그 푸시 (버전 관리 시 자동 생성된 태그)
git push --tags
```

### 배포 확인

```bash
# 패키지 정보
npm view @mz-ui/core

# 버전 목록
npm view @mz-ui/core versions

# 웹에서 확인
# https://www.npmjs.com/package/@mz-ui/core
```

## 배포 워크플로우

```bash
# 1. 기능 개발 완료
git checkout develop
git add .
git commit -m "feat: Dialog 컴포넌트 추가"

# 2. 테스트 및 검증
pnpm lint
pnpm type-check
pnpm build

# 3. 버전 업데이트
pnpm version minor
# → package.json 버전 업데이트
# → Git 커밋 & 태그 자동 생성

# 4. NPM 배포
npm publish --access public

# 5. Git 푸시
git push origin develop
git push --tags
```

## 베타 버전 배포

```bash
# 베타 버전 생성
pnpm version prerelease --preid=beta
# 예: 0.1.0 → 0.1.1-beta.0

# 베타 태그로 배포
npm publish --tag beta --access public

# 베타 버전 설치 (사용자)
npm install @mz-ui/core@beta
```

## CI/CD 자동화

### GitHub Actions 설정

`.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
          cache: 'pnpm'

      - name: Install
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

      - name: Build
        run: pnpm build

      - name: Publish
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### NPM Token 설정

1. NPM에서 Automation Token 생성
   - https://www.npmjs.com/settings/~/tokens
2. GitHub Secrets에 `NPM_TOKEN` 등록
3. 태그 푸시 시 자동 배포

```bash
pnpm version minor
git push origin develop
git push --tags
# → GitHub Actions 자동 실행
```

## 테스트

### Vitest

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
});
```

### Storybook 테스트

```bash
pnpm test:st
```

## 문제 해결

### 빌드 에러

```bash
# 캐시 클리어
rm -rf node_modules dist
pnpm install
pnpm build
```

### 타입 에러

```bash
# TypeScript 재컴파일
pnpm type-check

# tsconfig 확인
cat tsconfig.json
```

### Storybook 에러

```bash
# Storybook 캐시 삭제
rm -rf node_modules/.cache
pnpm st
```

## 커밋 컨벤션

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
feat: Dialog 컴포넌트 추가

- Dialog Primitive 추가
- DialogHeader, DialogFooter 컴포넌트
- Storybook Story 작성
```

## 배포 체크리스트

### 배포 전

- [ ] 빌드 성공
- [ ] 린트 통과
- [ ] 타입 체크 통과
- [ ] 테스트 통과
- [ ] README 업데이트
- [ ] 버전 번호 확인
- [ ] Git 커밋 완료

### 배포 후

- [ ] NPM에서 패키지 확인
- [ ] 테스트 프로젝트에서 설치 확인
- [ ] TypeScript 타입 로드 확인
- [ ] CSS 파일 import 확인
- [ ] Git 태그 푸시
- [ ] GitHub Release 생성 (선택)

## 참고 자료

- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vite](https://vite.dev/)
- [Storybook](https://storybook.js.org/)
- [NPM Publishing](https://docs.npmjs.com/cli/v10/using-npm/developers)
- [Semantic Versioning](https://semver.org/)
