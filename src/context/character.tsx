import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { useLocalStorage } from "../hooks/use-local-storage";
import { FormFields } from "../pages/characters/form";
import { Character } from "../types/character";
import { buildCoreAbilities } from "../utils";

type CharacterProps = {
  children: ReactNode;
};

type CharacterContextType = {
  characters: Character[];
  addNewCharacter: (data: FormFields) => void;
  editCharacter: (id: string, data: FormFields) => void;
  deleteCharacter: (id: string) => void;
};

const LOCAL_STORAGE_KEY = "characters" as const;

export const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: CharacterProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const { getValue, setValue } = useLocalStorage(LOCAL_STORAGE_KEY);

  useEffect(() => {
    const storedCharacters = getValue();
    if (storedCharacters) {
      setCharacters(storedCharacters);
    }
  }, []);

  const addNewCharacter = (data: FormFields) => {
    const newCharacter: Character = {
      id: crypto.randomUUID(),
      name: data.name,
      notes: data.notes,
      coreAbilities: buildCoreAbilities(data),
    };
    setCharacters((prevCharacters) => {
      const updatedCharacters = [...prevCharacters, newCharacter];
      setValue(updatedCharacters, "add");
      return updatedCharacters;
    });
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
    setValue(updatedCharacters, "edit");
  };

  const deleteCharacter = (id: string) => {
    const updatedCharacters = characters.filter(
      (character) => character.id !== id
    );
    setCharacters(updatedCharacters);
    setValue(updatedCharacters, "delete");
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
