import React from "react";

import { useNotifications } from "@context/notifications";

import ToastNotification from "./toast";

import "./toast-notifications.scss";

const ToastNotifications: React.FC = () => {
  const { notifications, setIsHovered } = useNotifications();

  return (
    <div
      className="notifications-list"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {notifications.map((notification) => (
        <ToastNotification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default ToastNotifications;
