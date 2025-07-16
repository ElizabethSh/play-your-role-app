import React from "react";

import { Notification, useNotifications } from "@context/notifications";

import { circleCheck, circlePlus, closingCross } from "icons";

import "./toast.scss";

export type ToastNotificationProps = {
  notification: Notification;
};

const ToastNotification: React.FC<ToastNotificationProps> = ({
  notification,
}) => {
  const { closeNotification } = useNotifications();
  const { title, description, id } = notification;

  return (
    <div className={`toast toast-${title}`} role="status">
      {title === "error" ? circlePlus : circleCheck}
      <h6 className="toast-title">{title}</h6>
      <p className="toast-text">{description}</p>
      <button
        aria-label="Close notification"
        className="toast-close-button"
        onClick={() => id && closeNotification(id)}
        type="button"
      >
        {closingCross}
      </button>
    </div>
  );
};

export default ToastNotification;
