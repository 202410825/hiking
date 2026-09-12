const STORAGE_KEY = "hiking-stamp-state-v2";

export function loadState(defaultData) {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      // fall through to default
    }
  }
  return JSON.parse(JSON.stringify(defaultData));
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
