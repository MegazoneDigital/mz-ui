import { InputTemplateCollection } from '@/components/InputTemplateCollection';
import { Meta, StoryObj } from '@storybook/react';
import { CustomDocsPage } from '../src/components/CustomDocsPage';

const meta: Meta = {
  title: 'Components/InputTemplateCollection',
  component: InputTemplateCollection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `한 번에 하나씩 표시되는 계층화된 콘텐츠 섹션(탭 패널) 세트입니다. 부드러운 애니메이션과 함께 밑줄 및 Pills 변형을 포함합니다.

## 주요 기능
- **애니메이션 인디케이터**: 활성 탭을 따라가는 부드러운 밑줄 애니메이션
- **키보드 내비게이션**: 키보드 내비게이션을 통한 완전한 접근성 지원  
- **제어형/비제어형**: 제어형(value prop 사용)과 비제어형 상태 모두 지원
- **다양한 변형**: 밑줄(기본값) 및 Pills 스타일링 옵션
- **커스텀 브랜드 색상**: #271fe0으로 커스터마이징된 활성 탭 색상
- **ResizeObserver**: 창 크기 조정 시 인디케이터 위치 자동 조정`,
      },
      page: () => <CustomDocsPage componentName="InputTemplateCollection" description="인풋들의 모음" installationDeps={[]} implementationCode={''} />,
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof InputTemplateCollection> = {};
