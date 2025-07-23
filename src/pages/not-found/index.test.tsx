import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

import NotFoundPage from "./index";

describe("NotFoundPage", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: "404 - Page Not Found" })
    ).toBeVisible();
    expect(
      screen.getByText("Sorry, the page you are looking for does not exist.")
    ).toBeVisible();
    const link = screen.getByRole("link", {
      name: /go back to the main page/i,
    });
    expect(link).toBeVisible();
    expect(link).toHaveAttribute("href", "/");
  });
});
