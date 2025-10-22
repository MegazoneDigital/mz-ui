'use client';

import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva } from 'class-variance-authority';
// [FIX] 컴포넌트 내부에서 사용할 기본 아이콘 import
import { ChevronRight, FileIcon, FileJson, FolderIcon, GripVertical, Image, Type } from 'lucide-react';
import React from 'react';

// [스타일링 가이드 - 1. 핵심 아이템 스타일 (CVA)]
const treeVariants = cva('group relative flex items-center gap-3 w-full px-4 py-5 text-base cursor-pointer transition-colors');
const selectedTreeVariants = cva('bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50');
const dragOverVariants = cva('bg-blue-100 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200');

// [FIX] export interface로 변경
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
  droppable?: boolean; // 폴더(노드)에 true를 설정해야 드롭이 가능합니다.
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

// [NEW] 특정 아이템의 부모를 찾는 헬퍼 함수 (컴포넌트 외부로 이동)
const findParentId = (items: TreeDataItem[], targetId: string, parentId?: string): string | null => {
  for (const item of items) {
    if (item.id === targetId) {
      return parentId || null;
    }
    if (item.children) {
      const found = findParentId(item.children, targetId, item.id);
      if (found !== null) return found;
    }
  }
  return null;
};

const TreeView = React.forwardRef<HTMLDivElement, TreeProps>(
  ({ data, initialSelectedItemId, onSelectChange, expandAll, defaultLeafIcon, defaultNodeIcon, className, onDocumentDrag, ...props }, ref) => {
    const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>(initialSelectedItemId);
    const [draggedItem, setDraggedItem] = React.useState<TreeDataItem | null>(null);

    // [NEW] expandedItemIds를 useState로 관리하여 동적 업데이트 가능하게 함
    const [expandedItemIds, setExpandedItemIds] = React.useState<string[]>(() => {
      const ids: string[] = [];
      const dataArray = data instanceof Array ? data : [data];

      function collectAllNodeIds(items: TreeDataItem[]) {
        items.forEach(item => {
          if (item.children && item.children.length > 0) {
            ids.push(item.id);
            collectAllNodeIds(item.children);
          }
        });
      }

      function findPathToTarget(items: TreeDataItem[], targetId: string): boolean {
        for (const item of items) {
          if (item.id === targetId) {
            return true;
          }
          if (item.children) {
            ids.push(item.id);
            if (findPathToTarget(item.children, targetId)) {
              return true;
            }
            ids.pop();
          }
        }
        return false;
      }

      if (expandAll) {
        collectAllNodeIds(dataArray);
      } else if (initialSelectedItemId) {
        findPathToTarget(dataArray, initialSelectedItemId);
      }

      return ids;
    });

    // [NEW] data나 expandAll이 변경될 때 expandedItemIds 업데이트
    React.useEffect(() => {
      const ids: string[] = [];
      const dataArray = data instanceof Array ? data : [data];

      function collectAllNodeIds(items: TreeDataItem[]) {
        items.forEach(item => {
          if (item.children && item.children.length > 0) {
            ids.push(item.id);
            collectAllNodeIds(item.children);
          }
        });
      }

      function findPathToTarget(items: TreeDataItem[], targetId: string): boolean {
        for (const item of items) {
          if (item.id === targetId) {
            return true;
          }
          if (item.children) {
            ids.push(item.id);
            if (findPathToTarget(item.children, targetId)) {
              return true;
            }
            ids.pop();
          }
        }
        return false;
      }

      if (expandAll) {
        collectAllNodeIds(dataArray);
        setExpandedItemIds(ids);
      } else if (initialSelectedItemId) {
        findPathToTarget(dataArray, initialSelectedItemId);
        setExpandedItemIds(ids);
      }
    }, [data, expandAll, initialSelectedItemId]);

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
          // [FIX] 리프(파일)에는 드롭 방지 (droppable 속성이 없거나, 루트 드롭이 아닌 경우)
          if (targetItem.name !== 'parent_div' && !targetItem.droppable) {
            setDraggedItem(null); // 드래그 종료
            return;
          }

          // [NEW] 드래그 앤 드롭 완료 후 관련 아코디언 펼치기
          setExpandedItemIds(prevExpanded => {
            const newExpanded = new Set(prevExpanded);
            const dataArray = data instanceof Array ? data : [data];

            // 1. 소스의 원래 부모 유지 (이미 펼쳐져 있던 상태 유지)
            const sourceParentId = findParentId(dataArray, draggedItem.id);
            if (sourceParentId) {
              newExpanded.add(sourceParentId);
            }

            // 2. 타겟이 폴더인 경우, 타겟 자체를 펼치기
            if (targetItem.name !== 'parent_div' && targetItem.droppable) {
              newExpanded.add(targetItem.id);
            }

            // 3. 타겟의 부모도 펼치기 (타겟이 루트가 아닌 경우)
            if (targetItem.name !== 'parent_div') {
              const targetParentId = findParentId(dataArray, targetItem.id);
              if (targetParentId) {
                newExpanded.add(targetParentId);
              }
            }

            return Array.from(newExpanded);
          });

          onDocumentDrag(draggedItem, targetItem);
        }
        setDraggedItem(null);
      },
      [draggedItem, onDocumentDrag, data]
    );

    return (
      <div className={cn('relative overflow-hidden bg-white dark:bg-gray-900', className)}>
        <TreeItem
          data={data}
          ref={ref}
          selectedItemId={selectedItemId}
          handleSelectChange={handleSelectChange}
          expandedItemIds={expandedItemIds}
          // [FIX] 컴포넌트 내부에서 import한 아이콘을 기본값으로 사용
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
            // [FIX] 루트 드롭 시 target 객체에 droppable: true 추가
            handleDrop({ id: '', name: 'parent_div', children: [], droppable: true });
          }}
        ></div>
      </div>
    );
  }
);
TreeView.displayName = 'TreeView';

type TreeItemProps = TreeProps & {
  selectedItemId?: string;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  defaultNodeIcon?: React.ComponentType<{ className?: string }>;
  defaultLeafIcon?: React.ComponentType<{ className?: string }>;
  handleDragStart?: (item: TreeDataItem) => void;
  handleDrop?: (item: TreeDataItem) => void;
  draggedItem: TreeDataItem | null;
};

const TreeItem = React.forwardRef<HTMLDivElement, TreeItemProps>(
  (
    {
      className,
      data,
      selectedItemId,
      handleSelectChange,
      expandedItemIds,
      defaultNodeIcon,
      defaultLeafIcon,
      handleDragStart,
      handleDrop,
      draggedItem,
      ...props
    },
    ref
  ) => {
    if (!(data instanceof Array)) {
      data = [data];
    }
    return (
      <div ref={ref} role="tree" className={className} {...props}>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map(item => (
            <li key={item.id}>
              {/* [FIX] 자식이 있는지 여부로 노드/리프 구분 (자식이 빈 배열이어도 노드임) */}
              {item.children ? (
                <TreeNode
                  item={item}
                  selectedItemId={selectedItemId}
                  expandedItemIds={expandedItemIds}
                  handleSelectChange={handleSelectChange}
                  defaultNodeIcon={defaultNodeIcon}
                  defaultLeafIcon={defaultLeafIcon}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  draggedItem={draggedItem}
                />
              ) : (
                <TreeLeaf
                  item={item}
                  selectedItemId={selectedItemId}
                  handleSelectChange={handleSelectChange}
                  defaultLeafIcon={defaultLeafIcon}
                  handleDragStart={handleDragStart}
                  handleDrop={handleDrop}
                  draggedItem={draggedItem}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
TreeItem.displayName = 'TreeItem';

const DragHandle = ({ item, onDragStart }: { item: TreeDataItem; onDragStart?: (e: React.DragEvent) => void }) => {
  if (!item.draggable) {
    return <div className="h-5 w-5" />;
  }
  return (
    <div draggable onDragStart={onDragStart} className="cursor-grab text-gray-400 hover:text-gray-600" onClick={e => e.stopPropagation()}>
      <GripVertical className="h-5 w-5" />
    </div>
  );
};

const TreeNode = ({
  item,
  handleSelectChange,
  expandedItemIds,
  selectedItemId,
  defaultNodeIcon,
  defaultLeafIcon,
  handleDragStart,
  handleDrop,
  draggedItem,
}: {
  item: TreeDataItem;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  selectedItemId?: string;
  defaultNodeIcon?: React.ComponentType<{ className?: string }>;
  defaultLeafIcon?: React.ComponentType<{ className?: string }>;
  handleDragStart?: (item: TreeDataItem) => void;
  handleDrop?: (item: TreeDataItem) => void;
  draggedItem: TreeDataItem | null;
}) => {
  // [FIX] value 상태가 expandedItemIds prop의 변경을 동적으로 반영하도록 수정
  const [isExpanded, setIsExpanded] = React.useState(expandedItemIds.includes(item.id));
  const [isDragOver, setIsDragOver] = React.useState(false);

  React.useEffect(() => {
    setIsExpanded(expandedItemIds.includes(item.id));
  }, [expandedItemIds, item.id]);

  const onDragStart = (e: React.DragEvent) => {
    if (!item.draggable) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', item.id);
    handleDragStart?.(item);
    e.stopPropagation();
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // [FIX] droppable이 명시적으로 false가 아닌 경우 (true 또는 undefined) 드롭 허용
    if (item.droppable !== false && draggedItem && draggedItem.id !== item.id) {
      setIsDragOver(true);
    }
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // [FIX] droppable하지 않은 노드에는 드롭 방지
    if (item.droppable === false) return;
    handleDrop?.(item);
    e.stopPropagation();
  };

  return (
    // [FIX] Radix Accordion Root/Item을 React.useState로 제어하도록 변경
    <AccordionPrimitive.Root type="multiple" value={isExpanded ? [item.id] : []} onValueChange={value => setIsExpanded(value.includes(item.id))}>
      <AccordionPrimitive.Item value={item.id}>
        <AccordionTrigger
          className={cn(
            treeVariants(),
            selectedItemId === item.id && selectedTreeVariants(),
            isDragOver && dragOverVariants(),
            'border-b border-gray-200 dark:border-gray-700'
          )}
          onClick={() => {
            handleSelectChange(item);
            item.onClick?.();
          }}
          draggable={false}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <DragHandle item={item} onDragStart={onDragStart} />
          <TreeIcon item={item} isSelected={selectedItemId === item.id} isOpen={isExpanded} default={defaultNodeIcon} />
          <span className="truncate font-medium">{item.name}</span>
          <TreeActions isSelected={selectedItemId === item.id}>{item.actions}</TreeActions>
        </AccordionTrigger>
        <AccordionContent className="ml-6 border-l border-gray-200 pl-6 dark:border-gray-700">
          <TreeItem
            data={item.children!} // TreeNode는 항상 children을 가짐
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            defaultLeafIcon={defaultLeafIcon}
            defaultNodeIcon={defaultNodeIcon}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            draggedItem={draggedItem}
          />
        </AccordionContent>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  );
};

const TreeLeaf = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    item: TreeDataItem;
    selectedItemId?: string;
    handleSelectChange: (item: TreeDataItem | undefined) => void;
    defaultLeafIcon?: React.ComponentType<{ className?: string }>;
    handleDragStart?: (item: TreeDataItem) => void;
    handleDrop?: (item: TreeDataItem) => void;
    draggedItem: TreeDataItem | null;
  }
>(({ className, item, selectedItemId, handleSelectChange, defaultLeafIcon, handleDragStart, handleDrop, draggedItem, ...props }, ref) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const onDragStart = (e: React.DragEvent) => {
    if (!item.draggable || item.disabled) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', item.id);
    handleDragStart?.(item);
    e.stopPropagation();
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // [FIX] 리프(파일)는 기본적으로 드롭 불가. droppable: true가 명시된 경우에만 허용.
    if (item.droppable === true && !item.disabled && draggedItem && draggedItem.id !== item.id) {
      setIsDragOver(true);
    }
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    if (item.disabled || item.droppable !== true) return;
    e.preventDefault();
    setIsDragOver(false);
    handleDrop?.(item);
    e.stopPropagation();
  };

  return (
    <div
      ref={ref}
      className={cn(
        'text-left',
        treeVariants(),
        className,
        selectedItemId === item.id && selectedTreeVariants(),
        isDragOver && dragOverVariants(),
        item.disabled && 'pointer-events-none cursor-not-allowed opacity-50'
      )}
      onClick={() => {
        if (item.disabled) return;
        handleSelectChange(item);
        item.onClick?.();
      }}
      draggable={false}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      {...props}
    >
      <span className="absolute top-[calc(50%-1px)] -left-6 h-px w-6 bg-gray-200 dark:bg-gray-700"></span>
      <DragHandle item={item} onDragStart={onDragStart} />
      <TreeIcon item={item} isSelected={selectedItemId === item.id} default={defaultLeafIcon} />
      <div className="flex flex-grow items-center gap-2 truncate">
        <span className="truncate">{item.name}</span>
        {item.type && <span className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">{item.type}</span>}
      </div>
      <TreeActions isSelected={selectedItemId === item.id && !item.disabled}>{item.actions}</TreeActions>
    </div>
  );
});
TreeLeaf.displayName = 'TreeLeaf';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn('flex w-full flex-1 items-center transition-all first:[&[data-state=open]>svg]:first-of-type:rotate-90', className)}
      {...props}
    >
      <ChevronRight className="mr-2 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 dark:text-gray-500" />
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn('data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all', className)}
    {...props}
  >
    <div>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const TreeIcon = ({
  item,
  isOpen,
  isSelected,
  default: defaultIcon,
}: {
  item: TreeDataItem;
  isOpen?: boolean;
  isSelected?: boolean;
  default?: React.ComponentType<{ className?: string }>;
}) => {
  let Icon = defaultIcon; // 1. Prop으로 받은 기본 아이콘

  // 2. 타입별 자동 매칭 아이콘
  if (!item.icon && item.type) {
    if (item.type === 'Text') Icon = Type;
    else if (item.type === 'Media') Icon = Image;
    else if (item.type === 'JSON') Icon = FileJson;
  }

  // 3. 사용자 정의 아이콘 (최우선)
  if (isSelected && item.selectedIcon) Icon = item.selectedIcon;
  else if (isOpen && item.openIcon) Icon = item.openIcon;
  else if (item.icon) Icon = item.icon;

  // 4. Prop이나 타입으로 매칭된 아이콘이 없으면, 내부 기본값 사용
  if (!Icon) {
    Icon = item.children ? FolderIcon : FileIcon;
  }

  return Icon ? <Icon className="mr-3 h-5 w-5 shrink-0" /> : <></>;
};

const TreeActions = ({ children }: { children: React.ReactNode; isSelected: boolean }) => {
  return <div className={cn('ml-auto')}>{children}</div>;
};

// [FIX] TreeView와 TreeDataItem 타입을 named export 합니다.
export { TreeView };
