export const useLocalStorage = (key: string) => {
  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      // TODO: show a toast notification instead of console error
      console.error(`Error reading localStorage key "${key}":`, error);
      return undefined;
    }
  };

  const setValue = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // TODO: show a toast notification instead of console error
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      // TODO: show a toast notification instead of console error
      console.log(`Error removing localStorage key' "${key}":`, error);
    }
  };

  return { setValue, getValue, removeValue };
};
