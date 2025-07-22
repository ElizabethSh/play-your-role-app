import MUIButton from "@mui/material/Button";

import "index.scss";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  label: string;
  variant: "contained" | "outlined";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  modification: "primary" | "confirm" | "danger";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant,
  label,
  type,
  className,
  onClick,
  modification,
  disabled = false,
}) => {
  return (
    <MUIButton
      variant={variant}
      className={`button button-${modification} ${className || ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </MUIButton>
  );
};

export default Button;
