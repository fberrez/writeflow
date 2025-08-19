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
          <Type className="w-4 h-4 text-indigo-500" />
          <div>
            <div className="text-sm text-gray-500">Words</div>
            <div className="text-xl font-semibold text-gray-800">{stats.wordCount.toLocaleString()}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Hash className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Characters</div>
            <div className="text-xl font-semibold text-gray-800">{stats.characterCount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Session Timer */}
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-green-500" />
        <div>
          <div className="text-sm text-gray-500">Session Time</div>
          <div className="text-lg font-semibold text-gray-800">{formatTime(stats.sessionDuration)}</div>
        </div>
      </div>

      {/* Daily Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-gray-500">Daily Goal</span>
          </div>
          <span className="text-sm text-gray-700">
            {stats.wordCount} / {stats.dailyGoal}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500 ease-out animate-progress-fill"
            style={{
              '--progress': `${stats.dailyProgress}%`,
            } as React.CSSProperties}
          />
        </div>
        <div className="text-right text-xs text-gray-500">
          {stats.dailyProgress.toFixed(1)}% complete
        </div>
      </div>

      {/* Writing Streak */}
      <div className="flex items-center space-x-2">
        <Zap className="w-4 h-4 text-orange-500" />
        <div>
          <div className="text-sm text-gray-500">Writing Streak</div>
          <div className="text-lg font-semibold text-gray-800">
            {stats.streak} {stats.streak === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>
    </div>
  );
}
