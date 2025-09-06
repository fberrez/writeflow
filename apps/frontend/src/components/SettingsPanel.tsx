import React from 'react';
import { X, Eye, EyeOff, Lock, Unlock, Copy, CopyX, Target, BarChart3, BarChart, Clock, FileText, LockIcon } from 'lucide-react';
import { cn } from '@/utils';
import type { WritingSettings, WritingStats } from '@/types';
import { version } from '../../package.json';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: WritingSettings;
  onUpdateSettings: (settings: Partial<WritingSettings>) => void;
  onStartSession: () => void;
  stats: WritingStats;
  className?: string;
}

export function SettingsPanel({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onStartSession,
  stats,
  className,
}: SettingsPanelProps) {
  const handleWordGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onUpdateSettings({ dailyWordGoal: value });
    }
  };

  const handleTimerGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onUpdateSettings({ dailyTimerGoal: value });
    }
  };

  const handleGoalKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onClose();
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    // Prevent scroll wheel from changing number input values
    event.currentTarget.blur();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40"
          onClick={(!settings.isFirstVisit || settings.sessionStarted || stats.dailyProgress >= 100) ? onClose : undefined}
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
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-stone-800">Settings</h2>
              {settings.settingsLocked && (
                <div title="Settings locked until goal is reached">
                  <LockIcon className="w-4 h-4 text-amber-600" />
                </div>
              )}
            </div>
            {/* Only show close button if not first visit or if session has started or goal is reached */}
            {(!settings.isFirstVisit || settings.sessionStarted || stats.dailyProgress >= 100) && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-stone-600" />
              </button>
            )}
          </div>

          {settings.settingsLocked && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800 flex items-center gap-2">
                <LockIcon className="w-4 h-4" />
                Writing session in progress! Settings are locked until you reach your goal.
              </p>
            </div>
          )}

          {settings.isFirstVisit && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                👋 Welcome to WriteFlow! Configure your settings to get started.
              </p>
            </div>
          )}

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto space-y-6">
            {/* Goal Type Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Goal Type
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => !settings.settingsLocked && onUpdateSettings({ goalType: 'words' })}
                  disabled={settings.settingsLocked}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors",
                    settings.goalType === 'words' 
                      ? "bg-blue-50 border-blue-200 text-blue-800" 
                      : "bg-stone-50 border-stone-200 text-stone-700",
                    settings.settingsLocked && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-sm font-medium">Words</span>
                </button>
                
                <button
                  onClick={() => !settings.settingsLocked && onUpdateSettings({ goalType: 'timer' })}
                  disabled={settings.settingsLocked}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border transition-colors",
                    settings.goalType === 'timer' 
                      ? "bg-green-50 border-green-200 text-green-800" 
                      : "bg-stone-50 border-stone-200 text-stone-700",
                    settings.settingsLocked && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Timer</span>
                </button>
              </div>
            </div>

            {/* Goal Settings */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Daily Goal
              </h3>
              
              {settings.goalType === 'words' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Word Count Target</label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={settings.dailyWordGoal}
                    onChange={handleWordGoalChange}
                    onKeyDown={handleGoalKeyDown}
                    onWheel={handleWheel}
                    disabled={settings.settingsLocked}
                    className={cn(
                      "w-full p-2 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      settings.settingsLocked && "opacity-50 cursor-not-allowed"
                    )}
                    style={{background: 'rgba(254, 251, 247, 0.8)'}}
                    placeholder="500"
                  />
                  <p className="text-xs text-stone-500">Press Enter to save</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">Timer Goal (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="480"
                    value={settings.dailyTimerGoal}
                    onChange={handleTimerGoalChange}
                    onKeyDown={handleGoalKeyDown}
                    onWheel={handleWheel}
                    disabled={settings.settingsLocked}
                    className={cn(
                      "w-full p-2 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500",
                      settings.settingsLocked && "opacity-50 cursor-not-allowed"
                    )}
                    style={{background: 'rgba(254, 251, 247, 0.8)'}}
                    placeholder="25"
                  />
                  <p className="text-xs text-stone-500">Press Enter to save</p>
                </div>
              )}
            </div>

            {/* Display Options */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Display Options
              </h3>
              
              {/* Show Stats Toggle */}
              <button
                onClick={() => !settings.settingsLocked && onUpdateSettings({ showStats: !settings.showStats })}
                disabled={settings.settingsLocked}
                className={cn(
                  "flex items-center justify-between w-full p-3 rounded-lg border transition-colors",
                  settings.showStats 
                    ? "bg-green-50 border-green-200 text-green-800" 
                    : "bg-stone-50 border-stone-200 text-stone-700",
                  settings.settingsLocked && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="flex items-center gap-2">
                  {settings.showStats ? (
                    <BarChart3 className="w-4 h-4" />
                  ) : (
                    <BarChart className="w-4 h-4" />
                  )}
                  Show Statistics
                </span>
                <div className={cn(
                  "w-11 h-6 rounded-full transition-colors relative",
                  settings.showStats ? "bg-green-500" : "bg-stone-300"
                )}>
                  <div className={cn(
                    "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform",
                    settings.showStats ? "translate-x-6" : "translate-x-1"
                  )} />
                </div>
              </button>
            </div>

            {/* Focus Modes */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Focus Modes
              </h3>
              
              {/* Redact Mode */}
              <button
                onClick={() => !settings.settingsLocked && onUpdateSettings({ redactMode: !settings.redactMode })}
                disabled={settings.settingsLocked}
                className={cn(
                  "flex items-center justify-between w-full p-3 rounded-lg border transition-colors",
                  settings.redactMode 
                    ? "bg-purple-50 border-purple-200 text-purple-800" 
                    : "bg-stone-50 border-stone-200 text-stone-700",
                  settings.settingsLocked && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="flex items-center gap-2">
                  {settings.redactMode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  Redact Mode
                </span>
                <div className={cn(
                  "w-11 h-6 rounded-full transition-colors relative",
                  settings.redactMode ? "bg-purple-500" : "bg-stone-300"
                )}>
                  <div className={cn(
                    "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform",
                    settings.redactMode ? "translate-x-6" : "translate-x-1"
                  )} />
                </div>
              </button>
              
              {/* No Delete Mode */}
              <button
                onClick={() => !settings.settingsLocked && onUpdateSettings({ noDeleteMode: !settings.noDeleteMode })}
                disabled={settings.settingsLocked}
                className={cn(
                  "flex items-center justify-between w-full p-3 rounded-lg border transition-colors",
                  settings.noDeleteMode 
                    ? "bg-orange-50 border-orange-200 text-orange-800" 
                    : "bg-stone-50 border-stone-200 text-stone-700",
                  settings.settingsLocked && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="flex items-center gap-2">
                  {settings.noDeleteMode ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Unlock className="w-4 h-4" />
                  )}
                  No-Delete Mode
                </span>
                <div className={cn(
                  "w-11 h-6 rounded-full transition-colors relative",
                  settings.noDeleteMode ? "bg-orange-500" : "bg-stone-300"
                )}>
                  <div className={cn(
                    "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform",
                    settings.noDeleteMode ? "translate-x-6" : "translate-x-1"
                  )} />
                </div>
              </button>
              
              {/* No Paste Mode */}
              <button
                onClick={() => !settings.settingsLocked && onUpdateSettings({ noCopyPasteMode: !settings.noCopyPasteMode })}
                disabled={settings.settingsLocked}
                className={cn(
                  "flex items-center justify-between w-full p-3 rounded-lg border transition-colors",
                  settings.noCopyPasteMode 
                    ? "bg-red-50 border-red-200 text-red-800" 
                    : "bg-stone-50 border-stone-200 text-stone-700",
                  settings.settingsLocked && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="flex items-center gap-2">
                  {settings.noCopyPasteMode ? (
                    <CopyX className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  No Paste Mode
                </span>
                <div className={cn(
                  "w-11 h-6 rounded-full transition-colors relative",
                  settings.noCopyPasteMode ? "bg-red-500" : "bg-stone-300"
                )}>
                  <div className={cn(
                    "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform",
                    settings.noCopyPasteMode ? "translate-x-6" : "translate-x-1"
                  )} />
                </div>
              </button>
            </div>
          </div>

          {/* Start Session / Goal Status Button */}
          {!settings.settingsLocked && (
            <div className="mt-6">
              {stats.dailyProgress >= 100 ? (
                <button
                  onClick={onStartSession}
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  🎉 Start New Session
                </button>
              ) : (
                <button
                  onClick={onStartSession}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  🚀 Start Writing Session
                </button>
              )}
              <p className="text-xs text-stone-500 text-center mt-2">
                {stats.dailyProgress >= 100 
                  ? "Congratulations! You can now configure a new session."
                  : "Settings will lock until you reach your goal"
                }
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <p className="text-xs text-stone-500 text-center">
              WriteFlow v{version} - Focus. Write. Flow.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}