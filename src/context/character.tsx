import { createContext, ReactNode, useContext, useState } from "react";

import { FormFields } from "../pages/characters/form";
import { Character } from "../types/character";

type CharacterProps = {
  children: ReactNode;
};

type CharacterContextType = {
  characters: Character[];
  addNewCharacter: (data: FormFields) => void;
};

export const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: CharacterProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const addNewCharacter = (data: FormFields) => {
    const new_character: Character = {
      id: crypto.randomUUID(),
      name: data.name,
      notes: data.notes,
      coreAbilities: {
        strength: {
          score: data.strength,
          modifier: Math.floor((data.strength - 10) / 2),
        },
        dexterity: {
          score: data.dexterity,
          modifier: Math.floor((data.dexterity - 10) / 2),
        },
        constitution: {
          score: data.constitution,
          modifier: Math.floor((data.constitution - 10) / 2),
        },
        intelligence: {
          score: data.intelligence,
          modifier: Math.floor((data.intelligence - 10) / 2),
        },
        wisdom: {
          score: data.wisdom,
          modifier: Math.floor((data.wisdom - 10) / 2),
        },
        charisma: {
          score: data.charisma,
          modifier: Math.floor((data.charisma - 10) / 2),
        },
      },
    };
    setCharacters((prevCharacters) => [...prevCharacters, new_character]);
  };

  const state = {
    characters,
    addNewCharacter,
  };

  return (
    <CharacterContext.Provider value={state}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "useCharacters was called without being inside a CharacterProvider"
    );
  }
  return context;
};
