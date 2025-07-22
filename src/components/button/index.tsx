import MUIButton, { ButtonProps as MUIButtonProps } from "@mui/material/Button";

import "./button.scss";

type ButtonProps = MUIButtonProps & {
  label: string;
  variant: "contained" | "outlined";
  modification: "primary" | "confirm" | "danger";
};

const Button: React.FC<ButtonProps> = ({
  variant,
  label,
  type = "button",
  modification,
  disabled = false,
  ...buttonProps
}) => {
  return (
    <MUIButton
      {...buttonProps}
      variant={variant}
      className={`button-custom button-${modification}`}
      type={type}
      disabled={disabled}
    >
      {label}
    </MUIButton>
  );
};

export default Button;
