(() => {
  const init = () => {
    const body = document.body;
    if (!body.classList.contains('cosmic-atlas-page')) return;

    const stage = document.getElementById('atlasStage');
    const canvas = document.getElementById('spaceCanvas');
    const miniMap = document.getElementById('miniMap');
    const miniWrap = miniMap?.closest('.mini-map-wrap');
    const miniHead = miniWrap?.querySelector('.mini-head');
    const positionLabel = document.getElementById('positionLabel');
    const zoomLabel = document.getElementById('zoomLabel');
    const resetButton = document.getElementById('resetButton');
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    const objectPanel = document.getElementById('objectPanel');
    const panelClose = document.getElementById('panelClose');
    const intro = document.getElementById('introPanel');

    if (!stage || !canvas || !miniMap || !miniWrap || !positionLabel || !zoomLabel) return;

    const MAP_SCALE = 0.095;
    const MAP_CENTER = { x: miniMap.width / 2, y: miniMap.height / 2 };
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

    const readCamera = () => {
      const text = positionLabel.textContent || '+000 / +000';
      const parts = text.split('/').map((part) => part.trim().replace('−', '-'));
      const x = Number(parts[0]) || 0;
      const y = Number(parts[1]) || 0;
      const zoom = Number((zoomLabel.textContent || '1').replace('×', '')) || 1;
      return { x, y, zoom };
    };

    const formatCoord = (value) => `${value >= 0 ? '+' : '−'}${String(Math.abs(Math.round(value))).padStart(3, '0')}`;

    const dispatchCameraDrag = (targetX, targetY) => {
      const current = readCamera();
      const startX = window.innerWidth * 0.5;
      const startY = window.innerHeight * 0.5;
      const moveX = startX + (current.x - targetX) * current.zoom;
      const moveY = startY + (current.y - targetY) * current.zoom;
      const pointerId = 9017;

      const originalCapture = canvas.setPointerCapture;
      try {
        canvas.setPointerCapture = () => {};
        canvas.dispatchEvent(new PointerEvent('pointerdown', {
          pointerId,
          pointerType: 'mouse',
          clientX: startX,
          clientY: startY,
          button: 0,
          buttons: 1,
          bubbles: true
        }));
      } finally {
        canvas.setPointerCapture = originalCapture;
      }

      canvas.dispatchEvent(new PointerEvent('pointermove', {
        pointerId,
        pointerType: 'mouse',
        clientX: moveX,
        clientY: moveY,
        buttons: 1,
        bubbles: true
      }));
      canvas.dispatchEvent(new PointerEvent('pointerup', {
        pointerId,
        pointerType: 'mouse',
        clientX: moveX,
        clientY: moveY,
        button: 0,
        buttons: 0,
        bubbles: true
      }));

      intro?.classList.add('gone');
    };

    const miniPointToWorld = (clientX, clientY) => {
      const rect = miniMap.getBoundingClientRect();
      const localX = clamp((clientX - rect.left) / Math.max(rect.width, 1), 0, 1) * miniMap.width;
      const localY = clamp((clientY - rect.top) / Math.max(rect.height, 1), 0, 1) * miniMap.height;
      return {
        x: clamp((localX - MAP_CENTER.x) / MAP_SCALE, -980, 980),
        y: clamp((localY - MAP_CENTER.y) / MAP_SCALE, -760, 760),
        localX,
        localY
      };
    };

    miniMap.tabIndex = 0;
    miniMap.setAttribute('role', 'application');
    miniMap.setAttribute('aria-label', 'Overview navigation map. Click or drag to move the main atlas view.');
    miniWrap.classList.add('is-interactive');

    const hint = document.createElement('span');
    hint.className = 'mini-hint';
    hint.textContent = 'CLICK / DRAG TO MOVE';
    miniHead?.appendChild(hint);

    const coordinateTip = document.createElement('span');
    coordinateTip.className = 'mini-coordinate-tip';
    miniWrap.appendChild(coordinateTip);

    let mapDragging = false;
    let lastMapMove = 0;

    const updateMiniTip = (event) => {
      const point = miniPointToWorld(event.clientX, event.clientY);
      coordinateTip.textContent = `${formatCoord(point.x)} / ${formatCoord(point.y)}`;
      const rect = miniMap.getBoundingClientRect();
      const left = clamp(event.clientX - rect.left, 28, rect.width - 28);
      const top = clamp(event.clientY - rect.top, 20, rect.height - 12);
      coordinateTip.style.left = `${left}px`;
      coordinateTip.style.top = `${top + (miniHead?.getBoundingClientRect().height || 28)}px`;
      coordinateTip.classList.add('show');
      return point;
    };

    const navigateFromOverview = (event) => {
      const point = updateMiniTip(event);
      dispatchCameraDrag(point.x, point.y);
    };

    miniMap.addEventListener('pointerdown', (event) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return;
      event.preventDefault();
      mapDragging = true;
      miniMap.setPointerCapture?.(event.pointerId);
      navigateFromOverview(event);
    });

    miniMap.addEventListener('pointermove', (event) => {
      updateMiniTip(event);
      if (!mapDragging) return;
      const now = performance.now();
      if (now - lastMapMove < 70) return;
      lastMapMove = now;
      navigateFromOverview(event);
    });

    const stopMapDrag = (event) => {
      mapDragging = false;
      try { miniMap.releasePointerCapture?.(event.pointerId); } catch {}
    };
    miniMap.addEventListener('pointerup', stopMapDrag);
    miniMap.addEventListener('pointercancel', stopMapDrag);
    miniMap.addEventListener('pointerleave', () => {
      if (!mapDragging) coordinateTip.classList.remove('show');
    });

    const backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'atlas-overview-backdrop';
    backdrop.setAttribute('aria-label', 'Close overview map');
    stage.appendChild(backdrop);

    const closeOverview = () => {
      stage.classList.remove('overview-open', 'overview-expanded');
      coordinateTip.classList.remove('show');
    };
    const openOverview = () => {
      stage.classList.add('overview-open');
      if (!isMobile()) stage.classList.add('overview-expanded');
      window.setTimeout(() => miniMap.focus({ preventScroll: true }), 40);
    };
    const toggleOverview = () => stage.classList.contains('overview-open') ? closeOverview() : openOverview();
    backdrop.addEventListener('click', closeOverview);

    const closeMini = document.createElement('button');
    closeMini.type = 'button';
    closeMini.className = 'mini-close';
    closeMini.setAttribute('aria-label', 'Close overview');
    closeMini.textContent = '×';
    closeMini.addEventListener('click', closeOverview);
    miniHead?.appendChild(closeMini);

    const dock = document.createElement('nav');
    dock.className = 'atlas-mobile-dock';
    dock.setAttribute('aria-label', 'Atlas navigation controls');
    dock.innerHTML = `
      <button type="button" data-action="overview"><span class="dock-icon">⌗</span><span>MAP</span></button>
      <button type="button" data-action="home"><span class="dock-icon">◎</span><span>HOME</span></button>
      <button type="button" data-action="out" aria-label="Zoom out"><span class="dock-icon">−</span><span>OUT</span></button>
      <button type="button" data-action="in" aria-label="Zoom in"><span class="dock-icon">+</span><span>IN</span></button>
    `;
    stage.appendChild(dock);

    dock.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) return;
      const action = button.dataset.action;
      if (action === 'overview') toggleOverview();
      if (action === 'home') { closeOverview(); resetButton?.click(); }
      if (action === 'out') zoomOutButton?.click();
      if (action === 'in') zoomInButton?.click();
    });

    const keyboardHelp = document.createElement('div');
    keyboardHelp.className = 'atlas-keyboard-help';
    keyboardHelp.innerHTML = '<span>WASD / ARROWS</span> PAN <i></i><span>+/−</span> ZOOM <i></i><span>O</span> OVERVIEW <i></i><span>H</span> HOME';
    stage.appendChild(keyboardHelp);

    const moveByKeyboard = (dx, dy) => {
      const current = readCamera();
      const distance = 115 / Math.max(current.zoom, .25);
      dispatchCameraDrag(
        clamp(current.x + dx * distance, -980, 980),
        clamp(current.y + dy * distance, -760, 760)
      );
    };

    window.addEventListener('keydown', (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target?.isContentEditable) return;

      const key = event.key.toLowerCase();
      if (key === 'escape') {
        closeOverview();
        if (objectPanel?.classList.contains('open')) panelClose?.click();
        return;
      }
      if (key === 'o') { event.preventDefault(); toggleOverview(); return; }
      if (key === 'h' || key === '0') { event.preventDefault(); closeOverview(); resetButton?.click(); return; }
      if (key === '+' || key === '=') { event.preventDefault(); zoomInButton?.click(); return; }
      if (key === '-' || key === '_') { event.preventDefault(); zoomOutButton?.click(); return; }
      if (key === 'arrowleft' || key === 'a') { event.preventDefault(); moveByKeyboard(-1, 0); }
      if (key === 'arrowright' || key === 'd') { event.preventDefault(); moveByKeyboard(1, 0); }
      if (key === 'arrowup' || key === 'w') { event.preventDefault(); moveByKeyboard(0, -1); }
      if (key === 'arrowdown' || key === 's') { event.preventDefault(); moveByKeyboard(0, 1); }
    });

    miniMap.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (isMobile()) closeOverview();
      }
    });

    const syncResponsiveState = () => {
      if (!isMobile()) {
        stage.classList.remove('overview-open');
        stage.classList.remove('overview-expanded');
      } else {
        stage.classList.remove('overview-expanded');
      }
    };
    window.addEventListener('resize', syncResponsiveState, { passive: true });
    syncResponsiveState();
  };

  if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
