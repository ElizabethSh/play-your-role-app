import { render, screen } from "@testing-library/react";

import Button from ".";

describe("Button", () => {
  it("renders with primary variant", () => {
    render(<Button label="Primary Button" variant="primary" />);

    const button = screen.getByRole("button", { name: "Primary Button" });
    expect(button).toBeVisible();
    expect(button).toHaveClass("button", "button-primary");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders with confirm variant", () => {
    render(<Button label="Confirm Button" variant="confirm" type="submit" />);

    const button = screen.getByRole("button", { name: "Confirm Button" });
    expect(button).toBeVisible();
    expect(button).toHaveClass("button", "button-confirm");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders with danger variant", () => {
    render(<Button label="Danger Button" variant="danger" />);

    const button = screen.getByRole("button", { name: "Danger Button" });
    expect(button).toBeVisible();
    expect(button).toHaveClass("button", "button-danger");
    expect(button).toHaveAttribute("type", "button");
  });
});
