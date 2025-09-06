export interface WritingStats {
  wordCount: number;
  characterCount: number;
  sessionDuration: number;
  dailyGoal: number;
  dailyProgress: number;
  streak: number;
  goalType: 'words' | 'timer';
}

export interface WritingSettings {
  showStats: boolean;
  redactMode: boolean;
  noDeleteMode: boolean;
  noCopyPasteMode: boolean;
  goalType: 'words' | 'timer';
  dailyWordGoal: number;
  dailyTimerGoal: number; // in minutes
  isFirstVisit: boolean;
  settingsLocked: boolean;
  sessionStarted: boolean;
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

export interface SessionData {
  startTime: number;
  lastSaveTime: number;
  totalSessionTime: number;
}
