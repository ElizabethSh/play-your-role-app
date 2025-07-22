import React from "react";

import "./button.scss";

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  type?: "button" | "submit" | "reset";
  label: string;
  variant: "primary" | "confirm" | "danger";
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  variant,
  ...buttonProps
}) => {
  const classNames = ["button-custom", `button-${variant}`];
  return (
    <button {...buttonProps} type={type} className={classNames.join(" ")}>
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
