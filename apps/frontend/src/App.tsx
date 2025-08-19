import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Settings } from 'lucide-react';
import { WritingArea } from '@/components/WritingArea';
import { StatsDisplay } from '@/components/StatsDisplay';
import { SettingsPanel } from '@/components/SettingsPanel';

import { useWritingStats } from '@/hooks/useWritingStats';
import { useParticles } from '@/hooks/useParticles';
import { useAudio } from '@/hooks/useAudio';
import { useWritingModes } from '@/hooks/useWritingModes';
import { useGoalCelebration } from '@/hooks/useGoalCelebration';
import type { WritingSettings } from '@/types';

function App() {
  const [text, setText] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const writingAreaRef = useRef<HTMLDivElement>(null);
  const [lastCursorPosition, setLastCursorPosition] = useState({ x: 0, y: 0 });
  const [settings, setSettings] = useState<WritingSettings>({
    soundEnabled: true,
    soundType: 'random',
    showStats: true,
    redactMode: false,
    noDeleteMode: false,
    noCopyPasteMode: false,
    dailyWordGoal: 500,
  });

  const { stats, updateDailyGoal } = useWritingStats(text, settings.dailyWordGoal);
  const { particles, createParticle, createCelebrationConfetti } = useParticles();
  const { playTypingSound, handleUserInteraction } = useAudio();
  const { handleKeyDown } = useWritingModes(settings);
  const { checkGoalCompletion } = useGoalCelebration();

  const handleCelebration = useCallback(() => {
    // Use the last known cursor position for the celebration
    createCelebrationConfetti(lastCursorPosition.x, lastCursorPosition.y);
  }, [createCelebrationConfetti, lastCursorPosition]);

  // Update daily goal when settings change
  useEffect(() => {
    updateDailyGoal(settings.dailyWordGoal);
  }, [settings.dailyWordGoal, updateDailyGoal]);

  // Check for goal completion
  useEffect(() => {
    checkGoalCompletion(stats.dailyProgress, handleCelebration);
  }, [stats.dailyProgress, checkGoalCompletion, handleCelebration]);

  const handleSettingsUpdate = useCallback((newSettings: Partial<WritingSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const handleKeyPress = useCallback(async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Initialize audio on first user interaction
    await handleUserInteraction();

    // Handle writing modes (no-delete, no-copy-paste)
    const allowed = handleKeyDown(event);
    if (!allowed) return;

    // Play satisfying typing sound for actual typing
    if (settings.soundEnabled && event.key.length === 1) {
      console.log('🔊 Attempting to play sound for key:', event.key);
      playTypingSound(settings.soundType);
    }
  }, [settings.soundEnabled, settings.soundType, handleKeyDown, playTypingSound, handleUserInteraction]);

  const handleCreateParticle = useCallback((x: number, y: number) => {
    createParticle(x, y);
    // Track cursor position for celebrations
    setLastCursorPosition({ x, y });
  }, [createParticle]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open settings with Ctrl/Cmd + ,
      if ((event.ctrlKey || event.metaKey) && event.key === ',') {
        event.preventDefault();
        setIsSettingsOpen(true);
      }
      // Close settings with Escape
      if (event.key === 'Escape' && isSettingsOpen) {
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-200/50">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">WriteFlow</h1>
          <p className="text-sm text-gray-500 mt-1">Focus. Write. Flow.</p>
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-3 glass hover:bg-white/80 transition-colors rounded-lg"
          title="Settings (Ctrl+,)"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-88px)]">
        {/* Writing Area */}
        <div ref={writingAreaRef} className="flex-1 flex flex-col min-w-0">
          <WritingArea
            text={text}
            setText={setText}
            settings={settings}
            onKeyPress={handleKeyPress}
            onCreateParticle={handleCreateParticle}
            particles={particles}
            className="flex-1"
          />
        </div>

        {/* Stats Sidebar */}
        <div className="w-80 p-6 border-l border-gray-200/50 bg-white/30">
          {settings.showStats && <StatsDisplay stats={stats} />}
          
          {/* Tips */}
          <div className="glass mt-6 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">💡 Tips</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Use Ctrl+, to open settings</li>
              <li>• Enable focus modes for distraction-free writing</li>
              <li>• Set a daily word goal to stay motivated</li>
              <li>• Particle effects appear as you type</li>
              {settings.soundEnabled && <li>• Satisfying typing sounds enhance the experience</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleSettingsUpdate}

      />

      {/* Mobile Warning */}
      <div className="md:hidden fixed inset-0 bg-white/90 flex items-center justify-center p-6 z-50">
        <div className="glass p-6 text-center">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Desktop Experience</h2>
          <p className="text-gray-600">
            WriteFlow is optimized for desktop writing sessions. Please use a larger screen for the best experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
