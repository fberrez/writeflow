import { useCallback, useRef } from 'react';

export function useGoalCelebration() {
  const previousGoalReached = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const checkGoalCompletion = useCallback((progress: number, onCelebrate?: () => void) => {
    const goalReached = progress >= 100;
    
    // Trigger celebration only when goal is reached for the first time in this session
    if (goalReached && !previousGoalReached.current) {
      console.log('🎉 Goal completed! Starting celebration...');
      previousGoalReached.current = true;
      
      // Play celebration sound
      if (!audioRef.current) {
        audioRef.current = new Audio('/celebrate.mp3');
        audioRef.current.volume = 0.7;
      }
      
      audioRef.current.play().catch(error => {
        console.warn('Failed to play celebration sound:', error);
      });
      
      // Trigger confetti
      if (onCelebrate) {
        onCelebrate();
      }
    } else if (!goalReached) {
      previousGoalReached.current = false;
    }
  }, []);

  const resetCelebration = useCallback(() => {
    previousGoalReached.current = false;
  }, []);

  return {
    checkGoalCompletion,
    resetCelebration,
  };
}
