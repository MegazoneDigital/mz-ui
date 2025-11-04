import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import {
  ArrowUp, // 스크롤 버튼 아이콘
  BookOpen,
  Library,
  Package,
  Settings,
  Sliders,
  Sparkles,
  Wrench,
} from 'lucide-react';
import React from 'react';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CustomDocsPageProps {
  componentName: string;
  description: string;
  installationDeps: string[];
  implementationCode?: string;
  utilityCode?: string;
  children?: React.ReactNode;
}

export function CustomDocsPage({ installationDeps, implementationCode, utilityCode, children }: CustomDocsPageProps) {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('description');

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Original CodeBlock Component (Restored) ---
  const CodeBlock = ({ code }: { code: string; language?: string }) => {
    const [copied, setCopied] = React.useState(false);

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('복사 실패:', err);
      }
    };

    return (
      <div className="relative rounded-lg border border-gray-700 bg-gray-900">
        {/* 복사 버튼 */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          {copied && <div className="animate-fadeIn rounded bg-green-600 px-2 py-1 text-xs text-white">복사됨!</div>}
          <button
            onClick={copyToClipboard}
            className={`rounded p-2 transition-all ${copied ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'}`}
            aria-label="코드 복사"
          >
            {copied ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 코드 블록 */}
        <div className="p-4 pr-16">
          <pre className="overflow-x-auto">
            <code className="text-[12px] leading-relaxed text-gray-100">{code}</code>
          </pre>
        </div>
      </div>
    );
  };

  const sections: Section[] = [
    {
      id: 'description',
      title: '컴포넌트 설명',
      icon: BookOpen,
      content: (
        // Use a standard, clean card
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <Description />
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-800/30">
            <Primary />
            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-zinc-700">
              <div className="mb-2 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">실시간 테스트</h4>
              </div>
              <Controls />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'installation',
      title: '설치방법',
      icon: Package,
      content: (
        // Use a standard, clean card
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <Tabs defaultValue="npm" className="w-full">
            <TabsList variant="underline" className="mb-4">
              <TabsTrigger value="npm">NPM</TabsTrigger>
              <TabsTrigger value="pnpm">PNPM</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <CodeBlock code={`npm install ${installationDeps.join(' ')}`} />
            </TabsContent>
            <TabsContent value="pnpm">
              <CodeBlock code={`pnpm add ${installationDeps.join(' ')}`} />
            </TabsContent>
          </Tabs>
        </div>
      ),
    },
    {
      id: 'implementation',
      title: '완벽한 구현코드',
      icon: Settings,
      content: implementationCode ? (
        // Use a standard card with an accent border
        <div className="space-y-4">
          <div className="rounded-xl border border-l-4 border-gray-200 border-green-500 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">완전한 TypeScript 구현 코드</span>
              </div>
            </div>

            <div className="animate-slideDown mt-4">
              <CodeBlock code={implementationCode} />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="mb-2 text-4xl">📄</div>
            <p>구현 코드는 예시 섹션에서 확인할 수 있습니다.</p>
          </div>
        </div>
      ),
    },
    {
      id: 'utilities',
      title: '유틸리티 함수',
      icon: Wrench,
      content: (
        // Use a standard card with an accent border
        <div className="space-y-4">
          <div className="rounded-xl border border-l-4 border-gray-200 border-orange-500 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Wrench className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <span className="font-semibold text-orange-800 dark:text-orange-200">필수 유틸리티 함수 (cn)</span>
              </div>
            </div>

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              <p>Tailwind CSS 클래스를 안전하게 병합하는 유틸리티 함수입니다.</p>
            </div>

            <div className="animate-slideDown mt-4">
              <CodeBlock
                code={
                  utilityCode ||
                  `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`
                }
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="custom-docs-page">
      {/* Header */}
      <div className="docs-header mb-6 border-b border-gray-200 pb-6 dark:border-zinc-800">
        <Title />
        <Subtitle />
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList variant="underline" className="mb-6 w-full justify-start">
          {sections.map(section => {
            const IconComponent = section.icon;
            return (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                {IconComponent && <IconComponent className="h-4 w-4" />}
                {section.title}
              </TabsTrigger>
            );
          })}
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Library className="h-4 w-4" />
            모든 예시
          </TabsTrigger>
        </TabsList>

        {/* Sections Content */}
        {sections.map(section => (
          <TabsContent key={section.id} value={section.id} className="mt-0">
            <div className="docs-section">
              <div className="mb-6">
                <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                  {section.icon && <section.icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />}
                  {section.title}
                </h2>
              </div>
              <div className="section-content">{section.content}</div>
            </div>
          </TabsContent>
        ))}

        {/* Empty Examples Tab Content */}
        <TabsContent value="examples" className="mt-0">
          <div className="docs-section">
            <div className="mb-6">
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                <Library className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                모든 예시
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                다양한 사용 사례와 변형을 확인해보세요. 각 예시의 "Show code" 버튼으로 소스코드를 볼 수 있습니다.
              </p>
            </div>
            {/* Stories content rendered below */}
          </div>
        </TabsContent>
      </Tabs>

      {/* Stories Component - Always rendered for state preservation */}
      <div
        className="stories-persistent"
        style={{
          visibility: activeTab === 'examples' ? 'visible' : 'hidden',
          position: activeTab === 'examples' ? 'static' : 'absolute',
          top: activeTab === 'examples' ? 'auto' : '-9999px',
          left: activeTab === 'examples' ? 'auto' : '-9999px',
          pointerEvents: activeTab === 'examples' ? 'auto' : 'none',
          marginTop: activeTab === 'examples' ? '-20px' : '0',
          width: activeTab === 'examples' ? 'auto' : '1px',
          height: activeTab === 'examples' ? 'auto' : '1px',
          overflow: activeTab === 'examples' ? 'visible' : 'hidden',
        }}
        aria-hidden={activeTab !== 'examples'}
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <Stories />
        </div>
      </div>

      {/* Additional Content */}
      {children}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-8 bottom-8 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-white"
          aria-label="맨 위로 이동"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* --- Refined Embedded Styles --- */}
      <style>{`
        .custom-docs-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 2rem;
          font-family: 'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.7;
          color: rgb(24 24 27);
        }
        
        .dark .custom-docs-page {
           color: rgb(229 229 229);
        }

        .docs-section {
          scroll-margin-top: 2rem;
          margin-top: 2rem; /* Reduced from 3rem */
        }

        .section-content {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        @media (max-width: 768px) {
          .custom-docs-page {
            padding: 1.5rem 1rem;
          }
          .docs-header {
             padding-bottom: 1.5rem;
             margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default CustomDocsPage;
