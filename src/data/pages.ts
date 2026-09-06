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
  }
];
