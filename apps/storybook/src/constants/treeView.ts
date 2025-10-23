// TreeView Component Implementation Code
export const treeViewImplementationCode = `'use client';

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

    // [최적화: 부모 ID 찾기 - Map 조회 사용]
    function getParentId(targetId: string): string | null {
      return parentMap.get(targetId) ?? null;
    }

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
        setDraggedItem(null);

        // Disallow dropping onto non-droppable, non-root items
        if (draggedItem && onDocumentDrag && draggedItem.id !== targetItem.id && (targetItem.name === 'parent_div' || targetItem.droppable)) {
          setExpandedItemIds(prevExpanded => {
            const newExpanded = new Set(prevExpanded);

            // 1. Keep source's original parent expanded
            const sourceParentId = getParentId(draggedItem.id);
            if (sourceParentId) {
              newExpanded.add(sourceParentId);
            }

            // 2. Expand the target itself if droppable (excluding root)
            if (targetItem.name !== 'parent_div' && targetItem.droppable) {
              newExpanded.add(targetItem.id);
            }

            // 3. Expand the target's parent (if not root)
            if (targetItem.name !== 'parent_div') {
              const targetParentId = getParentId(targetItem.id);
              if (targetParentId) {
                newExpanded.add(targetParentId);
              }
            }

            return Array.from(newExpanded);
          });

          onDocumentDrag(draggedItem, targetItem);
        }
      },
      [onDocumentDrag, parentMap, getParentId, draggedItem]
    );

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
        <div
          className="h-[60px] w-full border-t border-gray-200 dark:border-gray-700"
          onDragOver={e => {
            if (draggedItem) {
              e.preventDefault();
            }
          }}
          onDrop={() => {
            handleDrop({ id: '', name: 'parent_div', children: [], droppable: true });
          }}
        ></div>
      </div>
    );
  }
);
TreeView.displayName = 'TreeView';

// TreeItem, TreeNode, TreeLeaf, AccordionTrigger, AccordionContent, TreeIcon, TreeActions 컴포넌트들도 포함...
// (전체 구현은 실제 파일에서 확인 가능)

export { TreeView };`;

// TreeView Component Dependencies
export const treeViewDependencies = ['@radix-ui/react-accordion', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react'];
