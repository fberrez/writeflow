import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Settings, RotateCcw } from 'lucide-react';
import { WritingArea } from '@/components/WritingArea';
import { StatsDisplay } from '@/components/StatsDisplay';
import { SettingsPanel } from '@/components/SettingsPanel';

import { useWritingStats } from '@/hooks/useWritingStats';
import { useParticles } from '@/hooks/useParticles';
import { useWritingModes } from '@/hooks/useWritingModes';
import { textStorage, settingsStorage, sessionStorage, isStorageAvailable } from '@/utils';
import type { WritingSettings, SessionData } from '@/types';

function App() {
  const [text, setText] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const writingAreaRef = useRef<HTMLDivElement>(null);
  const [lastCursorPosition, setLastCursorPosition] = useState({ x: 0, y: 0 });
  const [settings, setSettings] = useState<WritingSettings>({
    showStats: true,
    redactMode: false,
    noDeleteMode: false,
    noCopyPasteMode: false,
    goalType: 'words',
    dailyWordGoal: 500,
    dailyTimerGoal: 25, // 25 minutes default
    isFirstVisit: true,
    settingsLocked: false,
    sessionStarted: false,
  });
  const [sessionData, setSessionData] = useState<SessionData>({
    startTime: Date.now(),
    lastSaveTime: Date.now(),
    totalSessionTime: 0,
  });
  
  const isStorageEnabled = useRef(isStorageAvailable());

  const { stats, updateDailyGoal } = useWritingStats(text, {
    goalType: settings.goalType,
    dailyWordGoal: settings.dailyWordGoal,
    dailyTimerGoal: settings.dailyTimerGoal,
    sessionStarted: settings.sessionStarted
  }, sessionData);
  const { particles, createParticle, createCelebrationConfetti } = useParticles();
  const { handleKeyDown } = useWritingModes(settings);

  const handleCelebration = useCallback(() => {
    // Use the last known cursor position for the celebration
    createCelebrationConfetti(lastCursorPosition.x, lastCursorPosition.y);
  }, [createCelebrationConfetti, lastCursorPosition]);

  // Initialize data from localStorage on app start
  useEffect(() => {
    if (!isStorageEnabled.current) {
      console.warn('localStorage not available, persistence disabled');
      return;
    }

    console.log('🔄 Loading saved data from localStorage...');
    
    // Load saved text
    const savedText = textStorage.load();
    if (savedText) {
      setText(savedText);
      console.log('📝 Restored text content:', savedText.length, 'characters');
    }

    // Load saved settings
    const savedSettings = settingsStorage.load();
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...savedSettings }));
      console.log('⚙️ Restored settings:', savedSettings);
    }

    // Determine if settings should be opened
    const shouldOpenSettings = 
      !savedSettings || // First visit (no saved settings)
      (savedSettings.isFirstVisit && !savedText) || // First visit with no saved text
      (!savedSettings.sessionStarted && !savedText); // No active session and no text
    
    if (shouldOpenSettings) {
      setIsSettingsOpen(true);
      console.log('👋 Opening settings panel for initial setup');
    }

    // Load saved session data
    const savedSession = sessionStorage.load();
    if (savedSession && 
        typeof savedSession.startTime === 'number' && 
        typeof savedSession.lastSaveTime === 'number' && 
        typeof savedSession.totalSessionTime === 'number') {
      const now = Date.now();
      const timeSinceLastSave = now - savedSession.lastSaveTime;
      
      // If it's been less than 1 hour, restore the session
      if (timeSinceLastSave < 60 * 60 * 1000) {
        setSessionData({
          startTime: savedSession.startTime,
          lastSaveTime: now,
          totalSessionTime: savedSession.totalSessionTime + timeSinceLastSave,
        });
        console.log('⏰ Restored session data, total time:', savedSession.totalSessionTime + timeSinceLastSave);
      } else {
        // Start fresh session if too much time has passed
        console.log('⏰ Starting fresh session (previous session too old)');
      }
    }
  }, []);

  // Update daily goal when settings change
  useEffect(() => {
    const currentGoal = settings.goalType === 'words' ? settings.dailyWordGoal : settings.dailyTimerGoal;
    updateDailyGoal(currentGoal, settings.goalType);
  }, [settings.goalType, settings.dailyWordGoal, settings.dailyTimerGoal, updateDailyGoal]);

  // Check for goal completion
  useEffect(() => {
    if (stats.dailyProgress >= 100 && settings.sessionStarted) {
      handleCelebration();
      
      // Unlock settings when goal is reached (but keep session running)
      if (settings.settingsLocked) {
        setSettings(prev => ({ 
          ...prev, 
          settingsLocked: false
          // Keep sessionStarted: true so timer continues running
        }));
        console.log('🎉 Goal reached! Settings unlocked, timer continues running.');
      }
    }
  }, [stats.dailyProgress, handleCelebration, settings.settingsLocked, settings.sessionStarted]);

  const handleSettingsUpdate = useCallback((newSettings: Partial<WritingSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const handleStartSession = useCallback(() => {
    setSettings(prev => ({
      ...prev,
      settingsLocked: true,
      sessionStarted: true,
      isFirstVisit: false,
    }));
    
    // Reset session data when starting a new session
    const now = Date.now();
    setSessionData({
      startTime: now,
      lastSaveTime: now,
      totalSessionTime: 0,
    });
    
    setIsSettingsOpen(false);
    console.log('🚀 Writing session started! Settings are now locked until goal is reached.');
  }, []);

  const handleReset = useCallback(() => {
    console.log('🔄 Resetting WriteFlow session...');
    
    // Clear text
    setText('');
    
    // Reset session data
    const now = Date.now();
    setSessionData({
      startTime: now,
      lastSaveTime: now,
      totalSessionTime: 0,
    });
    
    // Reset session state - unlock settings and mark as not started
    setSettings(prev => ({
      ...prev,
      settingsLocked: false,
      sessionStarted: false,
    }));
    
    // Clear localStorage
    if (isStorageEnabled.current) {
      textStorage.clear();
      sessionStorage.clear();
      console.log('🗑️ Cleared saved text and session data');
    }
    
    // Close confirmation dialog and open settings panel
    setShowResetConfirm(false);
    setIsSettingsOpen(true);
    
    console.log('✅ WriteFlow session reset complete - settings panel opened');
  }, []);

  const handleResetClick = useCallback(() => {
    if (text.trim().length === 0) {
      // If no text, reset immediately
      handleReset();
    } else {
      // Show confirmation dialog
      setShowResetConfirm(true);
    }
  }, [text, handleReset]);

  // Save text content to localStorage when it changes
  useEffect(() => {
    if (!isStorageEnabled.current) return;
    
    const timeoutId = setTimeout(() => {
      textStorage.save(text);
      console.log('💾 Text saved to localStorage');
    }, 1000); // Debounce saves by 1 second
    
    return () => clearTimeout(timeoutId);
  }, [text]);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (!isStorageEnabled.current) return;
    
    settingsStorage.save(settings);
    console.log('💾 Settings saved to localStorage');
  }, [settings]);

  // Update session data and save periodically
  useEffect(() => {
    if (!isStorageEnabled.current) return;
    
    const intervalId = setInterval(() => {
      const now = Date.now();
      setSessionData(prev => {
        const newSessionData = {
          ...prev,
          lastSaveTime: now,
          totalSessionTime: prev.totalSessionTime + (now - prev.lastSaveTime),
        };
        sessionStorage.save(newSessionData);
        return newSessionData;
      });
    }, 30000); // Save session data every 30 seconds
    
    return () => clearInterval(intervalId);
  }, []);

  // Save state when user is about to leave/close the tab
  useEffect(() => {
    if (!isStorageEnabled.current) return;
    
    const handleBeforeUnload = () => {
      console.log('💾 Saving all data before page unload...');
      textStorage.save(text);
      settingsStorage.save(settings);
      
      const now = Date.now();
      const finalSessionData = {
        ...sessionData,
        lastSaveTime: now,
        totalSessionTime: sessionData.totalSessionTime + (now - sessionData.lastSaveTime),
      };
      sessionStorage.save(finalSessionData);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [text, settings, sessionData]);

  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle writing modes (no-delete, no-copy-paste)
    const allowed = handleKeyDown(event);
    if (!allowed) return;
  }, [handleKeyDown]);

  const handleCreateParticle = useCallback((x: number, y: number) => {
    createParticle(x, y);
    // Track cursor position for celebrations
    setLastCursorPosition({ x, y });
  }, [createParticle]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle settings with Ctrl/Cmd + , (but don't close during initial setup)
      if ((event.ctrlKey || event.metaKey) && event.key === ',') {
        event.preventDefault();
        if (settings.isFirstVisit && !settings.sessionStarted && stats.dailyProgress < 100) {
          // During initial setup (and goal not reached), only allow opening settings
          setIsSettingsOpen(true);
        } else {
          // Normal toggle behavior after setup or when goal is reached
          setIsSettingsOpen(prev => !prev);
        }
      }
      // Close settings with Escape (but not during initial setup unless goal is reached)
      if (event.key === 'Escape' && isSettingsOpen && (!settings.isFirstVisit || settings.sessionStarted || stats.dailyProgress >= 100)) {
        setIsSettingsOpen(false);
      }
      // Close reset dialog with Escape
      if (event.key === 'Escape' && showResetConfirm) {
        setShowResetConfirm(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen, showResetConfirm, settings.isFirstVisit, settings.sessionStarted, stats.dailyProgress]);

  return (
    <div className="min-h-screen text-stone-700">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-stone-200/50">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">WriteFlow</h1>
          <p className="text-sm text-stone-500 mt-1">Focus. Write. Flow.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetClick}
            className="p-3 glass hover:bg-white/80 transition-colors rounded-lg"
            title="Reset session"
          >
            <RotateCcw className="w-5 h-5 text-stone-600" />
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 glass hover:bg-white/80 transition-colors rounded-lg"
            title="Settings (Ctrl+,)"
          >
            <Settings className="w-5 h-5 text-stone-600" />
          </button>
        </div>
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
        <div className="w-80 p-6 border-l border-stone-200/30" style={{background: 'rgba(254, 251, 247, 0.2)'}}>
          {settings.showStats && <StatsDisplay stats={stats} />}
          
          {/* Tips */}
          <div className="glass mt-6 p-4">
            <h3 className="text-sm font-semibold text-stone-700 mb-2">💡 Tips</h3>
            <ul className="text-xs text-stone-600 space-y-1">
              <li>• Use Ctrl+, to toggle settings</li>
              <li>• Click reset button to start over</li>
              <li>• Configure goals, then click "Start Writing Session"</li>
              <li>• Settings lock during active writing sessions</li>
              <li>• Enable focus modes for distraction-free writing</li>
              <li>• Particle effects appear as you type</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm z-50"
            onClick={() => setShowResetConfirm(false)}
          />
          
          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="glass-strong max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-stone-800 mb-3">Reset Session?</h2>
              <p className="text-stone-600 mb-6">
                This will clear all your text and reset the timer. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleSettingsUpdate}
        onStartSession={handleStartSession}
        stats={stats}
      />

      {/* Mobile Warning */}
      <div className="md:hidden fixed inset-0 flex items-center justify-center p-6 z-50" style={{background: 'rgba(254, 251, 247, 0.95)'}}>
        <div className="glass p-6 text-center">
          <h2 className="text-xl font-bold mb-2 text-stone-800">Desktop Experience</h2>
          <p className="text-stone-600">
            WriteFlow is optimized for desktop writing sessions. Please use a larger screen for the best experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
