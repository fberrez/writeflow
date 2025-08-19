import React, { useRef, useCallback, useEffect } from 'react';
import { cn } from '@/utils';
import type { WritingSettings, Particle } from '@/types';

interface WritingAreaProps {
  text: string;
  setText: (text: string) => void;
  settings: WritingSettings;
  onKeyPress: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onCreateParticle: (x: number, y: number) => void;
  particles: Particle[];
  className?: string;
}

export function WritingArea({
  text,
  setText,
  settings,
  onKeyPress,
  onCreateParticle,
  particles,
  className,
}: WritingAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }, [setText]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyPress(event);
    
    // Create particle effect on keystroke
    if (event.key.length === 1 && textareaRef.current && containerRef.current) {
      const textarea = textareaRef.current;
      
      // Get textarea dimensions and scroll position
      const textareaRect = textarea.getBoundingClientRect();
      const scrollTop = textarea.scrollTop;
      const scrollLeft = textarea.scrollLeft;
      
      // Create a temporary div that mimics the textarea exactly
      const measureDiv = document.createElement('div');
      measureDiv.style.cssText = `
        position: absolute;
        visibility: hidden;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
        font-size: 18px;
        line-height: 1.75;
        padding: 24px;
        width: ${textareaRect.width}px;
        height: ${textareaRect.height}px;
        border: none;
        outline: none;
        overflow: hidden;
      `;
      
      const selectionStart = textarea.selectionStart;
      const textBeforeCursor = text.substring(0, selectionStart);
      
      // Add the text before cursor
      measureDiv.textContent = textBeforeCursor;
      document.body.appendChild(measureDiv);
      
      // Create a span at the cursor position
      const cursorSpan = document.createElement('span');
      cursorSpan.style.cssText = 'position: relative;';
      cursorSpan.textContent = '|'; // Cursor marker
      measureDiv.appendChild(cursorSpan);
      
      // Get the cursor span's position
      const cursorRect = cursorSpan.getBoundingClientRect();
      const measureRect = measureDiv.getBoundingClientRect();
      
      // Calculate relative position within the textarea
      const relativeX = cursorRect.left - measureRect.left;
      const relativeY = cursorRect.top - measureRect.top;
      
      // Clean up
      document.body.removeChild(measureDiv);
      
      // Calculate final position accounting for scroll and container offset
      const finalX = relativeX - scrollLeft + 24; // Add padding offset
      const finalY = relativeY - scrollTop + 24; // Add padding offset
      
      // Ensure particles stay within textarea boundaries
      const maxX = textareaRect.width - 50; // Leave some margin
      const maxY = textareaRect.height - 50; // Leave some margin
      
      const clampedX = Math.max(24, Math.min(finalX, maxX));
      const clampedY = Math.max(24, Math.min(finalY, maxY));
      
      onCreateParticle(clampedX, clampedY);
    }
  }, [onKeyPress, onCreateParticle, text]);

  const handlePaste = useCallback((event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (settings.noCopyPasteMode) {
      event.preventDefault();
    }
  }, [settings.noCopyPasteMode]);

  const handleCopy = useCallback((event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (settings.noCopyPasteMode) {
      event.preventDefault();
    }
  }, [settings.noCopyPasteMode]);

  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLTextAreaElement>) => {
    if (settings.noCopyPasteMode) {
      event.preventDefault();
    }
  }, [settings.noCopyPasteMode]);

  // Auto-focus the textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div ref={containerRef} className={cn("relative flex-1 min-h-0 overflow-hidden", className)}>
      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle animate-particle-float"
          style={{
            left: particle.x,
            top: particle.y,
            '--dx': `${particle.dx}px`,
            '--dy': `${particle.dy}px`,
          } as React.CSSProperties}
        />
      ))}
      
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onCopy={handleCopy}
        onCut={handleCopy}
        onContextMenu={handleContextMenu}
        className={cn(
          "writing-area w-full h-full p-6 text-lg leading-relaxed",
          "focus:outline-none focus:ring-0",
          "placeholder:text-gray-400",
          settings.redactMode && "redacted"
        )}
        placeholder="Start writing your thoughts here... Let the words flow freely."
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}
