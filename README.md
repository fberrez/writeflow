# WriteFlow ✍️

> An addictive writing app that gamifies the writing experience through immediate feedback, visual effects, and gentle constraints that encourage flow state.

![WriteFlow Interface](https://img.shields.io/badge/Built%20with-React%20%2B%20TypeScript-blue?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-Next%20Generation%20Frontend%20Tooling-646CFF?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-A%20utility--first%20CSS%20framework-38B2AC?style=flat-square)

## ✨ Features

### 🎊 **Visual Feedback System**
- **Real-time Particles**: Confetti appears exactly where you type with perfect cursor tracking
- **Text Wrapping Support**: Particles follow your cursor even when text wraps to new lines
- **Goal Explosion**: Dramatic confetti burst from your cursor when you reach daily goals
- **Session Persistence**: Your text and progress are automatically saved and restored

### 🎯 **Dual Goal System**
- **Word Count Goals**: Set daily word targets (default: 500 words)
- **Timer Goals**: Set session duration targets (default: 25 minutes)
- **Goal Type Selection**: Choose between word count or timer-based goals
- **Real-time Progress**: Live tracking with animated progress visualization
- **Goal Celebration**: Confetti explosion when you reach your target

### 🔐 **Smart Settings Management**
- **First-Visit Setup**: Settings panel opens automatically for new users
- **Settings Lock**: Configuration locks until goal is reached, encouraging focus
- **Goal Unlock**: Settings become available again after completing your target
- **Persistent Preferences**: All settings are saved and restored between sessions

### 🔒 **Focus Modes**
- **Redact Mode**: Blur text while writing to prevent editing obsession
- **No-Delete Mode**: Disable backspace/delete keys to maintain writing flow
- **No Paste Mode**: Block paste/cut operations while allowing copy and select-all for text export

### 📊 **Progress Tracking**
- **Real-time Stats**: Live word count, character count, and session duration
- **Writing Streak**: Track consecutive days of writing
- **Session Timer**: Precise time tracking that continues after goal completion
- **Progress Persistence**: All data saved automatically and restored on return
- **Goal Continuation**: Timer keeps running after reaching targets for accurate session tracking

### 🎨 **Beautiful Design**
- **Stone Theme**: Gentle, warm colors that are easy on the eyes
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

3. **Configure your goals**
   - On first visit, the settings panel will open automatically
   - Choose between word count or timer goals
   - Set your target and start writing!

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Configure your goals in the settings panel
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

## 🚀 Railway Deployment

### Deploy to Railway

1. **Connect your repository to Railway**
   - Go to [railway.app](https://railway.app)
   - Create a new project from your GitHub repository

2. **Railway will automatically detect the Dockerfile**
   - The build process will use the root `Dockerfile`
   - No additional configuration needed

3. **Environment Variables** (optional)
   - Set `NODE_ENV=production` (automatically set by Railway)
   - Configure custom domain if desired

4. **Access your deployed app**
   - Railway will provide a `.railway.app` domain
   - Your app will be available at the provided URL

### Railway Configuration

The Dockerfile is optimized for Railway deployment:
- ✅ **Multi-stage build** for optimal image size
- ✅ **Nginx serving** for production performance  
- ✅ **Health checks** for container monitoring
- ✅ **Security headers** for production safety
- ✅ **Asset caching** for improved performance

## 🎮 How to Use

### Basic Writing
1. **Open WriteFlow** in your browser
2. **Configure your goals** in the settings panel (opens automatically on first visit)
3. **Choose goal type**: Word count or timer-based
4. **Start writing** and watch particles appear at your cursor
5. **Track your progress** in the stats panel
6. **Reach your goal** to unlock settings and get confetti celebration!

### Settings & Customization
- **Press `Ctrl/Cmd + ,`** to toggle settings (after initial setup)
- **Click Reset button** to clear text and restart session
- **Choose goal type**: Word count or timer goals
- **Set your targets** and click "Start Writing Session"
- **Toggle focus modes** to eliminate distractions
- **Note**: Settings lock when session starts and unlock when goal is reached
- **Goal reached**: Timer continues running, settings unlock, can start new session

## 🤝 Contributing

We welcome contributions! Please follow the existing TypeScript and React patterns, use Tailwind CSS for styling, and write descriptive commit messages.

## 📝 License

This project is licensed under the MIT License.

---

**Happy Writing!** ✍️✨

*WriteFlow - Where words flow like water and every keystroke counts.*