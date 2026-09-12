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
    slug: 'afterimage',
    title: 'Afterimage',
    description: '색과 타이포그래피가 포인터 움직임 뒤에 잔상처럼 따라오는 키네틱 비주얼 실험.',
    category: 'Kinetic Type',
    status: 'live',
    href: '/showcase/afterimage/'
  },
  {
    slug: 'gravity-field',
    title: 'Gravity Field',
    description: '포인터의 힘으로 입자와 타이포그래피를 휘게 만드는 인터랙티브 비주얼 페이지.',
    category: 'Interaction',
    status: 'live',
    href: '/showcase/gravity-field/'
  },
  {
    slug: 'season-drift',
    title: 'Season Drift',
    description: '늦여름에서 초가을로 천천히 넘어가는 빛, 바람, 낙엽, 수면을 담은 계절 장면.',
    category: 'Ambient Scene',
    status: 'live',
    href: '/showcase/season-drift/'
  },
  {
    slug: 'pixel-mirage',
    title: 'Pixel Mirage',
    description: '8bit 모자이크와 착시 패턴이 포인터를 따라 변조되는 옵티컬 일루전 실험.',
    category: 'Optical Illusion',
    status: 'live',
    href: '/showcase/pixel-mirage/'
  },
  {
    slug: 'cosmic-atlas',
    title: 'Cosmic Atlas',
    description: '드래그와 줌으로 별자리에서 성운·성단, 은하, 은하단까지 스케일을 넘나드는 인터랙티브 우주 지도.',
    category: 'Spatial Atlas',
    status: 'live',
    href: '/showcase/cosmic-atlas/'
  }
];
