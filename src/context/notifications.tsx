import { createContext, useContext, useEffect, useState } from "react";

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
  id: string;
  title: "error" | "success";
};

export const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({ children }: NotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout>;

    if (!isHovered && notifications.length) {
      timeoutID = setTimeout(() => {
        const notificationsCopy = notifications.slice();
        const removedNotification = notificationsCopy.shift();
        if (removedNotification) {
          removeNotification(removedNotification.id);
        }
      }, CLEAR_MESSAGE_TIMEOUT);
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [notifications, isHovered]);

  const closeNotification = (index: number): void => {
    const notificationsCopy = notifications.slice();
    notificationsCopy.splice(index, 1);

    setNotifications(notificationsCopy);
  };

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        closeNotification,
        setIsHovered,
      }}
    >
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
