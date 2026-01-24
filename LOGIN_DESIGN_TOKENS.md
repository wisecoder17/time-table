# Login Page - Design System Quick Reference

## 🎨 Color Variables

```css
/* Brand Colors */
--brand-brick-1: #6b2e1e /* Primary warm brick */ --brand-brick-2: #4a1f14
  /* Deep brick (darker) */ --brand-gold-1: #ffd36b /* Bright gold accent */
  --brand-gold-2: #ffb800 /* Warm gold (darker) */ --brand-text: #fff7f0
  /* Main text (off-white) */ --brand-muted: #e7dccf
  /* Secondary text (cream) */ --brand-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
```

## 📐 Layout Grid

```
DESKTOP (1024px+)
┌──────────────────────────────────────────────────────┐
│ 50%               │               50%                │
│ Branding Panel    │  Authentication Form Panel       │
│ (Left Side)       │  (Right Side)                    │
└──────────────────────────────────────────────────────┘

TABLET (768-1024px)
┌──────────────────────────────────────────────────────┐
│ Branding Panel (35%)                                 │
├──────────────────────────────────────────────────────┤
│ Authentication Form Panel (65%)                      │
└──────────────────────────────────────────────────────┘

MOBILE (<768px)
┌──────────────────────────────────────────────────────┐
│ Branding Panel                                       │
├──────────────────────────────────────────────────────┤
│ Authentication Form Panel                           │
└──────────────────────────────────────────────────────┘
```

## 🔤 Typography

| Element     | Size    | Weight | Line Height | Letter Spacing |
| ----------- | ------- | ------ | ----------- | -------------- |
| Brand Title | 2.5rem  | 800    | 1.2         | -0.5px         |
| Form Title  | 2rem    | 800    | 1.2         | -0.5px         |
| Subtitle    | 0.95rem | 400    | 1.6         | normal         |
| Label       | 0.9rem  | 600    | normal      | normal         |
| Input Text  | 0.95rem | 500    | normal      | normal         |
| Help Text   | 0.85rem | 400    | 1.5         | normal         |
| Tagline     | 1.1rem  | 400    | 1.6         | normal         |

## 🎯 Component Specs

### Input Field

```css
Padding: 0.875rem 1rem 0.875rem 2.75rem
Background: rgba(0, 0, 0, 0.25)
Border: 1.5px solid rgba(255, 211, 107, 0.2)
Border Radius: 10px
Focus State:
  - Border: var(--brand-gold-1)
  - Shadow: 0 0 0 3px rgba(255, 211, 107, 0.1)
  - Background: rgba(0, 0, 0, 0.35)
```

### Primary Button (Gold)

```css
Width: 100%
Padding: 0.875rem 1.5rem
Background: linear-gradient(135deg, #ffd36b, #ffb800)
Color: #2b1609
Border Radius: 12px
Font Weight: 700
Letter Spacing: 0.5px
Box Shadow: 0 6px 18px rgba(255, 184, 0, 0.16)
Hover: transform: translateY(-2px)
```

### Card/Panel

```css
Background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.02))
Border: 1px solid rgba(255, 255, 255, 0.12)
Border Radius: 14px
Box Shadow: 0 10px 30px rgba(0, 0, 0, 0.45)
Backdrop Filter: blur(8px)
```

### Logo Box

```css
Width: 80px
Height: 80px
Background: linear-gradient(135deg, #ffd36b, #ffb800)
Border Radius: 16px
Box Shadow: 0 8px 24px rgba(255, 211, 107, 0.2)
Display: Flex (centered content)
Hover: transform: scale(1.05) rotate(-5deg)
```

## 🎭 States

### Input States

```
Default:
  Border: rgba(255, 211, 107, 0.2)
  Background: rgba(0, 0, 0, 0.25)

Focus:
  Border: #ffd36b (gold)
  Background: rgba(0, 0, 0, 0.35)
  Shadow: 0 0 0 3px rgba(255, 211, 107, 0.1)

Hover (not focused):
  Border: rgba(255, 211, 107, 0.4)
  Background: rgba(0, 0, 0, 0.3)

Error:
  Border: #ff6b6b (red)
  Background: rgba(255, 107, 107, 0.08)
  Shadow: 0 0 0 3px rgba(255, 107, 107, 0.1)
```

### Button States

```
Default:
  Opacity: 1
  Cursor: pointer

Hover:
  Transform: translateY(-2px)
  Box Shadow: 0 12px 30px rgba(255, 184, 0, 0.22)

Active:
  Transform: translateY(0)

Disabled:
  Opacity: 0.7
  Cursor: not-allowed
```

## 🔗 Links

### Forgot Password Link

```css
Color: #ffd36b (gold)
Font Weight: 600
Transition: all 0.3s ease
Underline: Animated on hover (width: 0 → 100%)
```

### Support Link

```css
Color: #ffd36b (gold)
Font Weight: 600
Hover: text-decoration: underline
```

## 🎬 Animations

### Entrance Animations

```
Branding Panel: slideInLeft 0.6s ease-out
Form Panel: slideInRight 0.6s ease-out
```

### Hover/Interaction Animations

```
Logo: scale(1.05) rotate(-5deg)
Button: translateY(-2px)
Links: width animation (0 → 100%)
Theme Toggle: scale(1.1)
```

### Background Animations

```
Floating Orbs:
  - First: 20s ease-in-out infinite
  - Second: 15s ease-in-out infinite reverse
```

## 🧩 Spacing Scale

```
XS: 0.5rem   (8px)   - Tight spacing
SM: 0.75rem  (12px)  - Small gaps
MD: 1rem     (16px)  - Default spacing
LG: 1.5rem   (24px)  - Large gaps
XL: 2.5rem   (40px)  - Extra large
2XL: 3rem    (48px)  - Panel padding
```

## 🛑 Error States

### Error Message

```css
Color: #ff8888 (soft red)
Font Size: 0.8rem
Font Weight: 500
Icon: ⚠ (warning symbol)
Spacing: 0.25rem gap
Margin Top: 0.25rem
```

### Input Error

```css
Border Color: #ff6b6b
Background: rgba(255, 107, 107, 0.08)
```

## 📱 Responsive Breakpoints

```
Desktop:   ≥1024px → Full grid layout
Tablet:    768-1024px → Stacked layout
Mobile:    480-768px → Single column
Small Mobile: <480px → Compact layout

Padding Adjustments:
  Desktop: 3rem
  Tablet:  2rem
  Mobile:  1.5rem
  Small:   1rem

Logo Size:
  Desktop: 80px
  Mobile:  60px
  Small:   60px
```

## ✨ Special Effects

### Glassmorphism (Glass Effect)

```css
Background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.02))
Border: 1px solid rgba(255, 255, 255, 0.12)
Backdrop Filter: blur(8px)
```

### Metallic Sheen (Button)

```css
Overlay gradient: linear-gradient(120deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.18))
Rotation: -25deg
Animation: Slides across button on interaction
```

### Floating Animation

```css
Transform: translateY(0px) → translateY(30px) → translateY(0px)
Duration: 20s / 15s (varies)
Timing: ease-in-out infinite
```

## 🔒 Form Features

### Input Group Structure

```
<div className="login-input-group">
  <label className="login-input-label">Label</label>
  <div className="login-input-wrapper">
    <icon className="login-input-icon"/>
    <input className="login-input-field"/>
  </div>
  <p className="login-error-message">Error text</p>
</div>
```

### Form Actions Row

```
<div className="login-form-actions">
  <label className="login-remember">
    <input type="checkbox"/>
    Remember me
  </label>
  <a className="login-forgot-link">Forgot password?</a>
</div>
```

## ♿ Accessibility

### ARIA Labels

```
- aria-label for icon buttons
- aria-describedby for error messages
- aria-label for checkboxes
```

### Focus Management

```
- Visible focus indicators (outlines)
- Tab order: Username → Password → Checkbox → Button → Links
- Keyboard accessible all interactive elements
```

### Color Contrast

```
- Gold on brown: ≥4.5:1 (AAA)
- White on brown: ≥7:1 (AAA)
- Error red on dark: ≥4.5:1 (AA)
```

## 🎨 Design Tokens Summary

| Token                 | Value                           |
| --------------------- | ------------------------------- |
| Primary Color         | #6b2e1e                         |
| Accent Color          | #ffd36b                         |
| Text Color            | #fff7f0                         |
| Border Radius (card)  | 14px                            |
| Border Radius (input) | 10px                            |
| Shadow                | 0 10px 30px rgba(0, 0, 0, 0.45) |
| Transition Timing     | 0.3s ease                       |
| Input Padding         | 0.875rem 1rem 0.875rem 2.75rem  |
| Panel Padding         | 3rem 2.5rem                     |

---

**Quick Copy-Paste Colors**:

```css
@import url("src/styles/themes/brand.css");
```

**All design tokens are centralized in**:

- `src/styles/theme.js` (JavaScript constants)
- `src/styles/themes/brand.css` (CSS variables)
- `src/Login.css` (Component styles)
