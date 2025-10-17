# Contributing to @mz-ui/core

## 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/MegazoneDigital/mz-ui.git
cd mz-ui

# 의존성 설치
pnpm install

# core 패키지로 이동
cd packages/core

# 개발 모드 실행
pnpm dev
```

## 컴포넌트 추가

### 1. shadcn CLI 사용 (권장)

```bash
cd packages/core
npx shadcn@latest add [component-name]
```

### 2. 수동 작성

1. `src/components/YourComponent.tsx` 생성
2. `src/components/YourComponent.stories.tsx` 생성
3. `src/components/index.ts`에 export 추가

## 코드 스타일

- ESLint + Prettier 자동 적용
- TypeScript strict 모드
- React functional components + hooks
- forwardRef 사용 권장

## 커밋 메시지

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 추가
chore: 빌드/설정 변경
```

## Pull Request

1. feature 브랜치 생성
2. 변경사항 커밋
3. PR 생성
4. 리뷰 대기

## 릴리스

```bash
# changeset 추가
pnpm changeset

# 버전 업데이트
pnpm changeset version

# 배포
pnpm release
```
