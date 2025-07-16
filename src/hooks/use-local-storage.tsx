import { useNotifications } from "@context/notifications";
import { ERROR_NOTIFICATIONS, SUCCESS_NOTIFICATIONS } from "@settings";

export const useLocalStorage = (key: string) => {
  const { addNotification } = useNotifications();

  const getValue = (): Character[] | undefined => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch {
      return undefined;
    }
  };

  const setValue = (
    value: Character[],
    action: keyof typeof SUCCESS_NOTIFICATIONS
  ): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      addNotification({
        title: "success",
        description: SUCCESS_NOTIFICATIONS[action],
      });
    } catch {
      addNotification({
        title: "error",
        description: ERROR_NOTIFICATIONS[action],
      });
    }
  };

  return { setValue, getValue };
};
