#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('🚀 수동 라이브러리 빌드 시작...');

// dist 폴더 생성
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// cn.js 생성
const cnContent = `import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}`;
fs.writeFileSync(path.join(distDir, 'cn.js'), cnContent);

// cn.d.ts 생성
const cnDtsContent = `import type { ClassValue } from 'clsx';
export declare function cn(...inputs: ClassValue[]): string;`;
fs.writeFileSync(path.join(distDir, 'cn.d.ts'), cnDtsContent);

// Button.js 생성 (JSX 없이)
const buttonContent = `import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from './cn.js';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef((props, ref) => {
  const {
    className,
    variant,
    size,
    asChild = false,
    backgroundColor,
    textColor,
    style,
    ...otherProps
  } = props;

  const Comp = asChild ? Slot : 'button';
  
  const customStyle = {
    ...style,
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
  };

  return React.createElement(Comp, {
    className: cn(buttonVariants({ variant, size, className })),
    style: customStyle,
    ref,
    ...otherProps
  });
});

Button.displayName = 'Button';

export { Button, buttonVariants };`;
fs.writeFileSync(path.join(distDir, 'Button.js'), buttonContent);

// Button.d.ts 생성
const buttonDtsContent = `import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';

declare const buttonVariants: (props?: {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
} & Record<string, any>) => string;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export { Button, buttonVariants };
export type { ButtonProps };`;
fs.writeFileSync(path.join(distDir, 'Button.d.ts'), buttonDtsContent);

// index.js 생성
const indexContent = `export { Button, buttonVariants } from './Button.js';
export { cn } from './cn.js';`;
fs.writeFileSync(path.join(distDir, 'index.js'), indexContent);

// index.d.ts 생성
const indexDtsContent = `export { Button, buttonVariants } from './Button';
export type { ButtonProps } from './Button';
export { cn } from './cn';`;
fs.writeFileSync(path.join(distDir, 'index.d.ts'), indexDtsContent);

// style.css 생성 (Tailwind CSS 빌드)
console.log('📦 Tailwind CSS 빌드 중...');
try {
  // 임시 build CSS 파일 생성
  const tempCssPath = path.join(rootDir, 'temp-build.css');
  const buildCssContent = `@import 'tailwindcss';

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    border-color: hsl(var(--border));
  }
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }
}

@layer utilities {
  .bg-background { background-color: hsl(var(--background)); }
  .bg-foreground { background-color: hsl(var(--foreground)); }
  .bg-card { background-color: hsl(var(--card)); }
  .bg-card-foreground { background-color: hsl(var(--card-foreground)); }
  .bg-popover { background-color: hsl(var(--popover)); }
  .bg-popover-foreground { background-color: hsl(var(--popover-foreground)); }
  .bg-primary { background-color: hsl(var(--primary)); }
  .bg-primary-foreground { background-color: hsl(var(--primary-foreground)); }
  .bg-secondary { background-color: hsl(var(--secondary)); }
  .bg-secondary-foreground { background-color: hsl(var(--secondary-foreground)); }
  .bg-muted { background-color: hsl(var(--muted)); }
  .bg-muted-foreground { background-color: hsl(var(--muted-foreground)); }
  .bg-accent { background-color: hsl(var(--accent)); }
  .bg-accent-foreground { background-color: hsl(var(--accent-foreground)); }
  .bg-destructive { background-color: hsl(var(--destructive)); }
  .bg-destructive-foreground { background-color: hsl(var(--destructive-foreground)); }
  .bg-border { background-color: hsl(var(--border)); }
  .bg-input { background-color: hsl(var(--input)); }
  .bg-ring { background-color: hsl(var(--ring)); }

  .text-background { color: hsl(var(--background)); }
  .text-foreground { color: hsl(var(--foreground)); }
  .text-card { color: hsl(var(--card)); }
  .text-card-foreground { color: hsl(var(--card-foreground)); }
  .text-popover { color: hsl(var(--popover)); }
  .text-popover-foreground { color: hsl(var(--popover-foreground)); }
  .text-primary { color: hsl(var(--primary)); }
  .text-primary-foreground { color: hsl(var(--primary-foreground)); }
  .text-secondary { color: hsl(var(--secondary)); }
  .text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
  .text-muted { color: hsl(var(--muted)); }
  .text-muted-foreground { color: hsl(var(--muted-foreground)); }
  .text-accent { color: hsl(var(--accent)); }
  .text-accent-foreground { color: hsl(var(--accent-foreground)); }
  .text-destructive { color: hsl(var(--destructive)); }
  .text-destructive-foreground { color: hsl(var(--destructive-foreground)); }
  .text-border { color: hsl(var(--border)); }
  .text-input { color: hsl(var(--input)); }
  .text-ring { color: hsl(var(--ring)); }

  .border-border { border-color: hsl(var(--border)); }
  .border-input { border-color: hsl(var(--input)); }
  .border-ring { border-color: hsl(var(--ring)); }

  .ring-ring { --tw-ring-color: hsl(var(--ring)); }
  .ring-offset-background { --tw-ring-offset-color: hsl(var(--background)); }
}

/* Button 컴포넌트에서 사용되는 클래스들을 강제로 포함 */
.test-include {
  /* Base styles */
  @apply inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium;
  @apply ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2;
  @apply disabled:pointer-events-none disabled:opacity-50;
  
  /* Variants */
  @apply bg-primary text-primary-foreground hover:bg-primary/90;
  @apply bg-destructive text-destructive-foreground hover:bg-destructive/90;
  @apply border border-input bg-background hover:bg-accent hover:text-accent-foreground;
  @apply bg-secondary text-secondary-foreground hover:bg-secondary/80;
  @apply hover:bg-accent hover:text-accent-foreground;
  @apply text-primary underline-offset-4 hover:underline;
  
  /* Sizes */
  @apply h-10 px-4 py-2;
  @apply h-9 rounded-md px-3;
  @apply h-11 rounded-md px-8;
  @apply h-10 w-10;
}`;

  fs.writeFileSync(tempCssPath, buildCssContent);

  // 임시 tailwind config 생성
  const tempConfigPath = path.join(rootDir, 'temp-tailwind.config.js');
  const configContent = `export default {
  content: ['./dist/Button.js', './scripts/build-manual.js'],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
  fs.writeFileSync(tempConfigPath, configContent);

  // Tailwind CSS 빌드 실행
  const distCssPath = path.join(distDir, 'style.css');
  execSync(
    `npx tailwindcss -i ${tempCssPath} -o ${distCssPath} --config ${tempConfigPath}`,
    {
      cwd: rootDir,
      stdio: 'inherit',
    }
  );

  // 임시 파일들 정리
  fs.unlinkSync(tempCssPath);
  fs.unlinkSync(tempConfigPath);

  console.log('✅ Tailwind CSS 빌드 완료!');
} catch (error) {
  console.error('❌ Tailwind CSS 빌드 실패:', error.message);
  console.log('📦 하드코딩된 CSS 사용...');
}

// Tailwind CLI 실패시 또는 항상 하드코딩된 CSS 사용
const fullCss = `:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
  --radius: 0.5rem;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
  --chart-1: 220 70% 50%;
  --chart-2: 160 60% 45%;
  --chart-3: 30 80% 55%;
  --chart-4: 280 65% 60%;
  --chart-5: 340 75% 55%;
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Tailwind CSS 기본 리셋 및 유틸리티 */
.inline-flex { display: inline-flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.gap-2 { gap: 0.5rem; }
.whitespace-nowrap { white-space: nowrap; }
.rounded-md { border-radius: calc(var(--radius) - 2px); }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.font-medium { font-weight: 500; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.focus-visible\\:outline-none:focus-visible { outline: 2px solid transparent; outline-offset: 2px; }
.focus-visible\\:ring-2:focus-visible { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
.focus-visible\\:ring-ring:focus-visible { --tw-ring-color: hsl(var(--ring)); }
.focus-visible\\:ring-offset-2:focus-visible { --tw-ring-offset-width: 2px; }
.disabled\\:pointer-events-none:disabled { pointer-events: none; }
.disabled\\:opacity-50:disabled { opacity: 0.5; }

/* Button 색상 변형 */
.bg-primary { background-color: hsl(var(--primary)); }
.text-primary-foreground { color: hsl(var(--primary-foreground)); }
.hover\\:bg-primary\\/90:hover { background-color: hsl(var(--primary) / 0.9); }

.bg-destructive { background-color: hsl(var(--destructive)); }
.text-destructive-foreground { color: hsl(var(--destructive-foreground)); }
.hover\\:bg-destructive\\/90:hover { background-color: hsl(var(--destructive) / 0.9); }

.border { border-width: 1px; }
.border-input { border-color: hsl(var(--input)); }
.bg-background { background-color: hsl(var(--background)); }
.hover\\:bg-accent:hover { background-color: hsl(var(--accent)); }
.hover\\:text-accent-foreground:hover { color: hsl(var(--accent-foreground)); }

.bg-secondary { background-color: hsl(var(--secondary)); }
.text-secondary-foreground { color: hsl(var(--secondary-foreground)); }
.hover\\:bg-secondary\\/80:hover { background-color: hsl(var(--secondary) / 0.8); }

.text-primary { color: hsl(var(--primary)); }
.underline-offset-4 { text-underline-offset: 4px; }
.hover\\:underline:hover { text-decoration-line: underline; }

/* Button 크기 변형 */
.h-10 { height: 2.5rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }

.h-9 { height: 2.25rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }

.h-11 { height: 2.75rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }

.w-10 { width: 2.5rem; }

/* Ring 효과 */
.ring-offset-background { --tw-ring-offset-color: hsl(var(--background)); }
.ring-ring { --tw-ring-color: hsl(var(--ring)); }

/* 추가 유틸리티 */
.bg-accent { background-color: hsl(var(--accent)); }
.text-accent-foreground { color: hsl(var(--accent-foreground)); }
.text-foreground { color: hsl(var(--foreground)); }
.bg-foreground { background-color: hsl(var(--foreground)); }
.bg-card { background-color: hsl(var(--card)); }
.text-card-foreground { color: hsl(var(--card-foreground)); }
.bg-popover { background-color: hsl(var(--popover)); }
.text-popover-foreground { color: hsl(var(--popover-foreground)); }
.bg-muted { background-color: hsl(var(--muted)); }
.text-muted-foreground { color: hsl(var(--muted-foreground)); }
.border-border { border-color: hsl(var(--border)); }
.border-ring { border-color: hsl(var(--ring)); }`;

fs.writeFileSync(path.join(distDir, 'style.css'), fullCss);

// README.md 복사 (dist 폴더와 루트 폴더 둘 다)
const readmePath = path.join(__dirname, '..', 'dist-README.md');
const distReadmePath = path.join(distDir, 'README.md');
const rootReadmePath = path.join(rootDir, 'README.md');
if (fs.existsSync(readmePath)) {
  fs.copyFileSync(readmePath, distReadmePath);
  fs.copyFileSync(readmePath, rootReadmePath); // 루트에도 복사
}

console.log('✅ 라이브러리 빌드 완료!');
console.log('📁 생성된 파일들:');
console.log('  - index.js (메인 엔트리)');
console.log('  - index.d.ts (타입 정의)');
console.log('  - Button.js (컴포넌트)');
console.log('  - Button.d.ts (타입 정의)');
console.log('  - cn.js (유틸리티)');
console.log('  - cn.d.ts (타입 정의)');
console.log('  - style.css (스타일)');
console.log('  - README.md (dist + 루트 복사)');

export default {};
