# Tooling

공통 설정 패키지들

## 패키지

### eslint-config

ESLint + Prettier 통합 설정

```js
import baseConfig from 'eslint-config';
export default [...baseConfig];
```

이 설정은:

- ESLint 룰 적용
- Prettier 포맷팅 자동 적용 (`eslint --fix` 시)
- React Hooks, TypeScript 등의 규칙 포함

### typescript-config

공통 TypeScript 설정

```json
{
  "extends": "typescript-config/react.json"
}
```

## 사용법

모든 패키지에서 workspace 프로토콜로 참조:

```json
{
  "devDependencies": {
    "eslint-config": "workspace:*",
    "typescript-config": "workspace:*"
  }
}
```

## 코드 포맷팅

`eslint . --fix` 실행 시:

1. ESLint 룰 검사 및 자동 수정
2. Prettier 포맷팅 자동 적용

별도의 `prettier --write` 명령 불필요
