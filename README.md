# Healing Sanctuaries

A collection of 14 cinematic, immersive websites for spiritual healing modalities. Each site features a dark, moody, high-end aesthetic with parallax effects, scroll animations, and elegant typography.

## Project Structure

```
healing-sanctuaries/
├── style.css              # Shared cinematic template styles
├── script.js              # Shared JavaScript (preloader, parallax, nav)
├── README.md              # This file
├── .gitignore
│
├── 01-craniosacral/       # Craniosacral Therapy — Deep Teal
├── 02-daode/              # Daode Xin Xi — Jade Green
├── 03-kabiraji/           # Kabiraji Healing — Earth Brown
├── 04-curanderismo/       # Curanderismo — Cardinal Red
├── 05-labyrinth/          # Labyrinth Walking — Mystical Purple
├── 06-johrei/             # Johrei — Gold
├── 07-enochian/           # Enochian Healing — Deep Midnight
├── 08-chronokinesis/      # Chronokinesis Healing — Burnt Orange
├── 09-zero-point/         # Zero-Point Field Healing — Electric Cyan
├── 10-sufi-dhikr/         # Sufi Dhikr Healing — Deep Crimson
├── 11-merkaba/            # Merkaba Light Body — Amethyst Purple
├── 12-necromantic/        # Necromantic Healing — Shadow Grey
├── 13-geomancy/           # Geomancy — Earthen Brown
└── 14-tulpa/              # Tulpa/Egregore Healing — Magenta Pink
```

Each modality folder contains:
- `index.html` — Complete single-page website
- `style.css` — Modality-specific accent color
- `script.js` — Links to shared script
- `images/` — Placeholder folder for generated images
- `image-prompts.txt` — 20 cinematic AI image prompts

## Modalities

| # | Modality | Healer | Location | Accent |
|---|----------|--------|----------|--------|
| 01 | Craniosacral Therapy | Dr. Maya Ravensong | Sedona, AZ | Deep Teal |
| 02 | Daode Xin Xi | Master Wei Linzhao | Berkeley, CA | Jade Green |
| 03 | Kabiraji Healing | Sensei Haruki Tanaka | Portland, OR | Earth Brown |
| 04 | Curanderismo | Maestra Rosa Esperanza | San Francisco, CA | Cardinal Red |
| 05 | Labyrinth Walking | Guide Sophia Lightweaver | Chartres, France | Mystical Purple |
| 06 | Johrei | Master Aiko Takahashi | Kyoto, Japan | Gold |
| 07 | Enochian Healing | Oracle Cassandra Nightshade | Glastonbury, UK | Deep Midnight |
| 08 | Chronokinesis Healing | Dr. Elijah Temporis | London, UK | Burnt Orange |
| 09 | Zero-Point Field Healing | Dr. Nova Celestine | Taos, NM | Electric Cyan |
| 10 | Sufi Dhikr Healing | Sheikh Rashid al-Qadiri | Konya, Turkey | Deep Crimson |
| 11 | Merkaba Light Body | Teacher Seraphina Lightbody | Mount Shasta, CA | Amethyst Purple |
| 12 | Necromantic Healing | Oracle Thorne Ashwood | Edinburgh, UK | Shadow Grey |
| 13 | Geomancy | Earth Keeper Rowan Stonecaller | Glastonbury, UK | Earthen Brown |
| 14 | Tulpa/Egregore Healing | Thought Weaver Celeste Mindheart | Sedona, AZ | Magenta Pink |

## How to Run

1. Open any `index.html` file directly in a browser
2. Or use a local server:
   ```bash
   # Python
   cd healing-sanctuaries
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

## Design Features

- **Dark Cinematic Aesthetic** — Deep blacks, charcoal backgrounds, golden accents
- **Preloader** — Counter animation on page load
- **Sticky Navigation** — Anchor links with mix-blend-mode
- **Parallax Effects** — Hero background parallax on scroll
- **Scroll Reveals** — Fade-in animations triggered by scroll
- **Hover Effects** — Card tilts, image zooms, underline transitions
- **Responsive** — Mobile, tablet, and desktop layouts
- **Reduced Motion** — Respects `prefers-reduced-motion`

## Tech Stack

- HTML5 (semantic)
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (no dependencies)
- Google Fonts (Playfair Display, Lora)

## Image Prompts

Each modality includes 20 cinematic image prompts in `image-prompts.txt` for use with AI image generators (Midjourney, DALL-E, etc.). Prompts cover:
- Hero shots
- Detail shots
- Environment/atmosphere
- Symbolic representations
- Healing ceremonies

## Quote

> "The wound is the place where the Light enters you." — Rumi

## License

Created for spiritual healing practitioners worldwide.
