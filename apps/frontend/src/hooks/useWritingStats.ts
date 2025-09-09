import { useState, useEffect, useCallback } from 'react';
import { countWords, countCharacters } from '@/utils';
import type { WritingStats, SessionData } from '@/types';

export function useWritingStats(text: string, settings: { goalType: 'words' | 'timer'; dailyWordGoal: number; dailyTimerGoal: number; sessionStarted: boolean }, sessionData?: SessionData) {
  const [stats, setStats] = useState<WritingStats>({
    wordCount: 0,
    characterCount: 0,
    sessionDuration: 0,
    dailyGoal: settings.goalType === 'words' ? settings.dailyWordGoal : settings.dailyTimerGoal,
    dailyProgress: 0,
    goalReachedCount: 0,
    streak: 1, // Start with 1 for motivation
    goalType: settings.goalType,
  });

  const [sessionStartTime, setSessionStartTime] = useState(sessionData?.startTime || Date.now());
  const [baseSessionTime] = useState(sessionData?.totalSessionTime || 0);
  const [previousSessionStarted, setPreviousSessionStarted] = useState(settings.sessionStarted);

  // Update session start time when session begins (transitions from false to true)
  useEffect(() => {
    if (settings.sessionStarted && !previousSessionStarted) {
      // Session just started, reset the start time to now
      setSessionStartTime(Date.now());
      console.log('⏱️ Timer reset - session starting now');
    }
    setPreviousSessionStarted(settings.sessionStarted);
  }, [settings.sessionStarted, previousSessionStarted]);

  // Update word and character counts when text changes
  useEffect(() => {
    const wordCount = countWords(text);
    const characterCount = countCharacters(text);
    
    // Calculate progress based on goal type
    let dailyProgress = 0;
    let goalReachedCount = 0;
    const currentGoal = settings.goalType === 'words' ? settings.dailyWordGoal : settings.dailyTimerGoal;
    
    if (settings.goalType === 'words') {
      const rawProgress = (wordCount / settings.dailyWordGoal) * 100;
      dailyProgress = rawProgress;
      goalReachedCount = Math.floor(rawProgress / 100);
    } else {
      // Timer goal - progress based on session duration in minutes (only if session started)
      if (settings.sessionStarted) {
        const sessionMinutes = Math.floor(baseSessionTime / 1000 / 60) + Math.floor((Date.now() - sessionStartTime) / 1000 / 60);
        const rawProgress = (sessionMinutes / settings.dailyTimerGoal) * 100;
        dailyProgress = rawProgress;
        goalReachedCount = Math.floor(rawProgress / 100);
      } else {
        dailyProgress = 0; // No progress if session hasn't started
        goalReachedCount = 0;
      }
    }

    setStats(prev => ({
      ...prev,
      wordCount,
      characterCount,
      dailyProgress,
      goalReachedCount,
      dailyGoal: currentGoal,
      goalType: settings.goalType,
    }));
  }, [text, settings, baseSessionTime, sessionStartTime]);

  // Update session duration every second (only when session is started)
  useEffect(() => {
    if (!settings.sessionStarted) {
      // If session hasn't started, keep duration at 0
      setStats(prev => ({
        ...prev,
        sessionDuration: 0,
      }));
      return;
    }

    const interval = setInterval(() => {
      const currentSessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
      const totalSessionDuration = Math.floor(baseSessionTime / 1000) + currentSessionTime;
      
      setStats(prev => ({
        ...prev,
        sessionDuration: totalSessionDuration,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime, baseSessionTime, settings.sessionStarted]);

  const updateDailyGoal = useCallback((newGoal: number, goalType: 'words' | 'timer') => {
    setStats(prev => {
      let dailyProgress = 0;
      let goalReachedCount = 0;
      
      if (goalType === 'words') {
        const rawProgress = (prev.wordCount / newGoal) * 100;
        dailyProgress = rawProgress;
        goalReachedCount = Math.floor(rawProgress / 100);
      } else {
        const sessionMinutes = Math.floor(prev.sessionDuration / 60);
        const rawProgress = (sessionMinutes / newGoal) * 100;
        dailyProgress = rawProgress;
        goalReachedCount = Math.floor(rawProgress / 100);
      }
      
      return {
        ...prev,
        dailyGoal: newGoal,
        dailyProgress,
        goalReachedCount,
        goalType,
      };
    });
  }, []);

  return {
    stats,
    updateDailyGoal,
  };
}
