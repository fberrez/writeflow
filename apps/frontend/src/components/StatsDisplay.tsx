import React from 'react';
import { Clock, Target, Zap, Type, Hash } from 'lucide-react';
import { cn, formatTime } from '@/utils';
import type { WritingStats } from '@/types';

interface StatsDisplayProps {
  stats: WritingStats;
  className?: string;
}

export function StatsDisplay({ stats, className }: StatsDisplayProps) {
  return (
    <div className={cn("glass p-4 space-y-4", className)}>
      {/* Word and Character Count */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Type className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-sm text-stone-500">Words</div>
            <div className="text-xl font-semibold text-stone-800">{stats.wordCount.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Hash className="w-4 h-4 text-indigo-500" />
          <div>
            <div className="text-sm text-stone-500">Characters</div>
            <div className="text-xl font-semibold text-stone-800">{stats.characterCount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Session Timer */}
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-green-500" />
        <div>
          <div className="text-sm text-stone-500">Session Time</div>
          <div className="text-lg font-semibold text-stone-800">{formatTime(stats.sessionDuration)}</div>
        </div>
      </div>

      {/* Daily Progress */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-stone-700">
              {stats.goalType === 'words' ? 'Word Goal' : 'Timer Goal'}
            </span>
          </div>
          <span className="text-sm font-semibold text-stone-800">
            {stats.goalType === 'words' 
              ? `${stats.wordCount.toLocaleString()} / ${stats.dailyGoal.toLocaleString()}` 
              : `${Math.floor(stats.sessionDuration / 60)} / ${stats.dailyGoal} min`
            }
          </span>
        </div>
        <div className="relative w-full bg-stone-200 rounded-full h-2 overflow-hidden progress-stack">
          {/* Completed progress bars */}
          {Array.from({ length: stats.goalReachedCount }, (_, index) => (
            <div
              key={`completed-${index}`}
              className={cn(
                "absolute top-0 left-0 h-full rounded-full progress-bar animate-stack-slide-in",
                stats.goalType === 'words' 
                  ? "bg-gradient-to-r from-amber-400 to-amber-500"
                  : "bg-gradient-to-r from-amber-500 to-amber-600"
              )}
              style={{
                width: '100%',
                zIndex: stats.goalReachedCount - index,
                transform: `translateY(${index * 1}px)`,
                opacity: 0.7 - (index * 0.1),
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                animationDelay: `${index * 0.1}s`,
              } as React.CSSProperties}
            />
          ))}
          
          {/* Current progress bar */}
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out animate-progress-fill",
              stats.goalType === 'words' 
                ? "bg-gradient-to-r from-blue-400 to-blue-500" 
                : "bg-gradient-to-r from-green-400 to-green-500"
            )}
            style={{
              '--progress': `${stats.goalReachedCount > 0 ? (stats.dailyProgress % 100) : Math.min(stats.dailyProgress, 100)}%`,
              zIndex: stats.goalReachedCount + 1,
              transform: `translateY(${stats.goalReachedCount * 1}px)`,
            } as React.CSSProperties}
          />
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <span className="text-stone-500">
            {stats.goalReachedCount > 0 ? (
              <>
                <span className="font-medium text-stone-700">{(stats.dailyProgress % 100).toFixed(1)}%</span>
                <span className="ml-1">of next goal</span>
              </>
            ) : (
              <>
                <span className="font-medium text-stone-700">{stats.dailyProgress.toFixed(1)}%</span>
                <span className="ml-1">complete</span>
              </>
            )}
          </span>
          {stats.goalReachedCount > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
              🎯 {stats.goalReachedCount}x
            </span>
          )}
        </div>
      </div>

      {/* Writing Streak */}
      <div className="flex items-center space-x-2">
        <Zap className="w-4 h-4 text-orange-500" />
        <div>
          <div className="text-sm text-stone-500">Writing Streak</div>
          <div className="text-lg font-semibold text-stone-800">
            {stats.streak} {stats.streak === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>
    </div>
  );
}
