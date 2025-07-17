import { useCallback } from "react";

import { useNotifications } from "@context/notifications";
import { ERROR_NOTIFICATIONS, SUCCESS_NOTIFICATIONS } from "@settings";
import { get, set } from "idb-keyval";

import { Character } from "types/character";

export const useIndexedDB = (key: string) => {
  const { addNotification } = useNotifications();

  const getValue = useCallback(async (): Promise<Character[] | undefined> => {
    try {
      const item = await get(key);
      return item ? (item as Character[]) : [];
    } catch {
      return undefined;
    }
  }, [key]);

  const setValue = useCallback(
    async (
      value: Character[],
      action: keyof typeof SUCCESS_NOTIFICATIONS
    ): Promise<void> => {
      try {
        await set(key, value);
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
    },
    [key, addNotification]
  );

  return { getValue, setValue };
};
