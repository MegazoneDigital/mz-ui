# Storybook App

MZ UI 디자인 시스템 문서 및 컴포넌트 개발 환경

## 개발 서버 실행

```bash
pnpm dev
```

→ http://localhost:6006 에서 확인

## 빌드

정적 사이트로 빌드:

```bash
pnpm build
```

빌드 결과물: `storybook-static/`

## 구조

```
apps/storybook/
├── .storybook/
│   ├── main.ts       # Storybook 메인 설정
│   └── preview.ts    # 전역 데코레이터 및 스타일
└── package.json
```

## 스토리 작성

스토리는 각 패키지에 함께 작성합니다:

```
packages/core/src/components/
├── Button.tsx
└── Button.stories.tsx   # 여기에 스토리 작성
```

Storybook이 자동으로 감지하여 표시합니다.

## 참고

- [Storybook 공식 문서](https://storybook.js.org/docs)
- [개발 가이드](../../DEVELOPER.md)
