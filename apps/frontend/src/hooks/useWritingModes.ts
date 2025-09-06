import { useCallback } from 'react';
import type { WritingSettings } from '@/types';

export function useWritingModes(settings: WritingSettings) {
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // No-delete mode: prevent backspace and delete keys
    if (settings.noDeleteMode && (event.key === 'Backspace' || event.key === 'Delete')) {
      event.preventDefault();
      return false;
    }

    // No paste mode: prevent Ctrl+V, Ctrl+X (but allow Ctrl+C and Ctrl+A for export)
    if (settings.noCopyPasteMode && (event.ctrlKey || event.metaKey)) {
      if (event.key === 'v' || event.key === 'x') {
        event.preventDefault();
        return false;
      }
      // Allow Ctrl+C for copying and Ctrl+A for selecting all text for export
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
    // Allow copying even in no-copy/paste mode for text export
    return true;
  }, []);

  const handleCut = useCallback((event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (settings.noCopyPasteMode) {
      event.preventDefault();
      return false;
    }
    return true;
  }, [settings.noCopyPasteMode]);

  const handleContextMenu = useCallback((event: React.MouseEvent<HTMLTextAreaElement>) => {
    // Always allow context menu so users can copy text for export
    return true;
  }, []);

  return {
    handleKeyDown,
    handlePaste,
    handleCopy,
    handleCut,
    handleContextMenu,
  };
}
