import { useNotifications } from "../context/notifications";
import { ERROR_NOTIFICATIONS, SUCCESS_NOTIFICATIONS } from "../settings";

export const useLocalStorage = (key: string) => {
  const { addNotification } = useNotifications();

  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      addNotification({
        id: crypto.randomUUID(),
        title: "error",
        description: `Error retrieving localStorage key "${key}": ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
      return undefined;
    }
  };

  const setValue = (
    value: unknown,
    action: keyof typeof SUCCESS_NOTIFICATIONS
  ) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      addNotification({
        id: crypto.randomUUID(),
        title: "success",
        description: SUCCESS_NOTIFICATIONS[action],
      });
    } catch (error) {
      addNotification({
        id: crypto.randomUUID(),
        title: "error",
        description: ERROR_NOTIFICATIONS[action],
      });
    }
  };

  return { setValue, getValue };
};
