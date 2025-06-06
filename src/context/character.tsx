import { createContext, ReactNode, useContext, useState } from "react";

import { FormFields } from "../pages/characters/form";
import { Character } from "../types/character";

type CharacterProps = {
  children: ReactNode;
};

type CharacterContextType = {
  characters: Character[];
  addNewCharacter: (data: FormFields) => void;
  editCharacter: (id: string, data: FormFields) => void;
  deleteCharacter: (id: string) => void;
};

export const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: CharacterProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const buildCoreAbilities = (data: FormFields) => {
    return {
      strength: {
        score: data.strength,
        modifier: Math.floor((Number(data.strength) - 10) / 2),
      },
      dexterity: {
        score: data.dexterity,
        modifier: Math.floor((Number(data.dexterity) - 10) / 2),
      },
      constitution: {
        score: data.constitution,
        modifier: Math.floor((Number(data.constitution) - 10) / 2),
      },
      intelligence: {
        score: data.intelligence,
        modifier: Math.floor((Number(data.intelligence) - 10) / 2),
      },
      wisdom: {
        score: data.wisdom,
        modifier: Math.floor((Number(data.wisdom) - 10) / 2),
      },
      charisma: {
        score: data.charisma,
        modifier: Math.floor((Number(data.charisma) - 10) / 2),
      },
    };
  };

  const addNewCharacter = (data: FormFields) => {
    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name: data.name,
      notes: data.notes,
      coreAbilities: buildCoreAbilities(data),
    };
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
  };

  const editCharacter = (id: string, data: FormFields) => {
    const updatedCharacters = characters.map((character) => {
      if (character.id === id) {
        return {
          ...character,
          name: data.name,
          notes: data.notes,
          coreAbilities: buildCoreAbilities(data),
        };
      }
      return character;
    });
    setCharacters(updatedCharacters);
  };

  const deleteCharacter = (id: string) => {
    const updatedCharacters = characters.filter(
      (character) => character.id !== id
    );
    setCharacters(updatedCharacters);
  };

  const state = {
    characters,
    addNewCharacter,
    editCharacter,
    deleteCharacter,
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
