import { MemoryRouter } from "react-router-dom";

import { render, screen } from "@testing-library/react";

import HomePage from "./index";

describe("HomePage", () => {
  it("should render correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: "Play your role!" })
    ).toBeVisible();
    expect(screen.getByText("Start new adventure!")).toBeVisible();

    const createLink = screen.getByRole("link", {
      name: /create new character/i,
    });
    expect(createLink).toBeVisible();
    expect(createLink).toHaveAttribute("href", "/new-character");

    const viewLink = screen.getByRole("link", { name: /view characters/i });
    expect(viewLink).toBeVisible();
    expect(viewLink).toHaveAttribute("href", "/characters");
  });
});
