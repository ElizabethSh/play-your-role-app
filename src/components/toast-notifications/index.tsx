import { useState } from "react";

import { circlePlus, closingCross } from "../../icons";

import ToastNotification from "./toast";

import "./toast-notifications.scss";

type Error = {
  errorDescription: string;
  title: "error" | "success";
  variant?: "error" | "success";
};

const ToastNotifications: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const errors: Error[] = [
    { title: "error", errorDescription: "This is an error description." },
    { title: "success", errorDescription: "This is a success description." },
  ];

  return (
    <div
      className="notifications-list"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {errors.map(({ title, errorDescription }) => (
        <ToastNotification
          errorDescription={errorDescription}
          key={errorDescription}
          title={title}
          variant={title}
        />
      ))}
    </div>
  );
};

export default ToastNotifications;
