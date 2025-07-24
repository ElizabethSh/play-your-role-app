import { MemoryRouter, Route, Routes } from "react-router-dom";

import { CharacterContext, CharacterContextType } from "@context/character";
import { AppRoute, CORE_ABILITIES } from "@settings";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CoreAbilities } from "@utils";

import CharacterForm from "./index";

const addNewCharacter = vi.fn();
const editCharacter = vi.fn();

const defaultProviderState: CharacterContextType = {
  characters: [],
  addNewCharacter,
  editCharacter,
  deleteCharacter: vi.fn(),
  isLoading: false,
  isLoadingError: false,
};

function renderWithProvider(
  providerState = defaultProviderState,
  route = "/new-character"
) {
  return render(
    <CharacterContext.Provider value={providerState}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={AppRoute.NewCharacter} element={<CharacterForm />} />
          <Route path={AppRoute.EditCharacter} element={<CharacterForm />} />
        </Routes>
      </MemoryRouter>
    </CharacterContext.Provider>
  );
}

describe("CharacterForm", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    addNewCharacter.mockClear();
    editCharacter.mockClear();
  });

  it("should render add form with all fields", () => {
    renderWithProvider();
    expect(
      screen.getByRole("heading", { name: /add new character/i })
    ).toBeVisible();
    expect(screen.getByLabelText(/name/i)).toBeVisible();
    CORE_ABILITIES.forEach((ability) => {
      expect(screen.getByLabelText(ability)).toBeVisible();
    });
    expect(screen.getByLabelText(/tell us about character/i)).toBeVisible();
    expect(screen.getByRole("button", { name: /reset form/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /save/i })).toBeVisible();
  });

  it("should show validation errors for required fields", async () => {
    renderWithProvider();

    user.click(screen.getByRole("button", { name: /save/i }));
    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeVisible();
      expect(screen.getByText(/all these fields are required/i)).toBeVisible();
    });
  });

  it("should submit form with valid data", async () => {
    renderWithProvider();

    await user.type(screen.getByLabelText(/name/i), "Test Name");

    CORE_ABILITIES.forEach(async (ability) => {
      await user.type(screen.getByLabelText(ability), "10");
    });
    await user.click(screen.getByRole("button", { name: /save/i }));

    waitFor(() => {
      expect(addNewCharacter).toHaveBeenCalled();
    });
  });

  it("should render edit form and submits edit", async () => {
    const character = {
      id: "1",
      name: "Test Name",
      notes: "Test notes",
      avatar: "avatar.png",
      coreAbilities: CORE_ABILITIES.reduce((acc, ability) => {
        acc[ability] = { score: 10, modifier: 0 };
        return acc;
      }, {} as CoreAbilities),
    };
    const providerState = {
      ...defaultProviderState,
      characters: [character],
    };

    renderWithProvider(providerState, "/characters/1/edit");

    expect(
      screen.getByRole("heading", { name: /edit character/i })
    ).toBeVisible();
    await user.type(screen.getByLabelText(/name/i), "Edited Name");
    await user.click(screen.getByRole("button", { name: /save/i }));

    waitFor(() => {
      expect(editCharacter).toHaveBeenCalledWith("1", {
        id: "1",
        name: "Edited Name",
        notes: "Edit notes",
        avatar: "avatar.png",
      });
    });
  });

  it("should redirect to NotFound page if editing non-existent character", () => {
    renderWithProvider(defaultProviderState, "/characters/unknown/edit");

    expect(
      screen.getByRole("heading", { name: /404 - page not found/i })
    ).toBeVisible();
  });
});
