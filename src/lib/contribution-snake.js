/**
 * Animate a decorative snake over a real contribution grid.
 * Mutates only the SVG segments and visited cells, without React frame renders.
 * @param {SVGSVGElement} svg
 */
export function createContributionSnake(svg) {
  const cells = Array.from(svg.querySelectorAll('[data-contribution]'));
  const segments = Array.from(svg.querySelectorAll('[data-snake-segment]'));
  const columns = Number(svg.dataset.columns);
  const cellByPosition = new Map(cells.map(cell => [`${cell.getAttribute('data-col')},${cell.getAttribute('data-row')}`, cell]));
  /** @type {number[][]} */
  const route = [];
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < 7; y++) route.push([x, x % 2 ? 6 - y : y]);
  }
  // Return outside the grid so the next loop begins without a jump through cells.
  const lastRow = route[route.length - 1][1];
  route.push([columns, lastRow]);
  for (let y = lastRow + 1; y <= 8; y++) route.push([columns, y]);
  for (let x = columns - 1; x >= -1; x--) route.push([x, 8]);
  for (let y = 7; y >= 0; y--) route.push([-1, y]);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false, visible = true, destroyed = false, frame = 0, step = -1, previousTime = 0, elapsed = 0;
  const consumed = new Set();
  function restore() {
    consumed.forEach(cell => cell.removeAttribute('data-eaten'));
    consumed.clear();
  }
  function draw() {
    segments.forEach((segment, index) => {
      const position = route[Math.max(0, step - index)];
      segment.setAttribute('transform', `translate(${position[0] * 11},${position[1] * 11 + 20})`);
      segment.setAttribute('opacity', step >= index ? String(1 - index * .1) : '0');
    });
    const cell = cellByPosition.get(route[step].join(','));
    if (cell && Number(cell.getAttribute('data-count')) > 0) {
      cell.setAttribute('data-eaten', 'true');
      consumed.add(cell);
    }
  }
  function tick(time) {
    if (destroyed || paused || reduced.matches || !visible || document.hidden) return;
    if (previousTime) elapsed += Math.min(time - previousTime, 250);
    previousTime = time;
    if (elapsed >= route.length * 130) { elapsed %= route.length * 130; step = -1; restore(); }
    const next = Math.floor(elapsed / 130);
    while (step < next) { step++; draw(); }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame);
    previousTime = 0;
    if (reduced.matches) {
      restore();
      segments.forEach(segment => segment.setAttribute('opacity', '0'));
      elapsed = 0; step = -1;
    }
    if (!destroyed && !paused && !reduced.matches && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  observer.observe(svg);
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
  return {
    /** @param {boolean} value */
    setPaused(value) { paused = value; sync(); },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      restore();
    },
  };
}
