'use client';

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

      function findPathToTarget(items: TreeDataItem[], targetId: string): boolean {
        for (const item of items) {
          if (item.id === targetId) {
            return true;
          }
          if (item.children) {
            idsSet.add(item.id);
            if (findPathToTarget(item.children, targetId)) {
              return true;
            }
            idsSet.delete(item.id);
          }
        }
        return false;
      }

      if (expandAll) {
        collectAllNodeIds(dataArray);
      } else if (initialSelectedItemId) {
        findPathToTarget(dataArray, initialSelectedItemId);
      }

      return Array.from(idsSet);
    });

    // [최적화: 부모 탐색을 위해 Map 캐싱]
    const parentMap = React.useMemo(() => {
      const dataArray = Array.isArray(data) ? data : [data];
      return buildParentMap(dataArray);
    }, [data]);

    React.useEffect(() => {
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

      function findPathToTarget(items: TreeDataItem[], targetId: string): boolean {
        for (const item of items) {
          if (item.id === targetId) {
            return true;
          }
          if (item.children) {
            idsSet.add(item.id);
            if (findPathToTarget(item.children, targetId)) {
              return true;
            }
            idsSet.delete(item.id);
          }
        }
        return false;
      }

      if (expandAll) {
        collectAllNodeIds(dataArray);
        setExpandedItemIds(Array.from(idsSet));
      } else if (initialSelectedItemId) {
        findPathToTarget(dataArray, initialSelectedItemId);
        setExpandedItemIds(Array.from(idsSet));
      }
    }, [data, expandAll, initialSelectedItemId]);

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
  // [최적화: Set을 사용한 빠른 includes]
  const expandedSet = React.useMemo(() => new Set(expandedItemIds), [expandedItemIds]);
  const [isExpanded, setIsExpanded] = React.useState(expandedSet.has(item.id));
  const [isDragOver, setIsDragOver] = React.useState(false);

  React.useEffect(() => {
    setIsExpanded(expandedSet.has(item.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (item.droppable === false) return;
    handleDrop?.(item);
    e.stopPropagation();
  };

  return (
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
            data={item.children!}
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
  let Icon = defaultIcon;

  if (!item.icon && item.type) {
    if (item.type === 'Text') Icon = Type;
    else if (item.type === 'Media') Icon = Image;
    else if (item.type === 'JSON') Icon = FileJson;
  }

  if (isSelected && item.selectedIcon) Icon = item.selectedIcon;
  else if (isOpen && item.openIcon) Icon = item.openIcon;
  else if (item.icon) Icon = item.icon;

  if (!Icon) {
    Icon = item.children ? FolderIcon : FileIcon;
  }

  return Icon ? <Icon className="mr-3 h-5 w-5 shrink-0" /> : <></>;
};

const TreeActions = ({ children }: { children: React.ReactNode; isSelected: boolean }) => {
  return <div className={cn('ml-auto')}>{children}</div>;
};

export { TreeView };
