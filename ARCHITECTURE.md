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

## 도구 선택

### Turborepo

- 빠른 빌드 (캐싱)
- 간단한 설정
- 병렬 실행

### Changesets

- 자동 CHANGELOG
- Semantic versioning
- 의존성 자동 업데이트

### pnpm Workspaces

- 디스크 효율성
- workspace 프로토콜
- Turborepo 최적화

## 패키지 설계 원칙

1. **단일 책임** - 각 패키지는 명확한 하나의 목적
2. **선택적 설치** - 필요한 패키지만 설치
3. **타입 안전성** - TypeScript 완벽 지원
4. **트리 쉐이킹** - Named exports

## 빌드 전략

### UI 컴포넌트

- Vite (CSS 번들링)
- Output: ESM + CJS + CSS

### Hooks/Utils

- tsup (빠르고 간단)
- Output: ESM only

## Turborepo 캐싱

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

- `build`: 캐시 활성화
- `dev`: 캐시 비활성화

## 의존성 관리

### Peer Dependencies

```json
{
  "peerDependencies": {
    "react": ">=18.0.0 <19.0.0"
  }
}
```

### Workspace 프로토콜

```json
{
  "devDependencies": {
    "eslint-config": "workspace:*"
  }
}
```

## 버전 관리

- **Major (1.0.0)**: Breaking changes
- **Minor (0.1.0)**: 새 기능
- **Patch (0.0.1)**: 버그 수정

각 패키지는 독립적으로 버전 관리됩니다.

## 확장 가이드

### 새 패키지 체크리스트

- [ ] `packages/` 디렉토리에 생성
- [ ] `package.json` 작성
- [ ] `tsconfig.json` 상속
- [ ] `eslint.config.js` 사용
- [ ] README.md 작성
- [ ] Storybook stories 작성

## 참고

- [Turborepo Handbook](https://turbo.build/repo/docs/handbook)
- [Changesets](https://github.com/changesets/changesets)
- [pnpm Workspaces](https://pnpm.io/workspaces)
