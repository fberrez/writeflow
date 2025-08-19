# WriteFlow Frontend

A React TypeScript writing interface that gamifies the writing experience with focus modes, real-time stats, and immersive effects.

## Features

### Core Writing Experience
- **Clean, distraction-free textarea** with dark gradient theme
- **Real-time word and character counting**
- **Session timer** tracking writing duration
- **Daily word goal** with animated progress bar
- **Writing streak counter** for motivation

### Immersive Effects
- **Typewriter sound effects** using Web Audio API (toggle on/off)
- **Visual particle effects** on keystrokes near cursor position
- **Glassmorphism design** with backdrop blur effects
- **Smooth animations** and micro-interactions

### Focus Modes
- **Redact mode**: Blur/hide written text while maintaining layout
- **No-delete mode**: Prevents backspace/delete keys
- **No copy/paste mode**: Blocks Ctrl+C/V/X operations

### Settings & Customization
- **Settings panel** that slides in from corner
- **Customizable daily word goals**
- **Audio toggle** for typewriter sounds
- **Individual toggle** for each focus mode

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Web Audio API** for sound effects
- **Custom hooks** for state management

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```

## Keyboard Shortcuts

- `Ctrl/Cmd + ,` - Open settings panel
- `Escape` - Close settings panel

## Architecture

The app is built with a modular architecture:

- `components/` - React components
- `hooks/` - Custom React hooks for business logic
- `types/` - TypeScript type definitions
- `utils/` - Utility functions

### Key Components

- **WritingArea**: Main textarea with particle effects and writing mode enforcement
- **StatsDisplay**: Real-time statistics and progress tracking
- **SettingsPanel**: Sliding panel for configuration

### Custom Hooks

- **useWritingStats**: Tracks word count, character count, session time, and progress
- **useAudio**: Manages Web Audio API for typewriter sounds
- **useParticles**: Creates and manages particle effects on keystrokes
- **useWritingModes**: Handles focus mode behaviors (no-delete, no-copy-paste)

## Design Philosophy

WriteFlow is designed to create an **addictive writing experience** that encourages flow state through:

1. **Immediate feedback** - Real-time stats and visual effects
2. **Gentle constraints** - Focus modes that remove distractions
3. **Gamification** - Progress bars, streaks, and goals
4. **Immersive atmosphere** - Dark theme, glassmorphism, and sound effects

The interface prioritizes the writing experience above all else, with minimal UI that stays out of the way while providing essential feedback and motivation.
