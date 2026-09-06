export interface GalleryPage {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: 'live' | 'draft';
  href: string;
}

export const galleryPages: GalleryPage[] = [
  {
    slug: 'signal-orbit',
    title: 'Signal Orbit',
    description: '분산 시스템의 요청 흐름을 우주 궤도처럼 표현한 비주얼 랜딩 페이지.',
    category: 'System Design',
    status: 'live',
    href: '/showcase/signal-orbit/'
  },
  {
    slug: 'gravity-field',
    title: 'Gravity Field',
    description: '포인터의 힘으로 입자와 타이포그래피를 휘게 만드는 인터랙티브 비주얼 페이지.',
    category: 'Interaction',
    status: 'live',
    href: '/showcase/gravity-field/'
  }
];
