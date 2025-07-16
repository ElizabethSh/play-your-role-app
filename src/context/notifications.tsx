import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

const CLEAR_MESSAGE_TIMEOUT = 2000;

type NotificationsProps = {
  children: React.ReactNode;
};
export type Notification = {
  description: string;
  id?: string;
  title: "error" | "success";
};

type NotificationsContextType = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  closeNotification: (id: string) => void;
  setIsHovered: (isHovered: boolean) => void;
};

export const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({ children }: NotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout> | null = null;

    if (!isHovered && notifications.length) {
      timeoutID = setTimeout(() => {
        const notificationsCopy = notifications.slice();
        const removedNotification = notificationsCopy.shift();
        if (removedNotification?.id) {
          removeNotification(removedNotification.id);
        }
      }, CLEAR_MESSAGE_TIMEOUT);
    }

    return () => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    };
  }, [notifications, isHovered, removeNotification]);

  const closeNotification = useCallback((id: string): void => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => [
      ...prev,
      { ...notification, id: notification.id || uuidv4() },
    ]);
  }, []);

  // Memoize the context value to optimize performance
  const contextValue = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
      closeNotification,
      setIsHovered,
    }),
    [
      notifications,
      addNotification,
      removeNotification,
      closeNotification,
      setIsHovered,
    ]
  );

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications was called without being inside a NotificationProvider"
    );
  }
  return context;
};
