import { MemoryRouter, Route, Routes } from "react-router-dom";

import { CharacterContext, CharacterContextType } from "@context/character";
import { AppRoute, CORE_ABILITIES } from "@settings";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import CharacterDetailsPage from "./index";

const mockCharacter = {
  id: "1",
  name: "Test Character",
  notes: "Some notes",
  avatar: "avatar.png",
  coreAbilities: CORE_ABILITIES.reduce((acc, ability) => {
    acc[ability] = { score: 10, modifier: 0 };
    return acc;
  }, {} as Record<string, { score: number; modifier: number }>),
};

const defaultProviderState: CharacterContextType = {
  characters: [mockCharacter],
  addNewCharacter: vi.fn(),
  editCharacter: vi.fn(),
  deleteCharacter: vi.fn(),
  isLoading: false,
  isLoadingError: false,
};

function renderWithProvider(id = "1", providerState = defaultProviderState) {
  return render(
    <CharacterContext.Provider value={providerState}>
      <MemoryRouter initialEntries={[`/characters/${id}`]}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterDetailsPage />} />
          <Route path={AppRoute.NotFound} element={<div>Not Found</div>} />
        </Routes>
      </MemoryRouter>
    </CharacterContext.Provider>
  );
}

describe("CharacterDetailsPage", () => {
  it("should render character details when character exists", () => {
    renderWithProvider();

    expect(
      screen.getByRole("heading", { name: "Test Character" })
    ).toBeVisible();

    expect(screen.getByText("Core abilities")).toBeVisible();
    expect(screen.getByText("Notes")).toBeVisible();
    expect(screen.getByText(mockCharacter.notes)).toBeVisible();

    CORE_ABILITIES.forEach((ability) => {
      expect(screen.getByText(ability)).toBeVisible();
      expect(screen.getAllByText("10")[0]).toBeVisible();
      expect(screen.getAllByText("0")[0]).toBeVisible();
    });
  });

  it("should redirect to NotFound page when character does not exist", () => {
    const emptyProviderState = { ...defaultProviderState, characters: [] };

    renderWithProvider("unknown-id", emptyProviderState);
    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });
});
