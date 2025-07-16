import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CLEAR_MESSAGE_TIMEOUT = 2000;

type NotificationsProps = {
  children: React.ReactNode;
};

type NotificationsContextType = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  closeNotification: (index: number) => void;
  setIsHovered: (isHovered: boolean) => void;
};

export type Notification = {
  description: string;
  id?: string;
  title: "error" | "success";
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
    let timeoutID: ReturnType<typeof setTimeout>;

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
      clearTimeout(timeoutID);
    };
  }, [notifications, isHovered, removeNotification]);

  const closeNotification = useCallback(
    (index: number): void => {
      const notificationsCopy = notifications.slice();
      notificationsCopy.splice(index, 1);
      setNotifications(notificationsCopy);
    },
    [notifications]
  );

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => [
      ...prev,
      { ...notification, id: notification.id || crypto.randomUUID() },
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
