import React from "react";

import { circleCheck, circlePlus, closingCross } from "../../../icons";

import "./toast.scss";

type ToastNotificationProps = {
  errorDescription: string;
  title: string;
  variant: "error" | "success";
};

const ToastNotification: React.FC<ToastNotificationProps> = ({
  errorDescription,
  title,
  variant,
}) => {
  return (
    <div className={`toast toast-${variant}`} key={errorDescription}>
      {variant === "error" ? circlePlus : circleCheck}
      <h6 className="toast-title">{title}</h6>
      <p className="toast-text">{errorDescription}</p>
      <button
        className="toast-close-button"
        // onClick={() => closeErrorToast(index)}
        type="button"
      >
        {closingCross}
      </button>
    </div>
  );
};

export default ToastNotification;
