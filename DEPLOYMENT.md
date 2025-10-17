# NPM 패키지 배포 가이드

React UI 컴포넌트 라이브러리를 npm에 배포하는 완전한 절차 가이드입니다.

## 📋 목차

1. [프로젝트 초기 설정](#1-프로젝트-초기-설정)
2. [Package.json 배포 설정](#2-packagejson-배포-설정)
3. [빌드 시스템 구성](#3-빌드-시스템-구성)
4. [TypeScript 설정](#4-typescript-설정)
5. [배포 파일 구조](#5-배포-파일-구조)
6. [Git 설정](#6-git-설정)
7. [문서화](#7-문서화)
8. [로컬 테스트](#8-로컬-테스트)
9. [NPM 배포](#9-npm-배포)
10. [배포 후 확인](#10-배포-후-확인)

---

## 1. 프로젝트 초기 설정

### 1.1 기본 프로젝트 구조

```
mz-ui/
├── src/
│   ├── components/
│   │   ├── Button.tsx          # 메인 컴포넌트
│   │   ├── Button.stories.tsx  # Storybook 스토리
│   │   └── index.ts            # 컴포넌트 export
│   ├── utils/
│   │   └── cn.ts               # 유틸리티 함수
│   └── index.css               # 스타일
├── dist/                       # 빌드 출력 (배포용)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 1.2 필수 의존성 설치

```bash
# 핵심 의존성
pnpm add @radix-ui/react-slot class-variance-authority clsx tailwind-merge

# 개발 의존성
pnpm add -D react react-dom typescript vite @vitejs/plugin-react
```

---

## 2. Package.json 배포 설정

### 2.1 기본 메타데이터 설정

```json
{
  "name": "@megazonedigital/mz-ui",
  "private": false,
  "version": "0.1.0",
  "type": "module",
  "description": "Modern React UI component library built with Shadcn UI, TypeScript, and Tailwind CSS",
  "keywords": ["react", "ui", "components", "typescript", "tailwind", "shadcn"],
  "author": "MegazoneDigital",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/MegazoneDigital/mz-ui.git"
  },
  "homepage": "https://github.com/MegazoneDigital/mz-ui#readme",
  "bugs": {
    "url": "https://github.com/MegazoneDigital/mz-ui/issues"
  }
}
```

### 2.2 엔트리 포인트 설정

```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/style.css"
  },
  "files": ["dist", "README.md"]
}
```

### 2.3 의존성 분리

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
    // ... 기타 개발 의존성들
  }
}
```

### 2.4 빌드 스크립트 설정

```json
{
  "scripts": {
    "build:lib": "tsc && vite build --mode lib",
    "prepublishOnly": "npm run build:lib"
  }
}
```

---

## 3. 빌드 시스템 구성

### 3.1 Vite 설정 (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 라이브러리 빌드 설정
  build:
    mode === 'lib'
      ? {
          lib: {
            entry: resolve(__dirname, 'src/components/index.ts'),
            name: 'MzUI',
            formats: ['es'],
            fileName: 'index',
          },
          rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          },
          cssCodeSplit: false,
        }
      : undefined,
}));
```

---

## 4. TypeScript 설정

### 4.1 tsconfig.json 라이브러리 모드 설정

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "noEmit": false,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationDir": "./dist",
    "outDir": "./dist",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.stories.tsx",
    "**/*.test.ts",
    "**/*.test.tsx",
    ".storybook"
  ]
}
```

---

## 5. 배포 파일 구조

### 5.1 필수 배포 파일들

```
dist/
├── index.js              # 메인 엔트리 (ES 모듈)
├── index.d.ts            # 메인 타입 정의
├── Button.js             # Button 컴포넌트
├── Button.d.ts           # Button 타입 정의
├── cn.js                 # 유틸리티 함수
├── cn.d.ts              # 유틸리티 타입
└── style.css            # CSS 스타일
```

### 5.2 메인 엔트리 파일 (dist/index.js)

```javascript
export { Button, buttonVariants } from './Button.js';
```

### 5.3 타입 정의 파일 (dist/index.d.ts)

```typescript
export { Button, buttonVariants } from './Button.js';
export type { ButtonProps } from './Button.js';
```

### 5.4 컴포넌트 파일 변환 (TypeScript → JavaScript)

원본 TypeScript 컴포넌트를:

- ES 모듈 JavaScript로 변환
- 타입 정의 파일 별도 생성
- 상대 경로 import 수정

---

## 6. Git 설정

### 6.1 .gitignore 업데이트

```gitignore
# 기존 내용들...

# TypeScript build cache
*.tsbuildinfo

# Package build output
dist/

# npm pack files
*.tgz
```

### 6.2 Git 커밋

```bash
git add .
git commit -m "feat: npm package setup for deployment"
git push origin feature/setting
```

---

## 7. 문서화

### 7.1 README.md 작성 필수 섹션

- 패키지 설치 방법
- 필수 의존성 안내
- 기본 사용법
- 컴포넌트 Props API
- Tailwind CSS 설정 가이드
- 라이선스 정보

### 7.2 예제 코드 포함

```jsx
// 설치
npm install @megazonedigital/mz-ui

// 사용
import { Button } from '@megazonedigital/mz-ui';
import '@megazonedigital/mz-ui/styles';

<Button backgroundColor="#ef4444" textColor="white">
  커스텀 버튼
</Button>
```

---

## 8. 로컬 테스트

### 8.1 빌드 테스트

```bash
# 라이브러리 빌드
pnpm run build:lib

# 빌드 결과 확인
ls -la dist/
```

### 8.2 패키지 생성 테스트

```bash
# 로컬 패키지 생성
npm pack

# 생성된 .tgz 파일 확인
ls -la *.tgz
```

### 8.3 배포 시뮬레이션

```bash
# 실제 배포하지 않고 테스트
npm publish --dry-run --access public
```

---

## 9. NPM 배포

### 9.1 NPM 로그인

```bash
# NPM 계정 로그인
npm login

# 로그인 확인
npm whoami
```

### 9.2 실제 배포

```bash
# 스코프 패키지 배포 (public 접근 권한 필요)
npm publish --access public
```

### 9.3 배포 버전 관리

```bash
# 패치 버전 업데이트 (0.1.0 → 0.1.1)
npm version patch

# 마이너 버전 업데이트 (0.1.0 → 0.2.0)
npm version minor

# 메이저 버전 업데이트 (0.1.0 → 1.0.0)
npm version major
```

---

## 10. 배포 후 확인

### 10.1 NPM 웹사이트 확인

- https://www.npmjs.com/package/@megazonedigital/mz-ui
- 패키지 정보, 다운로드 통계 확인

### 10.2 설치 테스트

```bash
# 새 프로젝트에서 설치 테스트
mkdir test-install && cd test-install
npm init -y
npm install @megazonedigital/mz-ui
```

### 10.3 사용 테스트

```jsx
// 간단한 테스트 컴포넌트 작성
import { Button } from '@megazonedigital/mz-ui';
import '@megazonedigital/mz-ui/styles';

function Test() {
  return <Button>테스트 버튼</Button>;
}
```

---

## 🎯 주요 체크리스트

### 배포 전 필수 확인사항

- [ ] `package.json` 메타데이터 정확성
- [ ] 의존성 분리 (dependencies vs peerDependencies)
- [ ] TypeScript 타입 정의 파일 생성
- [ ] 빌드 파일 구조 검증
- [ ] README 문서 완성도
- [ ] 로컬 빌드 및 테스트 성공

### 배포 후 확인사항

- [ ] NPM 웹사이트에서 패키지 확인
- [ ] 새 환경에서 설치 테스트
- [ ] 기본 사용 시나리오 테스트
- [ ] 타입 정의 정상 작동 확인

---

## 🚨 주의사항

1. **스코프 패키지**: `@megazonedigital/mz-ui`는 스코프 패키지이므로 `--access public` 필요
2. **버전 관리**: Semantic Versioning(SemVer) 규칙 준수
3. **의존성**: React를 peerDependencies로 설정하여 중복 설치 방지
4. **빌드 검증**: 배포 전 반드시 로컬에서 빌드 및 테스트 수행
5. **문서화**: 사용법과 예제를 명확히 문서화하여 사용자 편의성 향상

---

이 가이드를 따라하면 안정적이고 전문적인 React UI 컴포넌트 라이브러리를 npm에 성공적으로 배포할 수 있습니다! 🎉
