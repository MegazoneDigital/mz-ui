# 배포 가이드

## 사전 준비

### 1. npm 로그인 확인

```bash
npm whoami
```

로그인되지 않았다면:

```bash
npm login
```

### 2. 빌드 테스트

```bash
pnpm build
```

### 3. 배포 미리보기

```bash
npm pack --dry-run
```

## 배포 프로세스

### 방법 1: Changesets 사용 (권장)

```bash
# 1. 변경사항 기록
pnpm changeset

# 2. 버전 업데이트
pnpm changeset version

# 3. 빌드 및 배포
pnpm release
```

### 방법 2: 수동 배포

```bash
# 1. 버전 업데이트
npm version patch  # 0.1.3 -> 0.1.4
# 또는
npm version minor  # 0.1.3 -> 0.2.0
# 또는
npm version major  # 0.1.3 -> 1.0.0

# 2. 빌드
pnpm build

# 3. 배포
npm publish
```

## 배포 체크리스트

- [ ] 모든 테스트 통과
- [ ] 린트 오류 없음
- [ ] CHANGELOG.md 업데이트
- [ ] 버전 번호 확인
- [ ] 빌드 성공 확인
- [ ] npm pack --dry-run으로 패키지 내용 확인
- [ ] README.md 최신화

## 배포 후 확인

```bash
# npm에서 확인
npm view @mz-ui/core

# 최신 버전 설치 테스트
npm install @mz-ui/core@latest

# 버전 확인
npm view @mz-ui/core versions
```

## 트러블슈팅

### 403 Forbidden 오류

- 이미 배포된 버전: 버전 업데이트 필요
- 권한 없음: npm 계정 확인

### 빌드 오류

```bash
pnpm clean
pnpm install
pnpm build
```

### 파일 누락

- `package.json`의 `files` 필드 확인
- `.npmignore` 확인
- `npm pack --dry-run`으로 검증

## 버전 관리 전략

- **patch** (0.1.x): 버그 수정, 작은 개선
- **minor** (0.x.0): 새 기능 추가 (하위 호환)
- **major** (x.0.0): Breaking changes

## 자동화 (향후)

GitHub Actions를 통한 자동 배포:

- PR 머지 시 자동 버전 업데이트
- changeset 기반 자동 배포
- 릴리스 노트 자동 생성
