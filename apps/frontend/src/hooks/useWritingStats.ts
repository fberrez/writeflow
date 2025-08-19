import { useState, useEffect, useCallback } from 'react';
import { countWords, countCharacters } from '@/utils';
import type { WritingStats } from '@/types';

export function useWritingStats(text: string, dailyGoal: number = 500) {
  const [stats, setStats] = useState<WritingStats>({
    wordCount: 0,
    characterCount: 0,
    sessionDuration: 0,
    dailyGoal,
    dailyProgress: 0,
    streak: 1, // Start with 1 for motivation
  });

  const [sessionStartTime] = useState(Date.now());

  // Update word and character counts when text changes
  useEffect(() => {
    const wordCount = countWords(text);
    const characterCount = countCharacters(text);
    const dailyProgress = Math.min((wordCount / dailyGoal) * 100, 100);

    setStats(prev => ({
      ...prev,
      wordCount,
      characterCount,
      dailyProgress,
      dailyGoal,
    }));
  }, [text, dailyGoal]);

  // Update session duration every second
  useEffect(() => {
    const interval = setInterval(() => {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
      setStats(prev => ({
        ...prev,
        sessionDuration,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  const updateDailyGoal = useCallback((newGoal: number) => {
    setStats(prev => ({
      ...prev,
      dailyGoal: newGoal,
      dailyProgress: Math.min((prev.wordCount / newGoal) * 100, 100),
    }));
  }, []);

  return {
    stats,
    updateDailyGoal,
  };
}
