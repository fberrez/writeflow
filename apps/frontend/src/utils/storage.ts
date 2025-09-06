/**
 * Local storage utilities for WriteFlow app persistence
 */

const STORAGE_KEYS = {
  TEXT: 'writeflow_text',
  SETTINGS: 'writeflow_settings',
  SESSION: 'writeflow_session',
  STATS: 'writeflow_stats',
} as const;

/**
 * Safely get item from localStorage with error handling
 */
function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.warn(`Failed to load ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safely set item in localStorage with error handling
 */
function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
}

/**
 * Remove item from localStorage
 */
function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove ${key} from localStorage:`, error);
  }
}

// Text content persistence
export const textStorage = {
  save: (text: string) => setStorageItem(STORAGE_KEYS.TEXT, text),
  load: () => getStorageItem(STORAGE_KEYS.TEXT, ''),
  clear: () => removeStorageItem(STORAGE_KEYS.TEXT),
};

// Settings persistence
export const settingsStorage = {
  save: (settings: Record<string, any>) => setStorageItem(STORAGE_KEYS.SETTINGS, settings),
  load: (): Record<string, any> | null => getStorageItem(STORAGE_KEYS.SETTINGS, null),
  clear: () => removeStorageItem(STORAGE_KEYS.SETTINGS),
};

// Session data (timer, start time, etc.)
export const sessionStorage = {
  save: (session: Record<string, any>) => setStorageItem(STORAGE_KEYS.SESSION, session),
  load: (): Record<string, any> | null => getStorageItem(STORAGE_KEYS.SESSION, null),
  clear: () => removeStorageItem(STORAGE_KEYS.SESSION),
};

// Writing stats persistence
export const statsStorage = {
  save: (stats: Record<string, any>) => setStorageItem(STORAGE_KEYS.STATS, stats),
  load: (): Record<string, any> | null => getStorageItem(STORAGE_KEYS.STATS, null),
  clear: () => removeStorageItem(STORAGE_KEYS.STATS),
};

/**
 * Clear all WriteFlow data from localStorage
 */
export const clearAllStorage = () => {
  textStorage.clear();
  settingsStorage.clear();
  sessionStorage.clear();
  statsStorage.clear();
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, 'test');
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};
