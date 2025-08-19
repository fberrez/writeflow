export interface WritingStats {
  wordCount: number;
  characterCount: number;
  sessionDuration: number;
  dailyGoal: number;
  dailyProgress: number;
  streak: number;
}

export interface WritingSettings {
  soundEnabled: boolean;
  soundType: 'random' | 'pop' | 'click' | 'chime' | 'drop';
  showStats: boolean;
  redactMode: boolean;
  noDeleteMode: boolean;
  noCopyPasteMode: boolean;
  dailyWordGoal: number;
}

export interface Particle {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
}

export interface AudioContextState {
  context: AudioContext | null;
  gainNode: GainNode | null;
  isInitialized: boolean;
}
