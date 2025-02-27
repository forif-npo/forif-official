interface SelectOption {
  value: string;
  label: string;
}

const BLOG_TAG_OPTIONS: SelectOption[] = [
  {
    value: 'FRONTEND',
    label: '프런트엔드',
  },
  {
    value: 'BACKEND',
    label: '백엔드',
  },
  {
    value: 'AI',
    label: '인공지능',
  },
  {
    value: 'DATA ANALYSIS',
    label: '데이터 분석',
  },
  {
    value: 'DESIGN',
    label: '디자인',
  },
  {
    value: 'FORIF TEAM',
    label: '포리프 팀',
  },
  {
    value: 'TRAVEL',
    label: '여행',
  },
];

export { BLOG_TAG_OPTIONS };
