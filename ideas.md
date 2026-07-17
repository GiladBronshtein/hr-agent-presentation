# Design System — UI/UX Pro Max Applied

Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

## Category Analysis
- **UI Category**: AI/Chatbot Platform + B2B Service
- **Reasoning Rule**: Row 18 (AI/Chatbot Platform) + Row 5 (B2B Service)
- **Pattern**: Interactive Demo + Minimal

## Chosen Design System

### Style: AI-Native UI + Glassmorphism + Dark Mode (OLED)
- Keywords: Neutral + AI Indigo, streaming text, typing indicators, fade-in
- Performance: Excellent | Accessibility: WCAG AA

### Colors (from colors.csv row 18 — AI/Chatbot Platform)
- Primary: #6366F1 (Indigo) — AI identity
- Secondary: #0891B2 (Cyan) — interactions
- Accent: #F59E0B (Gold) — CTAs and highlights
- Background: #0A0A1A (Deep Space OLED)
- Foreground: #F1F5F9 (Near White)
- Card: #0F0F23
- Muted: rgba(255,255,255,0.04)
- Border: rgba(255,255,255,0.08)
- Emerald: #10B981 — success/approval
- Rose: #F43F5E — destructive/rejection

### Typography (from typography.csv row 3 — Tech Startup)
- Heading: Space Grotesk (wght 300-700)
- Body: DM Sans (wght 300-700)
- Hebrew: Heebo (fallback for RTL)
- Letter spacing headings: -0.02em
- Notes: Space Grotesk has unique character, DM Sans is highly readable

### Effects
- Glassmorphic cards: backdrop-filter blur(16px), rgba(255,255,255,0.04) bg
- Glow effects: box-shadow 0 0 20px rgba(99,102,241,0.35)
- Transitions: 200-300ms cubic-bezier(0.23, 1, 0.32, 1)
- Streaming text animations for AI feel
- Subtle grid overlay: rgba(99,102,241,0.04) 64px grid

### Anti-Patterns to Avoid
- Heavy chrome / cluttered UI
- Slow response feedback
- Generic AI purple/pink gradients (use indigo+cyan instead)
- Bright neon colors
- Harsh animations

### Pre-Delivery Checklist (from skill)
- [x] No emojis as icons (use SVG/Lucide) — partially done
- [x] cursor-pointer on all clickable elements
- [x] Hover states with smooth transitions (150-300ms)
- [x] Dark mode: text contrast 4.5:1 minimum
- [x] Focus states visible for keyboard nav
- [x] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

## Style Decisions
- RTL layout throughout (Hebrew)
- Scene transitions: opacity fade 300ms
- Chapter colors: להבין=#6366F1, לראות=#0891B2, לבנות=#10B981, להטמיע=#F59E0B, נספח=#64748B
- Presenter controls: fixed bottom bar, glassmorphic
- All cards use glass-card class with backdrop-filter
