# Static Page Gallery

여러 개의 독립적인 정적 페이지를 한 프로젝트에 모으기 위한 Astro + TypeScript 스타터입니다.

## 왜 Astro인가

- `src/pages` 파일 구조가 그대로 URL이 되는 정적 사이트 친화적인 라우팅
- 기본적으로 정적 HTML을 생성하므로 페이지마다 React 런타임을 싣지 않아도 됨
- Vite 기반 개발 서버/빌드 파이프라인 사용
- 나중에 상호작용이 필요한 부분에만 React/Vue/Svelte island를 선택적으로 추가 가능

## 실행

```bash
npm install
npm run dev
```

프로덕션 빌드:

```bash
npm run build
npm run preview
```

## 구조

```text
src/
├─ components/          # 여러 페이지에서 공유하는 UI
│  └─ PageCard.astro
├─ data/
│  └─ pages.ts          # 갤러리 메타데이터/목록
├─ layouts/
│  └─ BaseLayout.astro  # 공통 head/body shell
├─ pages/
│  ├─ index.astro       # 전체 페이지 갤러리
│  └─ showcase/
│     └─ signal-orbit.astro  # 실제 샘플 페이지
└─ styles/
   └─ global.css        # 최소 공통 스타일/토큰
```

## 새 페이지 추가 방법

1. `src/pages/showcase/my-page.astro` 생성
2. 페이지 자체 디자인은 해당 파일에서 독립적으로 작성
3. `src/data/pages.ts`에 카드 메타데이터 추가
4. `/showcase/my-page/` 경로로 자동 생성

페이지별 디자인 격리를 유지하기 위해 전역 CSS에는 reset/토큰 정도만 두고, 실제 페이지 스타일은 각 `.astro` 파일의 scoped `<style>` 안에 두는 것을 권장합니다.

## React가 필요해지는 시점

다음 같은 UI가 생길 때 `@astrojs/react`, `react`, `react-dom`을 추가하면 됩니다.

- 드래그 가능한 시각화
- 복잡한 상태를 가진 시뮬레이터
- 클라이언트 데이터 필터/검색
- canvas/WebGL 기반 인터랙션

그 전까지는 Astro만 사용하는 편이 출력물과 구조가 더 단순합니다.
