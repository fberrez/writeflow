# WriteFlow Frontend

A React TypeScript writing interface that gamifies the writing experience with focus modes, real-time stats, visual effects, and smart session management.

## Features

### Core Writing Experience
- **Clean, distraction-free textarea** with warm stone gradient theme
- **Real-time word and character counting**
- **Session timer** that continues running after goal completion
- **Dual goal system**: Word count or timer-based goals
- **Writing streak counter** for motivation
- **Smart session management** with explicit start/stop controls

### Immersive Effects
- **Visual particle effects** on keystrokes near cursor position
- **Confetti celebrations** when goals are reached
- **Glassmorphism design** with warm stone theme and backdrop blur effects
- **Smooth animations** and micro-interactions
- **Goal completion feedback** with visual celebrations

### Focus Modes
- **Redact mode**: Blur/hide written text while maintaining layout
- **No-delete mode**: Prevents backspace/delete keys
- **No paste mode**: Blocks paste/cut operations (copy and select-all allowed for export)

### Settings & Customization
- **Settings panel** that slides in from corner with smart open/close behavior
- **Dual goal system**: Choose between word count or timer goals
- **Customizable targets**: Set daily word goals or session timer goals
- **Individual toggle** for each focus mode
- **Session control**: Explicit "Start Writing Session" button
- **Settings lock**: Configuration locks during active sessions until goal completion
- **Persistent storage**: All settings and progress saved automatically

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom stone theme
- **Lucide React** for icons
- **LocalStorage API** for data persistence
- **Custom hooks** for state management and session control

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

- `Ctrl/Cmd + ,` - Toggle settings panel (disabled during initial setup)
- `Escape` - Close settings panel (disabled during initial setup)
- **Reset button** - Clear text and reset session (opens settings panel)

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

- **useWritingStats**: Tracks word count, character count, session time, and dual goal progress
- **useParticles**: Creates and manages particle effects on keystrokes and goal celebrations
- **useWritingModes**: Handles focus mode behaviors (no-delete, no-paste, redact mode)
- **useGoalCelebration**: Manages confetti celebrations when goals are reached

## Design Philosophy

WriteFlow is designed to create an **addictive writing experience** that encourages flow state through:

1. **Immediate feedback** - Real-time stats and visual particle effects
2. **Gentle constraints** - Focus modes that remove distractions
3. **Smart session management** - Explicit start/stop controls with settings that lock during active sessions
4. **Dual goal system** - Choose between word count or timer-based targets
5. **Gamification** - Progress bars, streaks, goals, and confetti celebrations
6. **Warm aesthetic** - Stone theme with glassmorphism effects that are easy on the eyes
7. **Persistent experience** - All data automatically saved and restored

The interface prioritizes the writing experience above all else, with minimal UI that stays out of the way while providing essential feedback and motivation. The session management ensures focus by locking settings until goals are reached, while the timer continues running for accurate session tracking.
