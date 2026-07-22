/** Safely get a JSON-parsed item from localStorage */
export const getItem = <T>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

/** Safely set a JSON-stringified item in localStorage */
export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently ignore storage errors (e.g. private mode quota)
  }
};

/** Remove an item from localStorage */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {
    // no-op
  }
};
