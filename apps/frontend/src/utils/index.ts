import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function generateParticleId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getRandomParticleDirection(): { dx: number; dy: number } {
  const angle = Math.random() * Math.PI * 2;
  const speed = 30 + Math.random() * 40;
  return {
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
  };
}

// Re-export storage utilities
export * from './storage';
