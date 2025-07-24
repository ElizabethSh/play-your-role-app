import { MemoryRouter } from "react-router-dom";

import { CharacterContext, CharacterContextType } from "@context/character";
import { render, screen } from "@testing-library/react";

import CharactersPage from "./index";

const deleteCharacter = vi.fn();
const editCharacter = vi.fn();
const addNewCharacter = vi.fn();

const defaultProviderState: CharacterContextType = {
  characters: [],
  deleteCharacter,
  isLoading: false,
  isLoadingError: false,
  editCharacter,
  addNewCharacter,
};

describe("CharactersPage", () => {
  const renderCharactersPageWithProvider = (state?: CharacterContextType) => {
    return render(
      <CharacterContext.Provider value={state || defaultProviderState}>
        <MemoryRouter>
          <CharactersPage />
        </MemoryRouter>
      </CharacterContext.Provider>
    );
  };

  it("should render loading state correctly", () => {
    const providerState = {
      ...defaultProviderState,
      isLoading: true,
    };
    renderCharactersPageWithProvider(providerState);

    expect(
      screen.getByRole("heading", { name: "Your characters" })
    ).toBeVisible();
    expect(screen.getByTestId("characters-skeleton")).toBeInTheDocument();
  });

  it("should render the error state when loading error occurs", () => {
    const providerState = {
      ...defaultProviderState,
      isLoadingError: true,
    };
    renderCharactersPageWithProvider(providerState);
    expect(screen.getByText(/error retrieving data/i)).toBeVisible();
    expect(screen.getByText(/please refresh the page/i)).toBeVisible();
  });

  it("renders the empty state when no characters exist", () => {
    renderCharactersPageWithProvider();
    expect(
      screen.getByText("You have not created any characters yet")
    ).toBeVisible();

    const createLink = screen.getByRole("link", {
      name: /create new character/i,
    });
    expect(createLink).toBeVisible();
    expect(createLink).toHaveAttribute("href", "/new-character");
  });

  it("should render the characters list when characters exist", () => {
    const providerState = {
      ...defaultProviderState,
      characters: [
        {
          id: "1",
          name: "Test Character 1",
          notes: "",
          avatar: "",
          coreAbilities: {
            strength: {
              score: 10,
              modifier: 0,
            },
            dexterity: {
              score: 12,
              modifier: 1,
            },
            intelligence: {
              score: 14,
              modifier: 2,
            },
            wisdom: {
              score: 16,
              modifier: 3,
            },
            charisma: {
              score: 18,
              modifier: 4,
            },
            constitution: {
              score: 20,
              modifier: 5,
            },
          },
        },
        {
          id: "2",
          name: "Test Character 2",
          notes: "",
          avatar: "",
          coreAbilities: {
            strength: {
              score: 10,
              modifier: 0,
            },
            dexterity: {
              score: 12,
              modifier: 1,
            },
            intelligence: {
              score: 14,
              modifier: 2,
            },
            wisdom: {
              score: 16,
              modifier: 3,
            },
            charisma: {
              score: 18,
              modifier: 4,
            },
            constitution: {
              score: 20,
              modifier: 5,
            },
          },
        },
      ],
    };

    const { container } = renderCharactersPageWithProvider(providerState);
    expect(screen.getByText("Your characters")).toBeVisible();

    const list = container.querySelector(".characters-list");
    expect(list).toBeInTheDocument();
    const items = container.querySelectorAll(".characters-item");
    expect(items.length).toBe(2);
  });
});
