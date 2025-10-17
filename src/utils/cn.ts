import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수
 * 조건부 클래스는 clsx를 사용하고 충돌 해결은 tailwind-merge를 사용
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
