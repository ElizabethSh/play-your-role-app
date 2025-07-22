import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./index";

describe("Button", () => {
  it("should render with label, correct class and attributes for primary modification", () => {
    render(
      <Button label="Primary" variant="contained" modification="primary" />
    );
    const button = screen.getByRole("button", { name: "Primary" });
    expect(button).toBeVisible();
    expect(button).toHaveClass("button-custom");
    expect(button).toHaveClass("button-primary");
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
  });

  it("should render with label, correct class and attributes for danger modification", () => {
    render(
      <Button
        label="Danger"
        type="reset"
        variant="outlined"
        modification="danger"
      />
    );

    const button = screen.getByRole("button", { name: "Danger" });
    expect(button).toBeVisible();
    expect(button).toHaveClass("button-custom");
    expect(button).toHaveClass("button-danger");
    expect(button).toHaveAttribute("type", "reset");
  });

  it("should render with label, correct class and attributes for confirm modification", () => {
    render(
      <Button
        label="Confirm"
        variant="contained"
        modification="confirm"
        type="submit"
      />
    );

    const button = screen.getByRole("button", { name: "Confirm" });
    expect(button).toBeVisible();
    expect(button).toHaveClass("button-custom");
    expect(button).toHaveClass("button-confirm");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should be disabled when disabled prop is true", () => {
    render(
      <Button
        label="Disabled"
        variant="contained"
        modification="primary"
        disabled
      />
    );
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeVisible();
    expect(button).toBeDisabled();
  });

  it("should call onClick when user clicks the button", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button
        label="Click me"
        variant="contained"
        modification="primary"
        onClick={handleClick}
      />
    );
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeVisible();
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
