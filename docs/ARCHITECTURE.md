# 아키텍처

## 모노레포 구조

```
mz-ui/
├── apps/
│   └── storybook/          # 문서 사이트 (private)
├── packages/
│   └── core/               # @mz-ui/core (배포)
└── tooling/
    ├── eslint-config/      # 공통 ESLint (private)
    ├── prettier-config/    # 공통 Prettier (private)
    └── typescript-config/  # 공통 TypeScript (private)
```

## 도구

- **Turborepo** - 빌드 캐싱
- **Changesets** - 버전 관리
- **pnpm Workspaces** - 패키지 관리

## 설계 원칙

1. **단일 책임** - 각 패키지는 명확한 목적
2. **선택적 설치** - 필요한 패키지만
3. **타입 안전성** - TypeScript
4. **트리 쉐이킹** - Named exports

## 빌드 전략

- **UI 컴포넌트**: Vite (ESM + CJS + CSS)
- **Hooks/Utils**: tsup (ESM only)

## 의존성

```json
{
  "peerDependencies": {
    "react": ">=18.0.0 <19.0.0"
  },
  "devDependencies": {
    "eslint-config": "workspace:*"
  }
}
```

## 참고

- [Turborepo](https://turbo.build/repo/docs)
- [Changesets](https://github.com/changesets/changesets)
