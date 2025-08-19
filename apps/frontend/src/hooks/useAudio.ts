import { useState, useCallback, useRef } from 'react';
import type { AudioContextState } from '@/types';

export function useAudio() {
  const [audioState, setAudioState] = useState<AudioContextState>({
    context: null,
    gainNode: null,
    isInitialized: false,
  });
  
  const initAudioRef = useRef<() => Promise<void>>();

  const initializeAudio = useCallback(async () => {
    if (audioState.isInitialized) return;

    try {
      console.log('🔊 Initializing audio context...');
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume context if it's suspended (required by browser policies)
      if (context.state === 'suspended') {
        console.log('🔊 Resuming suspended audio context...');
        await context.resume();
      }
      
      const gainNode = context.createGain();
      gainNode.connect(context.destination);
      gainNode.gain.setValueAtTime(0.2, context.currentTime); // Increased volume

      setAudioState({
        context,
        gainNode,
        isInitialized: true,
      });
      
      console.log('🔊 Audio context initialized successfully!', context.state);
    } catch (error) {
      console.warn('Failed to initialize audio context:', error);
    }
  }, [audioState.isInitialized]);

  initAudioRef.current = initializeAudio;

  const playTypingSound = useCallback((soundType: 'random' | 'pop' | 'click' | 'chime' | 'drop' = 'random') => {
    if (!audioState.context || !audioState.gainNode) {
      console.log('🔊 Audio not initialized, context:', !!audioState.context, 'gainNode:', !!audioState.gainNode);
      return;
    }

    if (audioState.context.state !== 'running') {
      console.log('🔊 Audio context not running:', audioState.context.state);
      return;
    }

    try {
      console.log('🔊 Playing satisfying typing sound...');
      const context = audioState.context;
      const now = context.currentTime;
      
      // Choose sound type
      let selectedSoundType = soundType;
      if (soundType === 'random') {
        const soundTypes = ['pop', 'click', 'chime', 'drop'];
        selectedSoundType = soundTypes[Math.floor(Math.random() * soundTypes.length)] as 'pop' | 'click' | 'chime' | 'drop';
      }
      
      switch (selectedSoundType) {
        case 'pop':
          playPopSound(context, now);
          break;
        case 'click':
          playClickSound(context, now);
          break;
        case 'chime':
          playChimeSound(context, now);
          break;
        case 'drop':
          playDropSound(context, now);
          break;
      }
      
      console.log(`🔊 ${selectedSoundType} sound played successfully!`);
      
    } catch (error) {
      console.warn('Failed to play typing sound:', error);
    }
  }, [audioState.context, audioState.gainNode]);

  // Bubble pop sound - inspired by bubble wrap and iOS notification sounds
  const playPopSound = (context: AudioContext, now: number) => {
    const osc = context.createOscillator();
    const envelope = context.createGain();
    const filter = context.createBiquadFilter();
    
    osc.connect(envelope);
    envelope.connect(filter);
    filter.connect(audioState.gainNode!);
    
    // Frequency sweep for pop effect
    const startFreq = 400 + Math.random() * 200;
    const endFreq = startFreq * 2.5;
    
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.05);
    osc.type = 'sine';
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, now);
    
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(0.3, now + 0.01);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.1);
  };

  // Mechanical click - inspired by Cherry MX switches and satisfying button clicks
  const playClickSound = (context: AudioContext, now: number) => {
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const envelope = context.createGain();
    const filter = context.createBiquadFilter();
    
    osc1.connect(envelope);
    osc2.connect(envelope);
    envelope.connect(filter);
    filter.connect(audioState.gainNode!);
    
    // Two-tone click like mechanical keyboards
    osc1.frequency.setValueAtTime(1200 + Math.random() * 300, now);
    osc2.frequency.setValueAtTime(2400 + Math.random() * 600, now);
    osc1.type = 'square';
    osc2.type = 'triangle';
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(2, now);
    
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(0.2, now + 0.003);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.03);
    osc2.stop(now + 0.03);
  };

  // Wind chime sound - inspired by meditation apps and calming UI sounds
  const playChimeSound = (context: AudioContext, now: number) => {
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const osc3 = context.createOscillator();
    const envelope = context.createGain();
    const filter = context.createBiquadFilter();
    
    osc1.connect(envelope);
    osc2.connect(envelope);
    osc3.connect(envelope);
    envelope.connect(filter);
    filter.connect(audioState.gainNode!);
    
    // Pentatonic scale frequencies for pleasant harmony
    const frequencies = [523.25, 587.33, 659.25, 783.99, 880.00]; // C, D, E, G, A
    const selectedFreqs = [
      frequencies[Math.floor(Math.random() * frequencies.length)],
      frequencies[Math.floor(Math.random() * frequencies.length)],
      frequencies[Math.floor(Math.random() * frequencies.length)]
    ];
    
    osc1.frequency.setValueAtTime(selectedFreqs[0], now);
    osc2.frequency.setValueAtTime(selectedFreqs[1], now);
    osc3.frequency.setValueAtTime(selectedFreqs[2], now);
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc3.type = 'sine';
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(0.15, now + 0.02);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    osc1.start(now);
    osc2.start(now + 0.01);
    osc3.start(now + 0.02);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
    osc3.stop(now + 0.4);
  };

  // Water drop sound - inspired by nature sounds and zen apps
  const playDropSound = (context: AudioContext, now: number) => {
    const osc = context.createOscillator();
    const envelope = context.createGain();
    const filter = context.createBiquadFilter();
    
    osc.connect(envelope);
    envelope.connect(filter);
    filter.connect(audioState.gainNode!);
    
    // Water drop frequency sweep
    const startFreq = 800 + Math.random() * 400;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 0.3, now + 0.08);
    osc.type = 'sine';
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.linearRampToValueAtTime(500, now + 0.08);
    
    envelope.gain.setValueAtTime(0, now);
    envelope.gain.linearRampToValueAtTime(0.25, now + 0.005);
    envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.start(now);
    osc.stop(now + 0.08);
  };

  // Auto-initialize on first user interaction
  const handleUserInteraction = useCallback(async () => {
    if (!audioState.isInitialized && initAudioRef.current) {
      console.log('🔊 User interaction detected, initializing audio...');
      await initAudioRef.current();
    }
  }, [audioState.isInitialized]);

  return {
    playTypingSound,
    handleUserInteraction,
    isAudioReady: audioState.isInitialized,
  };
}
