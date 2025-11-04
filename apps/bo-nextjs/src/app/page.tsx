import { Button } from '@mz-ui/core';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold">MZ UI 데모</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-semibold">실제 API 검색 데모</h2>
            <p className="mb-6 text-gray-600">
              실제 API를 사용한 검색 기능에서 useTransition과 useDeferredValue를 사용했을 때와 사용하지 않았을 때의 차이를 체험해보세요.
            </p>
            <Link href="/transition-demo">
              <Button variant="outline" size="lg" className="w-full">
                검색 데모 보러가기
              </Button>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-semibold">기본 컴포넌트</h2>
            <p className="mb-6 text-gray-600">MZ UI의 기본 버튼 컴포넌트입니다.</p>
            <Button variant="outline" size="lg" className="w-full">
              Click me
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">useTransition이란?</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>useTransition</strong>은 React 18에서 도입된 훅으로, 무거운 상태 업데이트를 "전환(transition)"으로 표시하여 UI의 반응성을 유지할 수 있게
              해줍니다.
            </p>
            <ul className="ml-4 list-inside list-disc space-y-2">
              <li>
                <strong>긴급한 업데이트:</strong> 사용자 입력, 클릭 등 즉시 반응해야 하는 작업
              </li>
              <li>
                <strong>전환 업데이트:</strong> 검색 결과, 데이터 로딩 등 약간의 지연이 허용되는 작업
              </li>
            </ul>
            <p>전환 업데이트는 긴급한 업데이트에 의해 중단될 수 있어, 사용자가 더 부드러운 경험을 할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
