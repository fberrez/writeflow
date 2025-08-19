# WriteFlow ✍️

> An addictive writing app that gamifies the writing experience through immediate feedback, satisfying audio cues, and gentle constraints that encourage flow state.

![WriteFlow Interface](https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-blue?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-Next%20Generation%20Frontend%20Tooling-646CFF?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-A%20utility--first%20CSS%20framework-38B2AC?style=flat-square)

## ✨ Features

### 🎵 **Immersive Audio Experience**
- **5 Satisfying Sound Types**: Pop (bubble wrap), Click (mechanical), Chime (musical), Drop (zen water), Random variety
- **Web Audio API**: High-quality, low-latency sound synthesis
- **Goal Celebration**: Special audio plays when you reach your daily word count

### 🎊 **Visual Feedback System**
- **Real-time Particles**: Confetti appears exactly where you type with perfect cursor tracking
- **Text Wrapping Support**: Particles follow your cursor even when text wraps to new lines
- **Goal Explosion**: Dramatic confetti burst from your cursor when you reach daily goals

### 🎯 **Gamification & Progress Tracking**
- **Daily Word Goals**: Set and track your daily writing targets (default: 500 words)
- **Real-time Stats**: Live word count, character count, and session duration
- **Writing Streak**: Track consecutive days of writing
- **Progress Bar**: Animated daily progress visualization

### 🔒 **Focus Modes**
- **Redact Mode**: Blur text while writing to prevent editing obsession
- **No-Delete Mode**: Disable backspace/delete keys to maintain writing flow
- **No-Copy/Paste Mode**: Block clipboard operations to prevent distractions

### 🎨 **Beautiful Design**
- **Zen White Theme**: Gentle, easy-on-the-eyes background
- **Glassmorphism UI**: Modern frosted glass effects with backdrop blur
- **Monospace Font**: Professional writing experience with JetBrains Mono
- **Responsive Design**: Optimized for desktop writing sessions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/writeflow.git
   cd writeflow
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Add celebration sound** (optional)
   - Add your `celebrate.mp3` file to `apps/frontend/public/`
   - The app will play this when you reach your daily goal

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start writing!

## 🐳 Docker Deployment

### Quick Start with Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Open `http://localhost:3000` in your browser

### Development with Docker

1. **Run development environment**
   ```bash
   docker-compose --profile dev up
   ```

2. **Access development server**
   - Open `http://localhost:5173` in your browser
   - Hot reloading enabled with volume mounting

### Manual Docker Commands

1. **Build the image**
   ```bash
   docker build -t writeflow-frontend .
   ```

2. **Run the container**
   ```bash
   docker run -d -p 3000:80 --name writeflow-app writeflow-frontend
   ```

3. **View logs**
   ```bash
   docker logs writeflow-app
   ```

4. **Stop and remove**
   ```bash
   docker stop writeflow-app
   docker rm writeflow-app
   ```

## 🎮 How to Use

### Basic Writing
1. **Open WriteFlow** in your browser
2. **Click in the writing area** and start typing
3. **Watch particles appear** at your cursor as you type
4. **Listen to satisfying sounds** with each keystroke
5. **Track your progress** in the stats panel

### Settings & Customization
- **Press `Ctrl/Cmd + ,`** to open settings
- **Choose your sound type** from the dropdown
- **Set your daily word goal** and press Enter to save
- **Toggle focus modes** to eliminate distractions
- **Hide stats** for a cleaner writing experience

## 🤝 Contributing

We welcome contributions! Please follow the existing TypeScript and React patterns, use Tailwind CSS for styling, and write descriptive commit messages.

## 📝 License

This project is licensed under the MIT License.

---

**Happy Writing!** ✍️✨

*WriteFlow - Where words flow like water and every keystroke counts.*