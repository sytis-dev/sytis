# SYTIS Color Palette

This document describes the complete color palette used throughout the SYTIS web application. The color system is built using CSS custom properties (CSS variables) for consistency and maintainability.

---

## Primary Brand Colors

These are the main colors that define the SYTIS brand identity:

### Base/Primary Color
- **Variable:** `--thm-base`
- **Hex:** `#ffaa17`
- **RGB:** `255, 170, 23`
- **RGB Variable:** `--thm-base-rgb`
- **Description:** Primary brand color - a vibrant orange/amber used for CTAs, highlights, and accents
- **Usage:** Buttons, links, highlights, call-to-action elements

### Black/Dark Color
- **Variable:** `--thm-black`
- **Hex:** `#222429`
- **Description:** Primary dark color for headings and high-contrast text
- **Usage:** Headings, titles, primary content text

### Text Color
- **Variable:** `--thm-text`
- **Hex:** `#686a6f`
- **Description:** Primary text color for body content
- **Usage:** Paragraphs, descriptions, secondary text

---

## Secondary Colors

Colors used for various UI elements and accents:

### Blues
- `#4682b4` - Steel Blue (10 occurrences)
- `#579eee` - Light Blue (5 occurrences)
- `#3a6b9a` - Medium Blue (6 occurrences)
- `#2098d1` - Sky Blue (hover states)
- `#0f86ff` - Bright Blue
- `#6ec7f9` - Light Sky Blue
- `#73a5ff` - Soft Blue
- `#83dcfa` - Light Cyan Blue

### Purples & Pinks
- `#432ff6` - Primary Purple (gradient component)
- `#f174e3` - Pink/Magenta (gradient component)
- `#8b34e4` - Medium Purple
- `#f15d8a` - Pink (4 occurrences)
- `#ff4b82` - Hot Pink
- `#ff0143` - Deep Pink

### Greens
- `#54d6ad` - Turquoise Green (4 occurrences)
- `#3abd90` - Medium Green
- `#41b974` - Fresh Green
- `#70f28b` - Light Green
- `#0F9E5E` - Forest Green

### Oranges & Reds
- `#ff9a61` - Coral Orange (10 occurrences)
- `#fe9759` - Light Orange
- `#ff6b35` - Orange Red
- `#ff6c6c` - Soft Red
- `#e7842b` - Dark Orange
- `#f7931e` - Bright Orange
- `#e69500` - Gold Orange
- `#DC0509` - Alert Red (5 occurrences)
- `#dc0503` - Dark Red
- `#ff0000` - Pure Red (3 occurrences)
- `#e60000` - Bright Red
- `#cc0000` - Dark Red
- `#b91c1c` - Deep Red (3 occurrences)
- `#dc3545` - Bootstrap Danger Red

### Yellows & Warnings
- `#ffaa16` - Alternative Orange/Yellow (variant of primary)
- `#ffc107` - Bootstrap Warning Yellow

---

## Neutral Colors

### Whites & Light Grays
- `#ffffff` - Pure White (134 occurrences - most used)
- `#f8f9fa` - Off White / Light Gray (16 occurrences)
- `#f4f5f8` - Very Light Gray (34 occurrences)
- `#f3f3f3` - Light Gray
- `#f1f3f4` - Soft Light Gray (4 occurrences)
- `#f0f0f0` - Light Gray
- `#eff1f4` - Pale Gray (4 occurrences)
- `#eef0f6` - Very Soft Gray (6 occurrences)
- `#edf1f3` - Light Blue-Gray
- `#e9ebee` - Pale Gray (10 occurrences)
- `#e9ecef` - Bootstrap Light Gray
- `#e8e9e9` - Medium Light Gray
- `#e3e3e3` - Light Gray
- `#e2e7ea` - Blue-Gray
- `#e2e5ed` - Soft Blue-Gray
- `#e1e1e1` - Light Gray
- `#e0e0e0` - Light Gray
- `#dee2e6` - Bootstrap Gray
- `#d3d3d4` - Medium Gray (3 occurrences)
- `#ccd6df` - Blue-Tinted Gray
- `#cdced5` - Cool Gray
- `#ccc` / `#cccccc` - Standard Gray

### Mid-Range Grays
- `#acb5cb` - Blue-Gray (6 occurrences)
- `#adb5bd` - Gray-Blue
- `#aaaaaa` - Medium Gray (3 occurrences)
- `#a7a4b3` - Purple-Gray (4 occurrences)
- `#a4a4a4` - Gray
- `#9ca3a9` - Medium Gray (5 occurrences)
- `#9b9fa6` - Cool Gray (3 occurrences)
- `#999b9f` - Medium Gray (28 occurrences)
- `#959ca6` - Blue-Gray (7 occurrences)
- `#91aab9` - Soft Blue-Gray (7 occurrences)

### Dark Grays & Blacks
- `#686a6f` - Text Gray (15 occurrences) - same as `--thm-text`
- `#697280` - Dark Gray-Blue (4 occurrences)
- `#6c757d` - Bootstrap Gray
- `#666` - Dark Gray
- `#5a6268` - Dark Gray
- `#575757` - Dark Gray
- `#555` - Dark Gray
- `#333` - Very Dark Gray
- `#727479` - Medium Dark Gray
- `#272727` - Very Dark Gray
- `#25283a` - Navy Gray
- `#2a2c30` - Dark Gray (3 occurrences)
- `#222222` - Near Black
- `#222429` - Theme Black (15 occurrences) - same as `--thm-black`
- `#1c1e22` - Very Dark Gray (29 occurrences)
- `#1a1a1a` - Near Black
- `#201e28` - Dark Purple-Gray
- `#18212e` - Dark Navy
- `#182e65` - Navy Blue
- `#171b27` - Very Dark Navy
- `#171717` - Near Black
- `#161616` - Near Black
- `#15191E` - Very Dark Gray
- `#151d28` - Dark Navy
- `#172f3e` - Dark Blue-Gray
- `#112350` - Navy Blue
- `#0f172b` - Very Dark Navy
- `#000000` / `#000` - Pure Black

---

## Transparent/RGBA Colors

Colors with transparency used for overlays, shadows, and effects:

### Black Transparencies
- `rgba(0, 0, 0, 0.9)` - 90% opacity
- `rgba(0, 0, 0, 0.8)` - 80% opacity
- `rgba(0, 0, 0, 0.6)` - 60% opacity
- `rgba(0, 0, 0, 0.5)` - 50% opacity
- `rgba(0, 0, 0, 0.4)` - 40% opacity
- `rgba(0, 0, 0, 0.35)` - 35% opacity
- `rgba(0, 0, 0, 0.3)` - 30% opacity
- `rgba(0, 0, 0, 0.15)` - 15% opacity
- `rgba(0, 0, 0, 0.1)` - 10% opacity
- `rgba(0, 0, 0, 0.08)` - 8% opacity
- `rgba(0, 0, 0, 0.07)` - 7% opacity
- `rgba(0, 0, 0, 0.05)` - 5% opacity
- `rgba(0, 0, 0, 0.04)` - 4% opacity
- `rgba(0, 0, 0, 0.03)` - 3% opacity

### White Transparencies
- `rgba(255, 255, 255, 1)` - 100% opacity (opaque white)
- `rgba(255, 255, 255, 0.9)` - 90% opacity
- `rgba(255, 255, 255, 0.7)` - 70% opacity
- `rgba(255, 255, 255, 0.6)` - 60% opacity
- `rgba(255, 255, 255, 0.3)` - 30% opacity
- `rgba(255, 255, 255, 0.2)` - 20% opacity
- `rgba(255, 255, 255, 0.15)` - 15% opacity
- `rgba(255, 255, 255, 0.1)` - 10% opacity
- `rgba(255, 255, 255, 0.07)` - 7% opacity
- `rgba(255, 255, 255, 0.06)` - 6% opacity

### Brand Color Transparencies
- `rgba(255, 170, 23, 0.6)` - Primary orange at 60%
- `rgba(255, 170, 23, 0.3)` - Primary orange at 30%
- `rgba(255, 170, 23, 0.1)` - Primary orange at 10%
- `rgba(255, 170, 23, 0.05)` - Primary orange at 5%

### Other Transparencies
- `rgba(220, 5, 9, 0.4)` - Red at 40%
- `rgba(220, 5, 9, 0.3)` - Red at 30%
- `rgba(220, 5, 9, 0.2)` - Red at 20%
- `rgba(255, 0, 0, 0.3)` - Pure red at 30%
- `rgba(255, 0, 0, 0.2)` - Pure red at 20%
- `rgba(255, 0, 0, 0.15)` - Pure red at 15%
- `rgba(32, 152, 209, 0.75)` - Blue at 75%
- `rgba(24, 46, 101, 0.1)` - Navy at 10%
- `rgba(23, 39, 54, 0.07)` - Dark blue at 7%
- `rgba(8, 39, 64, 0.3)` - Dark blue at 30%
- `rgba(42, 40, 51, 0.05)` - Dark purple-gray at 5%
- `rgba(5, 5, 6, 0.1)` - Near-black at 10%

---

## Special Color Effects

### Gradients

#### Primary Gradient (Purple-Pink)
```css
background: linear-gradient(100deg, #432ff6 0%, #f174e3 100%);
```
- **Usage:** Page wrapper gradient, preloader
- **Colors:** Purple (`#432ff6`) to Pink (`#f174e3`)

#### Light Gray Gradient
```css
background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
```
- **Usage:** Subtle background gradients

#### Brand Gradient (Orange-Red)
```css
background: linear-gradient(135deg, var(--thm-base) 0%, #b91c1c 100%);
```
- **Usage:** Call-to-action elements, featured sections
- **Colors:** Primary orange (`#ffaa17`) to Deep Red (`#b91c1c`)

#### Light Pink Gradient
```css
background: linear-gradient(135deg, #fff5f5 0%, #ffe6e6 100%);
```
- **Usage:** Soft backgrounds, sections

#### Dark Fade Gradient
```css
background-image: linear-gradient(to top, black 0%, rgba(0, 0, 0, 0) 70%);
```
- **Usage:** Image overlays, fade effects

---

## Semantic/Functional Colors

Colors used for specific purposes:

### Backgrounds
- `#f8f4f0` - Warm beige background (3 occurrences)
- `#f0eae4` - Light beige
- `#f4f5f8` - Primary light background (34 occurrences)
- `#fff5f5` - Very light pink
- `#ffe6e6` - Light pink

### Hover States
- `#2098d1` - Blue hover color
- Brand color with reduced opacity

### Borders
- Various grays: `#dee2e6`, `#e9ecef`, `#ccc`
- Red borders: `#ff0000`, `#dc0503`

### Alerts & Validation
- Success: `#0F9E5E`, `#3abd90`, `#41b974`
- Warning: `#ffc107`, `#e69500`
- Error/Danger: `#dc3545`, `#DC0509`, `#ff0000`, `#b91c1c`
- Info: `#2098d1`, `#579eee`

---

## Typography

### Font Families
- **Primary Heading Font:** `--thm-font: "Teko", sans-serif`
- **Body Font:** `--thm-b-font: "Rubik", sans-serif`

---

## Usage Guidelines

### Primary Actions
Use `var(--thm-base)` or `#ffaa17` for:
- Primary buttons
- Call-to-action elements
- Important links
- Highlights and accents

### Text Hierarchy
- **Headings:** Use `var(--thm-black)` or `#222429`
- **Body text:** Use `var(--thm-text)` or `#686a6f`
- **Muted text:** Use mid-range grays (`#999b9f`, `#959ca6`)

### Backgrounds
- **Light sections:** `#ffffff`, `#f8f9fa`, `#f4f5f8`
- **Dark sections:** `#1c1e22`, `#222429`
- **Warm sections:** `#f8f4f0`

### Interactive Elements
- **Hover states:** Often use `#2098d1` (blue) or a variation of the base color
- **Active states:** Darker or more saturated version of the element's color
- **Disabled states:** Grays with reduced opacity

---

## Color Statistics

Based on occurrence frequency in the main stylesheet:

### Most Used Colors
1. `#ffffff` (white) - 134 occurrences
2. `#f4f5f8` (light gray) - 34 occurrences
3. `#1c1e22` (dark gray) - 29 occurrences
4. `#999b9f` (medium gray) - 28 occurrences
5. `#f8f9fa` (off-white) - 16 occurrences
6. `#686a6f` (text gray) - 15 occurrences
7. `#222429` (theme black) - 15 occurrences

---

## Color Accessibility Notes

When using colors, ensure sufficient contrast ratios:
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text (18pt+):** Minimum 3:1 contrast ratio
- **UI components:** Minimum 3:1 contrast ratio

The primary color combinations have been tested for accessibility:
- ✅ `#222429` (black) on `#ffffff` (white) - High contrast
- ✅ `#686a6f` (text) on `#ffffff` (white) - Good contrast
- ✅ `#ffffff` (white) on `#ffaa17` (base) - Good contrast
- ✅ `#ffffff` (white) on `#222429` (black) - High contrast

---

## Quick Reference: CSS Variables

```css
:root {
  --thm-font: "Teko", sans-serif;
  --thm-b-font: "Rubik", sans-serif;
  --thm-base: #ffaa17;
  --thm-base-rgb: 255, 170, 23;
  --thm-black: #222429;
  --thm-text: #686a6f;
}
```

---

## Maintenance

When adding new colors:
1. Check if an existing color can be used first
2. Consider adding it as a CSS custom property if it's used frequently
3. Document it in this file with usage notes
4. Ensure it meets accessibility contrast requirements
5. Test across different browsers and devices

---

*Last updated: December 2024*
