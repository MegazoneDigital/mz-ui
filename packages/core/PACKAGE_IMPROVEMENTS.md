# @mz-ui/core 패키지 개선 사항

## 완료된 개선 사항

### 1. package.json 메타데이터 강화

#### 추가된 필드

- **keywords**: npm 검색 최적화를 위한 키워드 추가
  - react, ui, components, design-system, tailwindcss, shadcn, mz-ui, megazone
- **repository**: 모노레포 내 패키지 경로 명시
- **bugs**: 이슈 트래킹 URL
- **homepage**: 패키지 홈페이지 URL
- **engines**: Node.js 버전 요구사항 (>=18.0.0)

#### 개선된 설정

- **sideEffects**: CSS 파일을 side effects로 명시하여 tree-shaking 최적화
- **publishConfig**: 공개 접근 및 레지스트리 명시적 설정
- **exports**: `./package.json` export 추가로 패키지 메타데이터 접근 가능
- **prepublishOnly**: 배포 전 자동 빌드 스크립트

### 2. 배포 파일 관리

#### 추가된 파일

- **LICENSE**: MIT 라이센스 파일 (루트에서 복사)
- **CHANGELOG.md**: 버전별 변경 이력
- **.npmignore**: 불필요한 파일 배포 방지
  - 소스 파일, 설정 파일, 개발 도구 제외
  - dist, README.md, LICENSE, CHANGELOG.md만 포함
- **.npmrc**: npm 설정 (engine-strict, package-lock=false)

#### files 필드 업데이트

```json
"files": [
  "dist",
  "README.md",
  "LICENSE",
  "CHANGELOG.md"
]
```

### 3. TypeScript 설정 개선

- **declarationMap**: true - 소스맵 생성으로 디버깅 개선
- **declaration**: true - 타입 정의 파일 명시적 생성
- **exclude**: spec 파일 제외 추가

### 4. Vite 빌드 설정 개선

- **preserveModules**: false - 단일 번들 생성
- **exports**: 'named' - named exports 명시
- **minify**: false - 가독성 유지 (필요시 활성화 가능)
- **target**: 'es2020' - 현대 브라우저 타겟

### 5. README.md 개선

#### 추가된 내용

- npm badges (version, downloads, license)
- 특징 섹션 (React 18+, TypeScript, Tree-shakeable 등)
- 더 명확한 설치 및 사용 가이드

### 6. 문서화 강화

새로 추가된 문서:

- **CONTRIBUTING.md**: 기여 가이드
- **DEPLOYMENT.md**: 배포 프로세스 상세 가이드
- **PACKAGE_IMPROVEMENTS.md**: 이 문서

## 배포 전후 비교

### Before

```
패키지 크기: 91.1 kB
파일 수: 15개
- 기본적인 빌드 파일만 포함
- 메타데이터 부족
- 문서 부족
```

### After

```
패키지 크기: 95.4 kB (+4.3 kB)
파일 수: 17개
- LICENSE, CHANGELOG.md 추가
- 향상된 메타데이터
- 완전한 문서화
- tree-shaking 최적화
- 개선된 타입 지원
```

## 개선 효과

### 개발자 경험

- ✅ 명확한 버전 히스토리 (CHANGELOG.md)
- ✅ 라이센스 명시 (LICENSE)
- ✅ 더 나은 타입 지원 (declarationMap)
- ✅ 포괄적인 문서

### 패키지 품질

- ✅ npm 검색 최적화 (keywords)
- ✅ tree-shaking 최적화 (sideEffects)
- ✅ 명확한 exports 구조
- ✅ 배포 전 자동 빌드 (prepublishOnly)

### 유지보수성

- ✅ 체계적인 버전 관리
- ✅ 명확한 배포 프로세스
- ✅ 기여 가이드라인
- ✅ 불필요한 파일 제외

## 다음 단계 제안

### 단기

1. GitHub Actions CI/CD 설정
2. 테스트 프레임워크 추가 (Vitest)
3. 더 많은 컴포넌트 추가
4. Storybook 문서 강화

### 중기

1. 접근성 테스트 자동화
2. 비주얼 리그레션 테스트
3. 성능 벤치마크
4. 컴포넌트 variants 확장

### 장기

1. 다국어 지원
2. 테마 커스터마이징 시스템
3. CLI 도구 개발
4. 프리셋 패키지

## 참고 자료

- [npm package.json 공식 문서](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [TypeScript 설정 가이드](https://www.typescriptlang.org/tsconfig)
- [Vite 라이브러리 모드](https://vitejs.dev/guide/build.html#library-mode)
- [Changesets 사용법](https://github.com/changesets/changesets)
