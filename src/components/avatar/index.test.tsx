import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import Avatar from "./index";

describe("Avatar component", () => {
  it("renders the image when image prop is provided", () => {
    render(<Avatar image="test-image.png" name="Alice" size="large" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test-image.png");
    expect(img).toHaveAttribute("alt", "Alice");
  });

  it("renders the first letter of the name when image is not provided", () => {
    const { container } = render(<Avatar name="Bob" size="small" />);

    const imageWrapper = container.querySelector(".avatar");
    expect(imageWrapper).toBeVisible();
    expect(imageWrapper).toHaveTextContent("B");
    expect(imageWrapper).toHaveClass("avatar-small");
    expect(imageWrapper).not.toHaveAttribute("src");
  });

  it("applies the correct size class", () => {
    const { rerender, container } = render(
      <Avatar name="Cathy" size="small" />
    );
    const imageWrapper = container.querySelector(".avatar");
    expect(imageWrapper).toHaveClass("avatar-small");
    rerender(<Avatar name="Cathy" size="large" />);
    expect(imageWrapper).toHaveClass("avatar-large");
  });
});
