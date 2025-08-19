import { useCallback } from 'react';
import type { WritingSettings } from '@/types';

export function useWritingModes(settings: WritingSettings) {
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // No-delete mode: prevent backspace and delete keys
    if (settings.noDeleteMode && (event.key === 'Backspace' || event.key === 'Delete')) {
      event.preventDefault();
      return false;
    }

    // No copy/paste mode: prevent Ctrl+C, Ctrl+V, Ctrl+X
    if (settings.noCopyPasteMode && (event.ctrlKey || event.metaKey)) {
      if (event.key === 'c' || event.key === 'v' || event.key === 'x' || event.key === 'a') {
        event.preventDefault();
        return false;
      }
    }

    return true;
  }, [settings.noDeleteMode, settings.noCopyPasteMode]);

  const handlePaste = useCallback((event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (settings.noCopyPasteMode) {
      event.preventDefault();
      return false;
    }
    return true;
  }, [settings.noCopyPasteMode]);

  const handleCopy = useCallback((event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (settings.noCopyPasteMode) {
      event.preventDefault();
      return false;
    }
    return true;
  }, [settings.noCopyPasteMode]);

  const handleCut = useCallback((event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (settings.noCopyPasteMode) {
      event.preventDefault();
      return false;
    }
    return true;
  }, [settings.noCopyPasteMode]);

  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLTextAreaElement>) => {
    if (settings.noCopyPasteMode) {
      event.preventDefault();
      return false;
    }
    return true;
  }, [settings.noCopyPasteMode]);

  return {
    handleKeyDown,
    handlePaste,
    handleCopy,
    handleCut,
    handleContextMenu,
  };
}
