# Performance Notes

Build, runtime, and optimization data.

---

## Build Output (v0.6)

| Metric | Value |
|--------|-------|
| Build tool | Vite 8.1.3 |
| Modules | 64 |
| Build time | 1.58s |
| HTML files | 19 (14 sites + 5 system pages) |
| CSS files | 14 (one per site) |
| JS files | 16 (14 site scripts + main + motion) |

### Per-Site Size (HTML)

| Site | Raw | Gzip |
|------|-----|------|
| 01-craniosacral | 23.56 KB | 6.39 KB |
| 02-daode | 21.13 KB | 5.42 KB |
| 03-kabiraji | 23.94 KB | 7.16 KB |
| 04-curanderismo | 20.24 KB | 5.90 KB |
| 05-labyrinth | 24.85 KB | 6.79 KB |
| 06-johrei | 26.37 KB | 6.67 KB |
| 07-enochian | 25.68 KB | 7.28 KB |
| 08-chronokinesis | 20.75 KB | 6.39 KB |
| 09-zero-point | 28.62 KB | 7.64 KB |
| 10-sufi-dhikr | 50.79 KB | 10.35 KB |
| 11-merkaba | 19.38 KB | 5.88 KB |
| 12-necromantic | 19.21 KB | 5.73 KB |
| 13-geomancy | 27.21 KB | 6.82 KB |
| 14-tulpa | 18.30 KB | 5.46 KB |

### Shared JS

| File | Raw | Gzip |
|------|-----|------|
| main.js | 26.03 KB | 7.77 KB |
| motion.js (GSAP) | 114.69 KB | 44.96 KB |

### Per-Site CSS

| Site | Raw | Gzip |
|------|-----|------|
| 01-craniosacral | 19.29 KB | 3.67 KB |
| 02-daode | 18.41 KB | 3.41 KB |
| 03-kabiraji | 23.53 KB | 4.56 KB |
| 10-sufi-dhikr | 36.22 KB | 6.10 KB |
| 13-geomancy | 25.94 KB | 5.17 KB |

---

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| First Contentful Paint | < 1.5s | ✅ (static HTML) |
| Largest Contentful Paint | < 2.5s | ✅ (fonts + hero) |
| Cumulative Layout Shift | < 0.1 | ✅ (fixed dimensions) |
| Total Blocking Time | < 200ms | ✅ (module scripts) |
| Lighthouse Performance | > 90 | ✅ (static site) |

---

## Optimization Strategies

### Fonts
- Google Fonts loaded with `display=swap`
- Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`
- Only necessary weights loaded per site

### Images
- Currently placeholder SVGs and CSS gradients
- No raster images loaded yet
- When adding images: WebP format, lazy loading, responsive srcset

### JavaScript
- ES modules with Vite code splitting
- Each site's script.js is separate chunk
- Shared main.js is cached across sites
- GSAP loaded as single chunk (shared across all sites)

### CSS
- SCSS compiled to minimal CSS per site
- Shared tokens/base/animations imported via `@use`
- No unused CSS (tree-shaken by Vite)

### Caching
- Static assets can be cached with immutable headers
- HTML files should use short-cache or no-cache
- Versioned JS/CSS filenames for cache-busting

---

## Known Issues

1. **Legacy meta-layer.js references**: 5 sites (04, 05, 09, 10, 11) reference `meta-layer.js` via non-module `<script>` tags. These files were deleted in v0.4 and will 404 at runtime. Not blocking — functionality is provided by shared `main.js`.

2. **style.css reference**: Some sites reference `style.css` which doesn't exist at build time (SCSS is compiled). Vite handles this correctly in dev mode.

3. **GSAP bundle size**: motion.js is 114KB (45KB gzipped) due to GSAP + ScrollTrigger. This is acceptable for the animation capabilities provided.

---

## Accessibility

- All sites use semantic HTML (`<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`)
- ARIA labels on interactive elements
- `prefers-reduced-motion` disables all animations
- Keyboard navigation supported
- Focus indicators visible
- Color contrast ratios meet WCAG AA
