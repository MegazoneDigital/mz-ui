'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SearchIcon, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface SimpleTextInputProps {
  titleLabel?: string;
  titlePlaceholder?: string;
  descriptionLabel?: string;
  descriptionPlaceholder?: string;
  onTitleChange?: (value: string) => void;
  onDescriptionChange?: (value: string) => void;
}

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onChange?: (value: string) => void;
}

// 간단한 텍스트 영역 입력 양식 템플릿
export const SimpleTextInputTemplate = ({
  titleLabel = '제목',
  titlePlaceholder = '제목을 입력하세요',
  descriptionLabel = '설명',
  descriptionPlaceholder = '설명을 입력하세요',
  onTitleChange,
  onDescriptionChange,
}: SimpleTextInputProps = {}) => {
  return (
    <div className="w-full max-w-lg space-y-6">
      {/* 제목 입력 필드 */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          {titleLabel}
        </Label>
        <Input id="title" name="title" type="text" placeholder={titlePlaceholder} onChange={e => onTitleChange?.(e.target.value)} className="w-full" />
      </div>

      {/* 설명 입력 필드 */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          {descriptionLabel}
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder={descriptionPlaceholder}
          rows={4}
          onChange={e => onDescriptionChange?.(e.target.value)}
          className="w-full resize-none"
        />
      </div>
    </div>
  );
};

// 검색 입력 양식 템플릿
export const SearchInputTemplate = ({ placeholder = '검색어를 입력하세요...', onSearch, onClear, onChange }: SearchInputProps = {}) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onChange?.(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-lg">
      {/* 검색 아이콘 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </div>

      {/* 검색 입력 필드 */}
      <Input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="w-full pr-10 pl-10"
      />

      {/* Clear 버튼 */}
      {searchValue.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 transition-colors duration-200 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400"
        >
          <XIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export const InputTemplateCollection = () => {
  return (
    <div className="space-y-8 p-6">
      <h2 className="mb-4 text-xl font-semibold">입력 양식 템플릿 모음</h2>
      {/* 간단한 텍스트 입력 템플릿 */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-medium">간단한 텍스트 영역 입력</h3>
        <SimpleTextInputTemplate onTitleChange={value => console.log('제목 변경:', value)} onDescriptionChange={value => console.log('설명 변경:', value)} />
      </div>

      {/* 검색 입력 템플릿 */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-medium">검색 입력 양식</h3>
        <SearchInputTemplate
          placeholder="제품, 브랜드, 카테고리 검색..."
          onSearch={value => console.log('검색 실행:', value)}
          onClear={() => console.log('검색어 초기화')}
          onChange={value => console.log('입력 변경:', value)}
        />
      </div>
    </div>
  );
};
