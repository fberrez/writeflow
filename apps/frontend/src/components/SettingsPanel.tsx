import React from 'react';
import { X, Volume2, VolumeX, Eye, EyeOff, Lock, Unlock, Copy, CopyX, Target, BarChart3, BarChart } from 'lucide-react';
import { cn } from '@/utils';
import type { WritingSettings } from '@/types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: WritingSettings;
  onUpdateSettings: (settings: Partial<WritingSettings>) => void;
  onTestSound?: () => void;
  className?: string;
}

export function SettingsPanel({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  className,
}: SettingsPanelProps) {
  const handleDailyGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onUpdateSettings({ dailyWordGoal: value });
    }
  };

  const handleDailyGoalKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-80 glass-strong z-50 transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Settings */}
          <div className="space-y-6 flex-1">
            {/* Sound Effects */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Audio</h3>
              <button
                onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {settings.soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-gray-500" />
                  )}
                  <span className="text-gray-800">Typing Sounds</span>
                </div>
                <div
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors",
                    settings.soundEnabled ? "bg-green-500" : "bg-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 bg-white rounded-full mt-0.5 transition-transform shadow-sm",
                      settings.soundEnabled ? "translate-x-6" : "translate-x-0.5"
                    )}
                  />
                </div>
              </button>
              
              {/* Sound Type Selection */}
              {settings.soundEnabled && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Sound Type</label>
                  <select
                    value={settings.soundType}
                    onChange={(e) => onUpdateSettings({ soundType: e.target.value as WritingSettings['soundType'] })}
                    className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="random">🎲 Random (Variety)</option>
                    <option value="pop">🫧 Pop (Bubble wrap)</option>
                    <option value="click">🖱️ Click (Mechanical)</option>
                    <option value="chime">🎵 Chime (Musical)</option>
                    <option value="drop">💧 Drop (Water zen)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Display Options */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Display</h3>
              
              {/* Show Stats */}
              <button
                onClick={() => onUpdateSettings({ showStats: !settings.showStats })}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {settings.showStats ? (
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                  ) : (
                    <BarChart className="w-5 h-5 text-gray-500" />
                  )}
                  <div className="text-left">
                    <div className="text-gray-800">Show Statistics</div>
                    <div className="text-xs text-gray-500">Display word count and progress</div>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors",
                    settings.showStats ? "bg-blue-500" : "bg-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 bg-white rounded-full mt-0.5 transition-transform shadow-sm",
                      settings.showStats ? "translate-x-6" : "translate-x-0.5"
                    )}
                  />
                </div>
              </button>
            </div>

            {/* Writing Modes */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Writing Modes</h3>
              
              {/* Redact Mode */}
              <button
                onClick={() => onUpdateSettings({ redactMode: !settings.redactMode })}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {settings.redactMode ? (
                    <EyeOff className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-500" />
                  )}
                  <div className="text-left">
                    <div className="text-gray-800">Redact Mode</div>
                    <div className="text-xs text-gray-500">Blur text while writing</div>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors",
                    settings.redactMode ? "bg-purple-500" : "bg-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 bg-white rounded-full mt-0.5 transition-transform shadow-sm",
                      settings.redactMode ? "translate-x-6" : "translate-x-0.5"
                    )}
                  />
                </div>
              </button>

              {/* No Delete Mode */}
              <button
                onClick={() => onUpdateSettings({ noDeleteMode: !settings.noDeleteMode })}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {settings.noDeleteMode ? (
                    <Lock className="w-5 h-5 text-red-500" />
                  ) : (
                    <Unlock className="w-5 h-5 text-gray-500" />
                  )}
                  <div className="text-left">
                    <div className="text-gray-800">No Delete Mode</div>
                    <div className="text-xs text-gray-500">Prevent backspace/delete</div>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors",
                    settings.noDeleteMode ? "bg-red-500" : "bg-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 bg-white rounded-full mt-0.5 transition-transform shadow-sm",
                      settings.noDeleteMode ? "translate-x-6" : "translate-x-0.5"
                    )}
                  />
                </div>
              </button>

              {/* No Copy/Paste Mode */}
              <button
                onClick={() => onUpdateSettings({ noCopyPasteMode: !settings.noCopyPasteMode })}
                className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {settings.noCopyPasteMode ? (
                    <CopyX className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500" />
                  )}
                  <div className="text-left">
                    <div className="text-gray-800">No Copy/Paste</div>
                    <div className="text-xs text-gray-500">Block copy/paste operations</div>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors",
                    settings.noCopyPasteMode ? "bg-orange-500" : "bg-gray-300"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 bg-white rounded-full mt-0.5 transition-transform shadow-sm",
                      settings.noCopyPasteMode ? "translate-x-6" : "translate-x-0.5"
                    )}
                  />
                </div>
              </button>
            </div>

            {/* Daily Goal */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-800">Goals</h3>
              <div className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-800">Daily Word Goal</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={settings.dailyWordGoal}
                  onChange={handleDailyGoalChange}
                  onKeyDown={handleDailyGoalKeyDown}
                  className="w-full p-2 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter daily word goal..."
                />
                <div className="text-xs text-gray-500 mt-1">
                  Press Enter to close settings
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              WriteFlow v1.0 - Focus. Write. Flow.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
