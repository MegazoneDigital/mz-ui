# NPM 배포 가이드

## 📦 배포 준비

### 1. 사전 체크리스트

```bash
# 1. 의존성 최신화
pnpm install

# 2. 린트 검사
pnpm lint

# 3. 타입 체크
pnpm type-check

# 4. 테스트 실행 (선택)
pnpm test

# 5. 빌드 테스트
pnpm build

# 6. 빌드 결과 확인
ls -lh dist/
```

### 2. package.json 확인

배포 전 다음 항목들을 확인하세요:

- `name`: `@mz-ui/core` (또는 원하는 스코프 이름)
- `version`: 올바른 버전 번호
- `description`: 패키지 설명
- `author`: 작성자 정보
- `repository`: Git 저장소 URL
- `license`: 라이선스 (MIT)

## 🚀 NPM 배포 프로세스

### Step 1: NPM 계정 준비

```bash
# NPM 계정이 없다면 생성
# https://www.npmjs.com/signup

# NPM 로그인
npm login
```

로그인 시 입력 항목:
- Username
- Password
- Email
- OTP (2FA 활성화 시)

### Step 2: 버전 업데이트

**Semantic Versioning 규칙:**

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

`pnpm version` 명령어는:
- `package.json`의 버전 업데이트
- Git 커밋 생성 (`v1.0.0` 형식)
- Git 태그 생성

### Step 3: 배포

```bash
# 배포 (prepublishOnly로 자동 빌드)
npm publish --access public

# Scoped 패키지는 기본적으로 private이므로
# --access public 옵션 필수
```

### Step 4: Git Push

```bash
# 코드 푸시
git push origin develop

# 태그 푸시
git push --tags
```

### Step 5: 배포 확인

```bash
# NPM에서 패키지 정보 확인
npm view @mz-ui/core

# 버전 목록
npm view @mz-ui/core versions

# 다운로드 통계
npm view @mz-ui/core downloads
```

## 🔄 베타 버전 배포

개발 중이거나 테스트가 필요한 경우:

```bash
# 베타 버전 생성
pnpm version prerelease --preid=beta
# 예: 0.1.0 → 0.1.1-beta.0

# 베타 태그로 배포
npm publish --tag beta --access public

# 베타 버전 설치
npm install @mz-ui/core@beta
```

## 📝 배포 워크플로우 예시

```bash
# 1. 기능 개발 완료
git checkout develop
git add .
git commit -m "feat: 새 컴포넌트 추가"

# 2. 버전 업데이트
pnpm version minor
# → package.json 버전 업데이트 (0.1.0 → 0.2.0)
# → Git 커밋 및 태그 생성 (v0.2.0)

# 3. 빌드 확인 (prepublishOnly로 자동 실행되지만 미리 확인)
pnpm build

# 4. NPM 배포
npm publish --access public

# 5. Git 푸시
git push origin develop
git push --tags

# 6. GitHub Release 생성 (선택)
# https://github.com/MegazoneDigital/mz-ui/releases/new
```

## 🔐 보안 권장사항

### 2FA (Two-Factor Authentication) 설정

```bash
npm profile enable-2fa auth-and-writes
```

### NPM Token 관리

CI/CD 사용 시:

1. NPM 웹사이트에서 Automation Token 생성
   - https://www.npmjs.com/settings/~/tokens
2. GitHub Secrets에 `NPM_TOKEN` 등록
3. GitHub Actions에서 사용

## ⚠️ 주의사항

### 1. 배포 전 확인사항

- [ ] 빌드 에러 없음
- [ ] 린트 에러 없음
- [ ] 타입 체크 통과
- [ ] README.md 업데이트
- [ ] CHANGELOG.md 작성 (선택)
- [ ] 버전 번호 확인

### 2. 배포 후 확인사항

- [ ] npm view로 배포 확인
- [ ] 테스트 프로젝트에서 설치 테스트
- [ ] 타입 정의 파일 제대로 로드되는지 확인
- [ ] CSS 파일 정상 import 되는지 확인

### 3. 배포 철회 (72시간 이내만 가능)

```bash
# 특정 버전 철회
npm unpublish @mz-ui/core@0.1.0

# ⚠️ 전체 패키지 철회 (신중하게!)
npm unpublish @mz-ui/core --force
```

## 🤖 CI/CD 자동화

### GitHub Actions 워크플로우

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
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

      - name: Build
        run: pnpm build

      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

### 자동 배포 트리거

```bash
# 로컬에서 버전 업데이트 및 태그 푸시
pnpm version minor
git push origin develop
git push --tags
# → GitHub Actions 자동 실행 → NPM 배포
```

## 📊 배포 후 모니터링

### NPM 다운로드 통계

```bash
# 지난 주 다운로드
npm view @mz-ui/core downloads

# 특정 기간 통계
# https://npm-stat.com/charts.html?package=@mz-ui/core
```

### 버전별 사용 현황

```bash
# 모든 버전 목록
npm view @mz-ui/core versions

# 최신 버전
npm view @mz-ui/core version

# dist-tags
npm view @mz-ui/core dist-tags
```

## 🔧 문제 해결

### "403 Forbidden" 에러

```bash
# 로그인 확인
npm whoami

# 재로그인
npm logout
npm login

# 패키지 이름 중복 확인
npm search @mz-ui/core
```

### "ENEEDAUTH" 에러

인증 토큰 문제:

```bash
npm logout
npm login
```

### 빌드 파일 누락

`.npmignore` 확인 또는 `package.json`의 `files` 필드 확인:

```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

## 📚 참고 자료

- [NPM Publishing Guide](https://docs.npmjs.com/cli/v10/using-npm/developers)
- [Semantic Versioning](https://semver.org/)
- [NPM 2FA](https://docs.npmjs.com/about-two-factor-authentication)

