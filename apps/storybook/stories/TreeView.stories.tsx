import type { Meta, StoryObj } from '@storybook/react';
import {
  CodeIcon,
  DatabaseIcon,
  EditIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
  ImageIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  TrashIcon,
  VideoIcon,
} from 'lucide-react';

import React from 'react';
import { CustomDocsPage } from '../src/components/CustomDocsPage';
import { TreeDataItem, TreeView } from '../src/components/ui/treeView';

const treeViewImplementationCode = `'use client';

import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva } from 'class-variance-authority';
import { ChevronRight, FileIcon, FileJson, FolderIcon, GripVertical, Image, Type } from 'lucide-react';
import React from 'react';

// [스타일링 가이드 - 1. 핵심 아이템 스타일 (CVA)]
const treeVariants = cva('group relative flex items-center gap-3 w-full px-4 py-5 text-base cursor-pointer transition-colors');
const selectedTreeVariants = cva('bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50');
const dragOverVariants = cva('bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200');

export interface TreeDataItem {
  id: string;
  name: string;
  type?: string;
  icon?: React.ComponentType<{ className?: string }>;
  selectedIcon?: React.ComponentType<{ className?: string }>;
  openIcon?: React.ComponentType<{ className?: string }>;
  children?: TreeDataItem[];
  actions?: React.ReactNode;
  onClick?: () => void;
  draggable?: boolean;
  droppable?: boolean;
  disabled?: boolean;
}

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem[] | TreeDataItem;
  initialSelectedItemId?: string;
  onSelectChange?: (item: TreeDataItem | undefined) => void;
  expandAll?: boolean;
  defaultNodeIcon?: React.ComponentType<{ className?: string }>;
  defaultLeafIcon?: React.ComponentType<{ className?: string }>;
  onDocumentDrag?: (sourceItem: TreeDataItem, targetItem: TreeDataItem) => void;
};

// [최적화: new Map을 사용한 부모 맵 생성 및 탐색]
function buildParentMap(items: TreeDataItem[], parentId?: string, map?: Map<string, string>): Map<string, string> {
  if (!map) map = new Map();
  for (const item of items) {
    if (parentId) map.set(item.id, parentId);
    if (item.children) buildParentMap(item.children, item.id, map);
  }
  return map;
}

const TreeView = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ data, initialSelectedItemId, onSelectChange, expandAll, defaultLeafIcon, defaultNodeIcon, className, onDocumentDrag, ...props }, ref) => {
    const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>(initialSelectedItemId);
    const [draggedItem, setDraggedItem] = React.useState<TreeDataItem | null>(null);

    // [최적화: Set을 사용하여 중복 없는 expandedId 관리/탐색]
    const [expandedItemIds, setExpandedItemIds] = React.useState<string[]>(() => {
      const dataArray = Array.isArray(data) ? data : [data];
      const idsSet = new Set<string>();

      function collectAllNodeIds(items: TreeDataItem[]) {
        items.forEach(item => {
          if (item.children && item.children.length > 0) {
            idsSet.add(item.id);
            collectAllNodeIds(item.children);
          }
        });
      }

      if (expandAll) {
        collectAllNodeIds(dataArray);
      } else if (initialSelectedItemId) {
        // 초기 선택된 아이템까지의 경로 확장
        function findPathToTarget(items: TreeDataItem[], targetId: string): boolean {
          for (const item of items) {
            if (item.id === targetId) return true;
            if (item.children) {
              idsSet.add(item.id);
              if (findPathToTarget(item.children, targetId)) return true;
              idsSet.delete(item.id);
            }
          }
          return false;
        }
        findPathToTarget(dataArray, initialSelectedItemId);
      }

      return Array.from(idsSet);
    });

    // 최적화: 부모 탐색을 위해 Map 캐싱
    const parentMap = React.useMemo(() => {
      const dataArray = Array.isArray(data) ? data : [data];
      return buildParentMap(dataArray);
    }, [data]);

    // ... 나머지 구현부 (handleSelectChange, handleDragStart, handleDrop 등)
    // TreeItem, TreeNode, TreeLeaf, AccordionTrigger, AccordionContent, TreeIcon, TreeActions 컴포넌트들 포함

    return (
      <div className={cn('relative overflow-hidden bg-white dark:bg-gray-900', className)}>
        <TreeItem
          data={data}
          ref={ref}
          selectedItemId={selectedItemId}
          handleSelectChange={handleSelectChange}
          expandedItemIds={expandedItemIds}
          defaultLeafIcon={defaultLeafIcon || FileIcon}
          defaultNodeIcon={defaultNodeIcon || FolderIcon}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          draggedItem={draggedItem}
          {...props}
        />
      </div>
    );
  }
);

export { TreeView };`;

const meta = {
  title: 'Components/TreeView',
  component: TreeView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `계층적 데이터를 표시하는 트리뷰 컴포넌트입니다. Strapi 스타일의 깔끔한 디자인을 적용했습니다.

## 주요 기능
- **계층적 구조**: 무제한 중첩 가능한 트리 구조
- **선택 상태**: 단일 아이템 선택 및 상태 관리  
- **확장/축소**: 폴더 노드의 열기/닫기 기능
- **드래그 앤 드롭**: 아이템 간 이동 기능
- **커스텀 아이콘**: 아이템별 개별 아이콘 설정
- **액션 버튼**: 호버 시 표시되는 컨텍스트 액션
- **비활성화**: 개별 아이템 비활성화 지원`,
      },
      page: () => (
        <CustomDocsPage
          componentName="TreeView"
          description="계층적 데이터를 표시하는 트리뷰 컴포넌트입니다. Strapi 스타일의 깔끔한 디자인을 적용했습니다."
          installationDeps={['@radix-ui/react-accordion', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react']}
          implementationCode={treeViewImplementationCode}
        />
      ),
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: '트리 구조 데이터 배열',
    },
    initialSelectedItemId: {
      control: { type: 'text' },
      description: '초기 선택된 아이템 ID',
    },
    expandAll: {
      control: { type: 'boolean' },
      description: '모든 노드를 초기에 확장할지 여부',
    },
    defaultNodeIcon: {
      description: '기본 노드(폴더) 아이콘',
    },
    defaultLeafIcon: {
      description: '기본 리프(파일) 아이콘',
    },
  },
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

// 4. 예시들
// 기본 파일 시스템 예시
const fileSystemData: TreeDataItem[] = [
  {
    id: '1',
    name: 'src',
    icon: FolderIcon,
    openIcon: FolderOpenIcon,
    children: [
      {
        id: '1-1',
        name: 'components',
        icon: FolderIcon,
        openIcon: FolderOpenIcon,
        children: [
          { id: '1-1-1', name: 'Button.tsx', icon: CodeIcon },
          { id: '1-1-2', name: 'Input.tsx', icon: CodeIcon },
          { id: '1-1-3', name: 'Modal.tsx', icon: CodeIcon },
        ],
      },
      {
        id: '1-2',
        name: 'pages',
        icon: FolderIcon,
        openIcon: FolderOpenIcon,
        children: [
          { id: '1-2-1', name: 'index.tsx', icon: FileTextIcon },
          { id: '1-2-2', name: 'about.tsx', icon: FileTextIcon },
        ],
      },
      { id: '1-3', name: 'styles.css', icon: FileIcon },
      { id: '1-4', name: 'utils.ts', icon: CodeIcon },
    ],
  },
  {
    id: '2',
    name: 'public',
    icon: FolderIcon,
    openIcon: FolderOpenIcon,
    children: [
      {
        id: '2-1',
        name: 'images',
        icon: FolderIcon,
        openIcon: FolderOpenIcon,
        children: [
          { id: '2-1-1', name: 'logo.png', icon: ImageIcon },
          { id: '2-1-2', name: 'hero.jpg', icon: ImageIcon },
        ],
      },
      {
        id: '2-2',
        name: 'videos',
        icon: FolderIcon,
        openIcon: FolderOpenIcon,
        children: [{ id: '2-2-1', name: 'intro.mp4', icon: VideoIcon }],
      },
    ],
  },
  { id: '3', name: 'package.json', icon: SettingsIcon },
  { id: '4', name: 'README.md', icon: FileTextIcon },
];

export const FileSystem: Story = {
  args: {
    data: fileSystemData,
    defaultNodeIcon: FolderIcon,
    defaultLeafIcon: FileIcon,
  },
  parameters: {
    docs: {
      description: {
        story: '파일 시스템 구조를 보여주는 기본 트리뷰입니다.',
      },
      source: {
        language: 'tsx',
        code: `const fileSystemData = [
    {
      id: '1',
      name: 'src',
      icon: FolderIcon,
      openIcon: FolderOpenIcon,
      children: [
        {
          id: '1-1',
          name: 'components',
          icon: FolderIcon,
          openIcon: FolderOpenIcon,
          children: [
            { id: '1-1-1', name: 'Button.tsx', icon: CodeIcon },
            { id: '1-1-2', name: 'Input.tsx', icon: CodeIcon },
          ],
        },
      ],
    },
  ];
  
  <TreeView
    data={fileSystemData}
    defaultNodeIcon={FolderIcon}
    defaultLeafIcon={FileIcon}
  />`,
      },
    },
  },
};

// 1. 설치 및 설정
export const InstallationGuide: Story = {
  args: { data: [] },
  render: () => (
    <div className="max-w-4xl space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">설치 및 설정</h3>

        <div className="space-y-3">
          <h4 className="font-medium">1. 필수 의존성 패키지 설치</h4>
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
            <p className="font-mono text-sm">npm install lucide-react clsx tailwind-merge</p>
            <p className="mt-1 font-mono text-sm">또는</p>
            <p className="font-mono text-sm">pnpm add lucide-react clsx tailwind-merge</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">2. 프로젝트에 추가하기</h4>
          <ul className="ml-4 space-y-1 text-sm">
            <li>• treeView.tsx 컴포넌트를 src/components/ui/ 폴더에 복사</li>
            <li>• utils.ts 파일을 src/lib/ 폴더에 복사</li>
            <li>• 프로젝트에 Tailwind CSS가 설정되어 있는지 확인</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TreeView 컴포넌트 구현을 위한 의존성 패키지 및 설정 방법입니다.',
      },
      source: {
        language: 'tsx',
        code: `// 기본 사용법
import { TreeView } from '@/components/ui/treeView';

const treeData = [
  {
    id: '1',
    name: '프로젝트',
    children: [
      { id: '1-1', name: 'src', children: [] },
      { id: '1-2', name: 'package.json' },
    ],
  },
];

<TreeView data={treeData} />

// 확장된 사용법
<TreeView
  data={treeData}
  initialSelectedItemId="1-1"
  expandAll={true}
  onSelectChange={(item) => console.log('선택된 아이템:', item)}
  onDocumentDrag={(source, target) => console.log('드래그:', source, target)}
/>

// 커스텀 아이콘
import { FileIcon, FolderIcon } from 'lucide-react';

const customData = [
  {
    id: '1',
    name: '폴더',
    icon: FolderIcon,
    children: [
      { id: '1-1', name: '파일.txt', icon: FileIcon },
    ],
  },
];

<TreeView 
  data={customData}
  defaultNodeIcon={FolderIcon}
  defaultLeafIcon={FileIcon}
/>`,
      },
    },
  },
};

// 2. 완전한 구현코드
export const TreeViewImplementation: Story = {
  args: { data: [] },
  render: () => <h3 className="mb-4 text-lg font-semibold">완전한 TreeView 구현 코드</h3>,
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `'use client';

import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import React from 'react';

const treeVariants = cva(
  'group relative flex items-center gap-1 rounded-md px-2 py-1.5 text-sm cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50'
);

const selectedTreeVariants = cva('bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300');

const dragOverVariants = cva('bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200');

interface TreeDataItem {
  id: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  selectedIcon?: React.ComponentType<{ className?: string }>;
  openIcon?: React.ComponentType<{ className?: string }>;
  children?: TreeDataItem[];
  actions?: React.ReactNode;
  onClick?: () => void;
  draggable?: boolean;
  droppable?: boolean;
  disabled?: boolean;
}

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem[] | TreeDataItem;
  initialSelectedItemId?: string;
  onSelectChange?: (item: TreeDataItem | undefined) => void;
  expandAll?: boolean;
  defaultNodeIcon?: React.ComponentType<{ className?: string }>;
  defaultLeafIcon?: React.ComponentType<{ className?: string }>;
  onDocumentDrag?: (sourceItem: TreeDataItem, targetItem: TreeDataItem) => void;
};

const TreeView = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ data, initialSelectedItemId, onSelectChange, expandAll, defaultLeafIcon, defaultNodeIcon, className, onDocumentDrag, ...props }, ref) => {
    const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>(initialSelectedItemId);
    const [draggedItem, setDraggedItem] = React.useState<TreeDataItem | null>(null);

    const handleSelectChange = React.useCallback(
      (item: TreeDataItem | undefined) => {
        setSelectedItemId(item?.id);
        if (onSelectChange) {
          onSelectChange(item);
        }
      },
      [onSelectChange]
    );

    const handleDragStart = React.useCallback((item: TreeDataItem) => {
      setDraggedItem(item);
    }, []);

    const handleDrop = React.useCallback(
      (targetItem: TreeDataItem) => {
        if (draggedItem && onDocumentDrag && draggedItem.id !== targetItem.id) {
          onDocumentDrag(draggedItem, targetItem);
        }
        setDraggedItem(null);
      },
      [draggedItem, onDocumentDrag]
    );

    const expandedItemIds = React.useMemo(() => {
      if (!initialSelectedItemId) {
        return [] as string[];
      }

      const ids: string[] = [];

      function walkTreeItems(items: TreeDataItem[] | TreeDataItem, targetId: string) {
        if (items instanceof Array) {
          for (let i = 0; i < items.length; i++) {
            ids.push(items[i]!.id);
            if (walkTreeItems(items[i]!, targetId) && !expandAll) {
              return true;
            }
            if (!expandAll) ids.pop();
          }
        } else if (!expandAll && items.id === targetId) {
          return true;
        } else if (items.children) {
          return walkTreeItems(items.children, targetId);
        }
      }

      walkTreeItems(data, initialSelectedItemId);
      return ids;
    }, [data, expandAll, initialSelectedItemId]);

    return (
      <div className={cn('relative overflow-hidden p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg', className)}>
        <TreeItem
          data={data}
          ref={ref}
          selectedItemId={selectedItemId}
          handleSelectChange={handleSelectChange}
          expandedItemIds={expandedItemIds}
          defaultLeafIcon={defaultLeafIcon}
          defaultNodeIcon={defaultNodeIcon}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          draggedItem={draggedItem}
          {...props}
        />
      </div>
    );
  }
);
TreeView.displayName = 'TreeView';

export { TreeView, type TreeDataItem };`,
      },
    },
  },
};

// 3. 유틸리티 함수
export const UtilsImplementation: Story = {
  args: { data: [] },
  render: () => <h3 className="mb-4 text-lg font-semibold">유틸리티 함수</h3>,
  parameters: {
    docs: {
      description: {
        story: 'TreeView 컴포넌트에서 사용되는 유틸리티 함수들입니다.',
      },
      source: {
        language: 'tsx',
        code: `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
    },
  },
};

// 액션이 있는 예시
const dataWithActions: TreeDataItem[] = [
  {
    id: '1',
    name: '문서',
    icon: FolderIcon,
    actions: (
      <div className="flex gap-1">
        <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
          <EditIcon className="h-3 w-3" />
        </button>
        <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
          <MoreHorizontalIcon className="h-3 w-3" />
        </button>
      </div>
    ),
    children: [
      {
        id: '1-1',
        name: '프로젝트 계획서.docx',
        icon: FileTextIcon,
        actions: (
          <div className="flex gap-1">
            <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
              <EditIcon className="h-3 w-3" />
            </button>
            <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
              <TrashIcon className="h-3 w-3" />
            </button>
          </div>
        ),
      },
      {
        id: '1-2',
        name: '회의록.txt',
        icon: FileTextIcon,
        actions: (
          <div className="flex gap-1">
            <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
              <EditIcon className="h-3 w-3" />
            </button>
            <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
              <TrashIcon className="h-3 w-3" />
            </button>
          </div>
        ),
      },
    ],
  },
  {
    id: '2',
    name: '데이터베이스',
    icon: DatabaseIcon,
    disabled: true,
    actions: (
      <div className="flex gap-1">
        <button className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
          <SettingsIcon className="h-3 w-3" />
        </button>
      </div>
    ),
    children: [
      { id: '2-1', name: 'users.sql', icon: DatabaseIcon, disabled: true },
      { id: '2-2', name: 'products.sql', icon: DatabaseIcon, disabled: true },
    ],
  },
];

export const WithActions: Story = {
  args: {
    data: dataWithActions,
    defaultNodeIcon: FolderIcon,
    defaultLeafIcon: FileIcon,
  },
  parameters: {
    docs: {
      description: {
        story: '각 아이템에 액션 버튼이 있는 트리뷰입니다. 호버 시 액션 버튼들이 표시됩니다.',
      },
      source: {
        language: 'tsx',
        code: `const dataWithActions = [
  {
    id: '1',
    name: '문서',
    icon: FolderIcon,
    actions: (
      <div className="flex gap-1">
        <button className="rounded p-1 hover:bg-gray-200">
          <EditIcon className="h-3 w-3" />
        </button>
        <button className="rounded p-1 hover:bg-gray-200">
          <MoreHorizontalIcon className="h-3 w-3" />
        </button>
      </div>
    ),
    children: [
      {
        id: '1-1',
        name: '프로젝트 계획서.docx',
        icon: FileTextIcon,
        actions: (
          <div className="flex gap-1">
            <button className="rounded p-1 hover:bg-gray-200">
              <EditIcon className="h-3 w-3" />
            </button>
            <button className="rounded p-1 hover:bg-gray-200">
              <TrashIcon className="h-3 w-3" />
            </button>
          </div>
        ),
      },
    ],
  },
];

<TreeView
  data={dataWithActions}
  defaultNodeIcon={FolderIcon}
  defaultLeafIcon={FileIcon}
/>`,
      },
    },
  },
};

// 선택된 아이템이 있는 예시
export const WithSelectedItem: Story = {
  args: {
    data: fileSystemData,
    initialSelectedItemId: '1-1-2',
    defaultNodeIcon: FolderIcon,
    defaultLeafIcon: FileIcon,
  },
  parameters: {
    docs: {
      description: {
        story: '초기에 선택된 아이템이 있는 트리뷰입니다. 선택된 경로까지 자동으로 확장됩니다.',
      },
      source: {
        language: 'tsx',
        code: `<TreeView
  data={fileSystemData}
  initialSelectedItemId="1-1-2"
  defaultNodeIcon={FolderIcon}
  defaultLeafIcon={FileIcon}
  onSelectChange={(item) => {
    console.log('선택된 아이템:', item);
  }}
/>`,
      },
    },
  },
};

// 모든 노드가 확장된 예시
export const ExpandAll: Story = {
  args: {
    data: fileSystemData,
    expandAll: true,
    defaultNodeIcon: FolderIcon,
    defaultLeafIcon: FileIcon,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 노드가 초기에 확장된 상태로 표시되는 트리뷰입니다.',
      },
      source: {
        language: 'tsx',
        code: `<TreeView
  data={fileSystemData}
  expandAll={true}
  defaultNodeIcon={FolderIcon}
  defaultLeafIcon={FileIcon}
/>`,
      },
    },
  },
};

// 스토리북 예시 컴포넌트
export const DragDropExample = () => {
  const [treeData, setTreeData] = React.useState<TreeDataItem[]>([
    {
      id: '1',
      name: '할 일',
      icon: FolderIcon,
      draggable: true,
      droppable: true, // [FIX] 폴더는 드롭 대상이어야 함
      children: [
        { id: '1-1', name: '프로젝트 기획', icon: FileTextIcon, draggable: true },
        { id: '1-2', name: '디자인 리뷰', icon: FileTextIcon, draggable: true },
      ],
    },
    {
      id: '2',
      name: '진행 중',
      icon: FolderIcon,
      draggable: true,
      droppable: true, // [FIX] 폴더는 드롭 대상이어야 함
      children: [{ id: '2-1', name: '개발 진행', icon: CodeIcon, draggable: true }],
    },
    {
      id: '3',
      name: '완료',
      icon: FolderIcon,
      draggable: true,
      droppable: true, // [FIX] 폴더는 드롭 대상이어야 함
      children: [],
    },
  ]);

  const [dragHistory, setDragHistory] = React.useState<string[]>([]);

  // --- DND 로직을 위한 헬퍼 함수 (불변성 유지) ---
  function removeNode(nodes: TreeDataItem[], id: string): TreeDataItem[] {
    return nodes
      .filter(node => node.id !== id)
      .map(node => {
        if (node.children) {
          return { ...node, children: removeNode(node.children, id) };
        }
        return node;
      });
  }

  function addNode(nodes: TreeDataItem[], targetId: string, nodeToAdd: TreeDataItem): TreeDataItem[] {
    // 타겟이 루트('parent_div')인 경우
    if (targetId === '' || targetId === 'parent_div') {
      return [...nodes, nodeToAdd];
    }

    // 타겟이 특정 노드인 경우
    return nodes.map(node => {
      if (node.id === targetId) {
        // droppable한 노드(폴더)에만 자식으로 추가
        if (node.children) {
          return {
            ...node,
            children: [...node.children, nodeToAdd],
          };
        }
      }
      if (node.children) {
        return { ...node, children: addNode(node.children, targetId, nodeToAdd) };
      }
      return node;
    });
  }
  // --- 헬퍼 함수 끝 ---

  // 3. [FIX] 불변성을 지키는 헬퍼 함수를 사용하도록 핸들러 수정
  const handleDragDrop = (source: TreeDataItem, target: TreeDataItem) => {
    // 스스로에게 드롭 방지
    if (source.id === target.id) return;

    // 리프(파일)에게 드롭 방지 (droppable 속성이 없거나 false인 경우)
    // target.name === 'parent_div'는 루트 드롭이므로 허용
    if (target.name !== 'parent_div' && !target.droppable) {
      console.log(`드롭 대상(${target.name})은 droppable하지 않습니다.`);
      return;
    }

    const targetName = target.name === 'parent_div' ? '루트' : target.name;
    const logMessage = `${source.name}을(를) ${targetName}(으)로 이동`;

    setDragHistory(prev => [...prev.slice(-4), logMessage]);

    setTreeData(currentData => {
      // 1. 소스 노드 제거
      const dataWithoutSource = removeNode(currentData, source.id);
      // 2. 타겟에 소스 노드 추가
      const newData = addNode(dataWithoutSource, target.id || 'parent_div', source);
      return newData;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">🎯 아이템을 드래그해서 다른 폴더로 이동시킬 수 있습니다.</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">💡 팁: 트리 하단 영역으로 드래그하면 루트로 이동됩니다.</p>
      </div>

      <TreeView
        data={treeData}
        defaultNodeIcon={FolderIcon} // 스토리에서 import한 아이콘 전달
        defaultLeafIcon={FileTextIcon} // 스토리에서 import한 아이콘 전달
        onDocumentDrag={handleDragDrop}
      />

      {/* 드래그 히스토리 표시 */}
      {dragHistory.length > 0 && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">📝 이동 기록</h4>
          <div className="space-y-1">
            {dragHistory.map((log, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="text-blue-500">#{index + 1}</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
