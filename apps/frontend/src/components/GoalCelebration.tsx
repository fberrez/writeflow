import { useEffect, useState, useRef } from 'react';
import { Trophy, Sparkles } from 'lucide-react';

interface GoalCelebrationProps {
  isVisible: boolean;
  onComplete: () => void;
  goalAmount: number;
}

export function GoalCelebration({ isVisible, onComplete, goalAmount }: GoalCelebrationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep the onComplete reference up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Function to handle smooth closing
  const handleClose = () => {
    if (isClosing) return; // Prevent double-closing
    
    setIsClosing(true);
    
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Wait for fade-out animation to complete before calling onComplete
    closeTimerRef.current = setTimeout(() => {
      setIsClosing(false);
      setConfetti([]);
      onCompleteRef.current();
    }, 300); // 300ms fade-out duration
  };

  useEffect(() => {
    if (isVisible) {
      
      // Create confetti particles
      const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setConfetti(particles);

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Auto-hide after animation - much faster to not interrupt writing
      timerRef.current = setTimeout(() => {
        handleClose();
      }, 3000);

    } else {
      setConfetti([]);
      setIsClosing(false);
      
      // Clear timers when hiding
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    }

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      {/* Backdrop - more subtle, clickable to close */}
      <div 
        className="absolute inset-0 bg-black/10 animate-fade-in pointer-events-auto cursor-pointer" 
        onClick={handleClose}
      />
      
      {/* Confetti */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: '-10px',
            animationDelay: `${particle.delay}s`,
            animationDuration: '2s',
            transform: 'translateY(100vh)',
          }}
        />
      ))}

      {/* Main celebration modal - smaller and less intrusive */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className={`glass-strong p-6 text-center max-w-sm mx-4 pointer-events-auto cursor-pointer transform transition-all duration-300 ${
            isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100 animate-fade-in'
          }`} 
          onClick={handleClose}
        >
          {/* Trophy icon with sparkle effect - smaller */}
          <div className="relative mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto animate-bounce" />
            <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>

          {/* Celebration text - more concise */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            🎉 Goal Achieved!
          </h2>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold text-yellow-600">{goalAmount.toLocaleString()}</span> words completed!
          </p>
        </div>
      </div>
    </div>
  );
}
