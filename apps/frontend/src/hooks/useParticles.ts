import { useState, useCallback } from 'react';
import { generateParticleId, getRandomParticleDirection } from '@/utils';
import type { Particle } from '@/types';

export function useParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticle = useCallback((x: number, y: number) => {
    const { dx, dy } = getRandomParticleDirection();
    const particle: Particle = {
      id: generateParticleId(),
      x,
      y,
      dx,
      dy,
      life: 1,
    };

    setParticles((prev: Particle[]) => [...prev, particle]);

    // Remove particle after animation
    setTimeout(() => {
      setParticles((prev: Particle[]) => prev.filter((p: Particle) => p.id !== particle.id));
    }, 800);
  }, []);

  const createCelebrationConfetti = useCallback((cursorX: number, cursorY: number) => {
    // Create 25-35 particles for celebration
    const particleCount = 25 + Math.floor(Math.random() * 10);
    
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        // Random position around cursor with small initial spread
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const radius = 5 + Math.random() * 15; // Small initial radius around cursor
        const startX = cursorX + Math.cos(angle) * radius;
        const startY = cursorY + Math.sin(angle) * radius;
        
        // Explosive movement in all directions from cursor
        const explosionAngle = Math.random() * Math.PI * 2;
        const explosionSpeed = 100 + Math.random() * 300; // Strong explosion
        const dx = Math.cos(explosionAngle) * explosionSpeed;
        const dy = Math.sin(explosionAngle) * explosionSpeed;
        
        const particle: Particle = {
          id: generateParticleId(),
          x: startX,
          y: startY,
          dx,
          dy,
          life: 1,
        };

        setParticles((prev: Particle[]) => [...prev, particle]);

        // Longer animation for celebration
        setTimeout(() => {
          setParticles((prev: Particle[]) => prev.filter((p: Particle) => p.id !== particle.id));
        }, 2000);
      }, i * 30); // Faster stagger for more explosive feel
    }
  }, []);

  const clearParticles = useCallback(() => {
    setParticles([]);
  }, []);

  return {
    particles,
    createParticle,
    createCelebrationConfetti,
    clearParticles,
  };
}
