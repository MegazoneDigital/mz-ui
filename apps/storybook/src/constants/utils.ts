// Utility Code (cn function)
export const utilityCode = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

// All Component Dependencies Configuration
export const componentDependencies = {
  button: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
  checkbox: ['@radix-ui/react-checkbox', 'lucide-react', 'clsx', 'tailwind-merge'],
  checkboxGroup: ['lucide-react', 'clsx', 'tailwind-merge'],
  tabs: ['class-variance-authority', 'clsx', 'tailwind-merge'],
  treeView: ['@radix-ui/react-accordion', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react'],
} as const;
