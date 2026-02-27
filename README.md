# Portfolio V2 — Premium AI Developer Portfolio

A premium, immersive portfolio with full-screen scroll snapping, light/dark mode, AI assistant, project modals, and advanced animations.

## 🚀 Quick Start

```bash
cd portfolio-v2
npm install
npm run dev
# Open http://localhost:3000
```

## 📁 Folder Structure

```
portfolio-v2/
├── app/
│   ├── globals.css          ← Full theme system (dark/light CSS vars)
│   ├── layout.tsx           ← Root layout with providers
│   └── page.tsx             ← All sections assembled
├── components/
│   ├── sections/
│   │   ├── Hero.tsx         ← Avatar, parallax, AI search bar
│   │   ├── About.tsx        ← Bio + highlight cards
│   │   ├── Skills.tsx       ← Interactive tabbed skill bars
│   │   ├── Projects.tsx     ← Cards + modal trigger
│   │   └── Contact.tsx      ← Links + resume download
│   ├── modals/
│   │   └── ProjectModal.tsx ← Full-screen project detail modal
│   └── ui/
│       ├── Navbar.tsx       ← Sticky, glass, active indicator, theme toggle
│       ├── AIAssistant.tsx  ← Floating AI chatbot (hidden in hero)
│       └── CustomCursor.tsx ← Smooth custom cursor (desktop only)
├── context/
│   └── ThemeContext.tsx     ← Light/dark mode with localStorage
├── hooks/
│   ├── useActiveSection.ts  ← IntersectionObserver for nav tracking
│   └── useScrollAnimation.ts ← Scroll-triggered animation hook
└── public/
    └── resume.pdf           ← ← ADD YOUR RESUME HERE
```

## ✏️ Customize

### Your Info
| File | What to change |
|------|---------------|
| `Hero.tsx` | Name, bio, stats (3+, 15+, 5+) |
| `About.tsx` | Bio paragraphs, tech chips |
| `Skills.tsx` | Skill names + percentages |
| `Projects.tsx` | Project data (title, desc, stack, GitHub links) |
| `Contact.tsx` | Email, GitHub URL, LinkedIn URL |
| `AIAssistant.tsx` | AI chatbot responses |

### Resume
Drop your `resume.pdf` into `public/` folder.

### Real AI Chatbot
Replace `getReply()` in `AIAssistant.tsx` with a real API call:
```typescript
const res = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message: text }),
})
const { reply } = await res.json()
```

## 🌐 Deploy to Vercel

```bash
npx vercel          # First deploy (follow prompts)
npx vercel --prod   # Subsequent deploys
```

Or push to GitHub → import at vercel.com → auto-deploy on every push.

## 🎨 Features Built

| Feature | Details |
|---------|---------|
| **Scroll Snap** | 100vh sections, CSS scroll-snap-type |
| **Light/Dark Mode** | Animated toggle, localStorage, CSS vars |
| **Custom Cursor** | Dot + ring with LERP smoothing |
| **Avatar Parallax** | Mouse-follow with spring physics |
| **AI Search Bar** | Typing animation, glassmorphism |
| **Project Modals** | Scale+fade, ESC close, backdrop blur |
| **AI Assistant** | Hidden in hero, appears after scroll |
| **Active Nav** | IntersectionObserver tracking |
| **Skill Bars** | Animated on scroll entry per category |
| **Theme Transition** | CSS var morphing, 350ms ease |
