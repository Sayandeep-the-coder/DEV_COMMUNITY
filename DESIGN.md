---
name: Terminal Core
colors:
  background: '#000000'
  surface: '#000000'
  surface-dim: '#000000'
  surface-bright: '#121212'
  surface-container-lowest: '#030303'
  surface-container-low: '#080808'
  surface-container: '#0e0e0e'
  surface-container-high: '#1a1a1a'
  surface-container-highest: '#262626'
  on-surface: '#ffffff'
  on-surface-variant: 'rgba(255, 255, 255, 0.6)'
  outline: 'rgba(255, 255, 255, 0.08)'
  outline-variant: 'rgba(255, 255, 255, 0.12)'
  primary: '#00d55b'
  on-primary: '#000000'
  primary-container: 'rgba(0, 213, 91, 0.1)'
  on-primary-container: '#00ff66'
  secondary: '#00ff66'
  on-secondary: '#000000'
  tertiary: '#00fff9'
  on-tertiary: '#000000'
  error: '#ff00c1'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '900'
    lineHeight: '1.0'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: Courier New, monospace
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.2em
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 24px
---

# Design System: The Cybernetic Greenhouse

## 1. Creative North Star & Brand Identity
The Creative North Star for the Dev Community KGEC platform is **"The Cybernetic Greenhouse"** (internally designated as **"The Terminal Core"**). 

This theme represents the synthesis of mechanical, high-density terminal programming interfaces with organic growth, mentorship, and student collaboration. It rejects standard, clean corporate SaaS layouts in favor of an immersive **Hacker-Console aesthetic** illuminated by high-contrast emerald green light. It is optimized for engineering builders who appreciate speed, visual cues, and tactical layouts.

### Emotional Response & Visual Pillars
- **Technical Rigor & Playfulness**: Evokes the vibe of an elite developer terminal, but keeps it welcoming and alive with animated background elements.
- **Micro-Animations & Illumination**: Interactive elements trigger reactive states, neon borders, custom caret animations, and glowing text sweeps.
- **Asymmetric Grid Structure**: Layouts leverage modular containers with sharp/curved contrasts, floating visual elements, and edge-to-edge full-bleed typography.

---

## 2. Color System & Architectural Depth
Our colors are structured around an immersive dark environment to reduce eye strain and maximize the impact of emerald and neon elements.

### Color Tokens
- **The Obsidian Canvas (`background` / `surface`):** Pure `#000000`. We reject off-blacks for the primary background to achieve an infinite depth.
- **The Core Accent (`primary` / `--accent`):** `#00d55b` (Emerald Green). Used as the high-energy light source that guides the eye.
- **High Frequency Spark (`secondary` / `--accent-light`):** `#00ff66` (Neon Green). Reserved for critical actions, focused elements, and pulsing indicators.
- **The Cyber Glow (`--accent-glow`):** `rgba(0, 213, 91, 0.3)`. An outer-glow backdrop filter that provides organic volumetric lighting.
- **Terminal Glass Overlay:** Hex `#0e0e0e` mixed with a `20px` backdrop blur to form floating glass consoles.

### Section Borders & Grid Mesh
- **The "Soft Boundary" Rule**: Explicit hard borders are used sparingly. Sections blend together through backdrop-filter shifts or subtle horizontal marquee breaks.
- **Cyber Mesh Overlay**: A repeating linear gradient simulates vertical CRT scanlines and subtle chromatic aberration to enhance the hacker terminal atmosphere:
  ```css
  background-image: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), 
                    linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06));
  background-size: 100%_4px, 3px_100%;
  ```

---

## 3. Typography Strategy
We implement a hybrid font stack to maintain readability while sustaining the terminal aesthetic.

- **Editorial Headings (`Inter` / System-UI Sans):** Used for large headers, title screens, and main statements. Headings feature extremely tight tracking (`-0.03em` on display sizes) and bold, heavy weights to imply structural authority.
- **Technical Readouts & UI Metadata (Monospace):** Used for navigation links, inline code, status tags, domain logs, buttons, and custom bullet items. It forces numerical values and labels into consistent block sizes.
- **Brackets `[ ]` Annotation:** Interactive monospaced text elements are wrapped inside structural brackets when hovered or clicked, reinforcing the terminal prompt feeling.

---

## 4. Elevation, Depth & Shapes
We communicate structure using **Tonal Layering** and **Tactile Geometry** rather than standard shadows.

### Tonal Stacking
1. **Level 0 (Space Void):** `#000000` (Base background).
2. **Level 1 (Console Panels):** `#030303` with a thin `rgba(255, 255, 255, 0.03)` outline.
3. **Level 2 (Active Cards):** `#0e0e0e` with a reactive `rgba(0, 213, 91, 0.12)` border.

### Shape Philosophy
Containers combine **curved architectural corners** (`8px` to `16px` border-radius) with **rigid sharp corners** (`0px`) on accents. This creates a "manufactured" appearance.
- **Tech Brackets**: Key cards feature absolute-positioned border-bracket accents at the four corners. These accents shift from subtle gray to glowing emerald on hover to indicate tactile focus.

---

## 5. Main Component Primitives

### 1. Interactive Header (Navbar)
- **Design**: Blurry glass bar sticking to the top of the viewport.
- **Hover Action**: Monospace nav items reveal neon green brackets `[` and `]` sliding in from the sides.
- **Primary CTA ("Join Us")**: Ghost button with tech corner brackets that fills with an emerald slide-up transition on hover.

### 2. The Climax Hero Scroll Track
- **Mechanism**: A canvas preloader scrubbing 113-267 frames of fluid hand gestures.
- **Ambient Lighting**: Animated green gradient blobs floating slowly behind the mesh.
- **Typewriter Effect**: Fading, layered welcome headings that guide the user step-by-step down the scroll hierarchy.

### 3. ScrollStack Initiatives Showcase
- **Layout**: Stacking card system where cards slide over each other with scale-down offsets.
- **Accents**: Tech bracket corners, uppercase monospaced tags (`LEARN`, `BUILD`, `CONTRIBUTE`, `NETWORK`), and numerical logs (`[01]`, `[02]`, etc.).

### 4. Ecosystem Domain Console
- **Structure**: A simulated system shell split into a left-side command tab and a right-side terminal viewer.
- **Visuals**: Features terminal top dots (red/yellow/green), a customized console readout prompt, and responsive tags detailing technologies.

### 5. CRT Vintage Footer
- **Theme**: Vintage computer monitor.
- **Effects**: Vignette shadow, CRT scanlines, and an active multi-column bass-bar visualizer that represents community frequency.
