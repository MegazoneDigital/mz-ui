# mz-ui-shadcn-components

🚀 **현대적인 React UI 컴포넌트 라이브러리**

Shadcn UI, TypeScript, Tailwind CSS를 기반으로 구축된 고품질 UI 컴포넌트 라이브러리입니다.

## 빠른 시작

### 1. 설치

```bash
npm install mz-ui-shadcn-components
# 또는
pnpm add mz-ui-shadcn-components
# 또는
yarn add mz-ui-shadcn-components
```

### 2. 필수 의존성 설치

```bash
npm install react react-dom @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

### 3. CSS 스타일 가져오기

```javascript
// main.tsx 또는 App.tsx에서
import 'mz-ui-shadcn-components/dist/style.css';
```

### 4. 컴포넌트 사용

```jsx
import { Button } from 'mz-ui-shadcn-components';

function App() {
  return (
    <div>
      {/* 기본 버튼 */}
      <Button>클릭하세요</Button>

      {/* 커스텀 색상 버튼 */}
      <Button backgroundColor="#ef4444" textColor="white">
        빨간 버튼
      </Button>

      {/* 그라디언트 버튼 */}
      <Button
        backgroundColor="linear-gradient(45deg, #ff6b6b, #ffd93d)"
        textColor="white"
      >
        그라디언트 버튼
      </Button>
    </div>
  );
}
```

## 🎯 주요 기능

### ✨ Button 컴포넌트

**기본 변형:**

- `default` - 기본 스타일
- `secondary` - 보조 스타일
- `destructive` - 삭제/경고 스타일
- `outline` - 외곽선 스타일
- `ghost` - 투명 배경 스타일
- `link` - 링크 스타일

**크기:**

- `sm` - 작은 크기
- `default` - 기본 크기
- `lg` - 큰 크기
- `icon` - 아이콘 전용

**커스텀 색상:**

- `backgroundColor` - 배경색 지정
- `textColor` - 텍스트 색상 지정

### 📘 사용 예시

```jsx
import { Button } from 'mz-ui-shadcn-components';
import { Download, Heart, Star } from 'lucide-react'; // 아이콘 라이브러리

function ButtonExamples() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* 기본 변형들 */}
      <Button variant="default">기본</Button>
      <Button variant="secondary">보조</Button>
      <Button variant="destructive">삭제</Button>
      <Button variant="outline">외곽선</Button>
      <Button variant="ghost">고스트</Button>
      <Button variant="link">링크</Button>

      {/* 다양한 크기 */}
      <Button size="sm">작음</Button>
      <Button size="default">기본</Button>
      <Button size="lg">큼</Button>
      <Button size="icon">
        <Star />
      </Button>

      {/* 커스텀 색상들 */}
      <Button backgroundColor="#ef4444" textColor="white">
        빨간색
      </Button>
      <Button backgroundColor="#3b82f6" textColor="white">
        파란색
      </Button>
      <Button backgroundColor="#10b981" textColor="white">
        초록색
      </Button>

      {/* 그라디언트 */}
      <Button
        backgroundColor="linear-gradient(135deg, #667eea, #764ba2)"
        textColor="white"
      >
        보라 그라디언트
      </Button>

      {/* 아이콘과 함께 */}
      <Button backgroundColor="#dc2626" textColor="white">
        <Heart className="mr-2" />
        좋아요
      </Button>

      <Button backgroundColor="#059669" textColor="white">
        <Download className="mr-2" />
        다운로드
      </Button>
    </div>
  );
}
```

## 🎨 Tailwind CSS 설정 (선택사항)

프로젝트에서 Tailwind CSS를 사용한다면 `tailwind.config.js`에 추가:

```javascript
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/mz-ui-shadcn-components/dist/**/*.{js,ts,jsx,tsx}', // 추가
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
```

## 📋 Button Props

| Prop              | Type                                                                          | Default     | Description                                      |
| ----------------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------------------------ |
| `variant`         | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` | 버튼의 변형 스타일                               |
| `size`            | `"default" \| "sm" \| "lg" \| "icon"`                                         | `"default"` | 버튼의 크기                                      |
| `asChild`         | `boolean`                                                                     | `false`     | 기본 렌더링 요소를 자식으로 전달된 요소로 변경   |
| `backgroundColor` | `string`                                                                      | -           | 사용자 정의 배경색 (CSS 색상값, 그라디언트 지원) |
| `textColor`       | `string`                                                                      | -           | 사용자 정의 텍스트 색상                          |
| `disabled`        | `boolean`                                                                     | `false`     | 버튼 비활성화                                    |

모든 표준 HTML `button` 속성들도 지원됩니다.

## 🔗 유틸리티

### cn 함수

클래스명을 조건부로 병합하는 유틸리티:

```jsx
import { cn } from 'mz-ui-shadcn-components';

// 사용 예시
const className = cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

## 💡 팁

1. **아이콘 라이브러리**: [Lucide React](https://lucide.dev/) 추천
2. **다크모드**: CSS 변수로 자동 지원
3. **접근성**: 모든 컴포넌트는 웹 접근성 표준 준수
4. **TypeScript**: 완전한 타입 지원

## 🐛 문제 해결

### CSS 스타일이 적용되지 않는 경우

```javascript
// CSS 파일을 제대로 import했는지 확인
import 'mz-ui-shadcn-components/dist/style.css';
```

### TypeScript 에러가 발생하는 경우

```bash
# 필수 의존성이 설치되어 있는지 확인
npm list react react-dom @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

## 📦 패키지 정보

- **Version**: 0.1.6
- **License**: MIT
- **Repository**: [GitHub](https://github.com/MegazoneDigital/mz-ui)
- **Homepage**: [NPM](https://www.npmjs.com/package/mz-ui-shadcn-components)

## 🙋‍♂️ 지원

문제가 있거나 새로운 기능을 제안하고 싶다면:

- [GitHub Issues](https://github.com/MegazoneDigital/mz-ui/issues)
- [GitHub Discussions](https://github.com/MegazoneDigital/mz-ui/discussions)

---

**Made with ❤️ by MegazoneDigital**
