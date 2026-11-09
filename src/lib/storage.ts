/**
 * The only module that touches localStorage. Every call is wrapped in try/catch
 * so private browsing, blocked storage or a full quota never breaks the app;
 * progress just lives in memory for that session instead.
 */
export function readItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeItem(key: string, value: string): boolean {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeItem(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
