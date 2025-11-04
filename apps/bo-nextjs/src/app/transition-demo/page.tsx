'use client';

import { useDeferredValue, useEffect, useState, useTransition } from 'react';

// API 타입 정의
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// 실제 API 호출 함수들
async function searchPosts(query: string): Promise<Post[]> {
  if (!query.trim()) return [];

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await response.json();

  // 검색 필터링 (제목이나 본문에 쿼리가 포함된 것들)
  return posts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase()));
}

async function getUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}

// 검색 결과 컴포넌트
function SearchResults({ posts, users, isLoading }: { posts: Post[]; users: User[]; isLoading?: boolean }) {
  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user?.name || '알 수 없음';
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg bg-gray-200 p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
            <div className="h-3 w-full rounded bg-gray-300"></div>
            <div className="mt-2 h-3 w-1/2 rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-center">
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="mb-2 font-semibold text-gray-900">{post.title}</h3>
          <p className="mb-2 line-clamp-2 text-sm text-gray-600">{post.body}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span>작성자: {getUserName(post.userId)}</span>
            <span className="mx-2">•</span>
            <span>Post ID: {post.id}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// 일반 검색 컴포넌트 (useTransition 미사용)
function RegularSearch({ users }: { users: User[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const posts = await searchPosts(query);
        setResults(posts);
      } catch (error) {
        console.error('검색 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(search, 300); // 디바운싱
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-red-600">일반 검색 (useTransition 미사용)</h2>
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="포스트 검색... (예: 'qui', 'dolor', 'voluptas')"
          className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <span>검색어: "{query}"</span>
          <span>결과: {results.length}개</span>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <SearchResults posts={results} users={users} isLoading={isLoading} />
      </div>

      <div className="mt-4 rounded-lg bg-red-50 p-3">
        <p className="text-sm text-red-700">
          <strong>문제점:</strong> 검색 중에 입력 필드가 느려지고, 다른 UI 인터랙션이 블로킹됩니다.
        </p>
      </div>
    </div>
  );
}

// useTransition을 사용한 검색 컴포넌트
function TransitionSearch({ users }: { users: User[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();

  // useDeferredValue로 검색어 지연
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const search = async () => {
      if (!deferredQuery.trim()) {
        setResults([]);
        return;
      }

      startTransition(async () => {
        try {
          const posts = await searchPosts(deferredQuery);
          setResults(posts);
        } catch (error) {
          console.error('검색 오류:', error);
        }
      });
    };

    const timeoutId = setTimeout(search, 300); // 디바운싱
    return () => clearTimeout(timeoutId);
  }, [deferredQuery]);

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold text-green-600">최적화된 검색 (useTransition + useDeferredValue)</h2>
      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="포스트 검색... (예: 'qui', 'dolor', 'voluptas')"
          className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
          <span>
            검색어: "{query}" {isPending && <span className="text-blue-500">(검색 중...)</span>}
          </span>
          <span>결과: {results.length}개</span>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <SearchResults posts={results} users={users} />
      </div>

      <div className="mt-4 rounded-lg bg-green-50 p-3">
        <p className="text-sm text-green-700">
          <strong>장점:</strong> 입력 필드가 항상 반응하며, 검색 중에도 다른 UI가 부드럽게 작동합니다.
        </p>
      </div>
    </div>
  );
}

export default function SearchDemo() {
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [testInput, setTestInput] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('사용자 데이터 로딩 오류:', error);
      } finally {
        setIsUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (isUsersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-600">데이터를 로딩 중입니다...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold">실제 API 검색 - useTransition 데모</h1>

        {/* 반응성 테스트용 입력 필드 */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">반응성 테스트</h2>
          <p className="mb-4 text-gray-600">아래 입력 필드에 타이핑하면서 검색을 해보세요. 일반 검색은 검색 중에 이 필드가 느려집니다.</p>
          <input
            type="text"
            value={testInput}
            onChange={e => setTestInput(e.target.value)}
            placeholder="여기에 타이핑해서 반응성을 테스트해보세요..."
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="mt-2 text-sm text-gray-500">입력한 값: {testInput}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <RegularSearch users={users} />
          <TransitionSearch users={users} />
        </div>

        {/* 설명 섹션 */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">실제 API 검색에서의 차이점</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-red-600">일반 검색</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• API 응답 대기 중 UI가 블로킹됨</li>
                <li>• 입력 필드 타이핑이 느려짐</li>
                <li>• 검색 결과 렌더링 시 화면이 멈춤</li>
                <li>• 사용자가 답답함을 느낌</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-green-600">useTransition + useDeferredValue</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• API 호출 중에도 UI가 반응함</li>
                <li>• 입력 필드가 항상 부드럽게 작동</li>
                <li>• 검색 상태를 명확하게 표시</li>
                <li>• 더 나은 사용자 경험 제공</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-800">사용된 기술</h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>
                • <strong>JSONPlaceholder API:</strong> 실제 REST API 호출
              </li>
              <li>
                • <strong>useTransition:</strong> 논블로킹 상태 업데이트
              </li>
              <li>
                • <strong>useDeferredValue:</strong> 검색어 입력 최적화
              </li>
              <li>
                • <strong>디바운싱:</strong> API 호출 최적화 (300ms 지연)
              </li>
            </ul>
          </div>
        </div>

        {/* 코드 예시 */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">핵심 코드 비교</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-red-600">일반 검색</h3>
              <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm">
                {`useEffect(() => {
  const search = async () => {
    setIsLoading(true);
    const posts = await searchPosts(query);
    setResults(posts); // UI 블로킹
    setIsLoading(false);
  };
  
  const timeoutId = setTimeout(search, 300);
  return () => clearTimeout(timeoutId);
}, [query]);`}
              </pre>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-green-600">useTransition 사용</h3>
              <pre className="overflow-x-auto rounded bg-gray-100 p-4 text-sm">
                {`const [isPending, startTransition] = useTransition();
const deferredQuery = useDeferredValue(query);

useEffect(() => {
  const search = async () => {
    startTransition(async () => {
      const posts = await searchPosts(deferredQuery);
      setResults(posts); // 논블로킹
    });
  };
  
  const timeoutId = setTimeout(search, 300);
  return () => clearTimeout(timeoutId);
}, [deferredQuery]);`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
