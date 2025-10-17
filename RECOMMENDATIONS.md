# 권장 라이브러리

BO 프로젝트에 유용한 라이브러리 목록입니다.

## 필수 라이브러리

### 1. TanStack Table ⭐⭐⭐⭐⭐

```bash
pnpm add @tanstack/react-table
```

- 데이터 테이블/그리드
- 가상 스크롤 (10만+ 행)
- 정렬/필터/페이징

https://tanstack.com/table/latest

### 2. React Hook Form ⭐⭐⭐⭐⭐

```bash
pnpm add react-hook-form
```

- 폼 관리
- 최고의 성능
- Zod/Yup 통합

https://react-hook-form.com/

### 3. Recharts ⭐⭐⭐⭐⭐

```bash
pnpm add recharts
```

- 차트/대시보드
- React 네이티브
- 선언적 API

https://recharts.org/

### 4. TanStack Query ⭐⭐⭐⭐⭐

```bash
pnpm add @tanstack/react-query
```

- 서버 상태 관리
- 자동 캐싱
- 자동 리페칭

https://tanstack.com/query/latest

### 5. Zustand ⭐⭐⭐⭐

```bash
pnpm add zustand
```

- 클라이언트 상태 관리
- 간단한 API
- 1KB

https://github.com/pmndrs/zustand

### 6. React Day Picker ⭐⭐⭐⭐

```bash
pnpm add react-day-picker date-fns
```

- 날짜 선택기
- 가벼움 (23KB)
- 접근성 우수

https://react-day-picker.js.org/

### 7. Sonner ⭐⭐⭐⭐

```bash
pnpm add sonner
```

- Toast 알림
- Promise 지원
- shadcn/ui 스타일

https://sonner.emilkowal.ski/

### 8. dnd kit ⭐⭐⭐⭐

```bash
pnpm add @dnd-kit/core @dnd-kit/sortable
```

- 드래그 앤 드롭
- 접근성 우수
- 터치 지원

https://dndkit.com/

## 선택적 라이브러리

### 차트

- **Apache ECharts** - 3D, 다양한 차트
- **Chart.js** - 간단한 API

### 에디터

- **Tiptap** - Rich Text 에디터
- **Monaco Editor** - 코드 에디터

### 파일

- **React Dropzone** - 파일 업로드

## 향후 패키지

### @mz-ui/data-grid

```tsx
import { DataGrid } from '@mz-ui/data-grid';
<DataGrid data={data} columns={columns} />;
```

### @mz-ui/charts

```tsx
import { LineChart } from '@mz-ui/charts';
<LineChart data={data} xKey="date" yKey="value" />;
```

### @mz-ui/hooks

```tsx
import { useDebounce, useLocalStorage } from '@mz-ui/hooks';
```

## 학습 리소스

- [React 18](https://react.dev/)
- [TypeScript](https://www.totaltypescript.com/)
- [Turborepo](https://turbo.build/repo/docs)
