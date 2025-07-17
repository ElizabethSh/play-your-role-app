import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useIndexedDB } from "@hooks/use-indexed-db";
import { FormFields } from "@pages/characters/form";
import { v4 as uuidv4 } from "uuid";

import { Character } from "types/character";
import { buildCoreAbilities } from "utils";

type CharacterProps = {
  children: ReactNode;
};

type CharacterContextType = {
  addNewCharacter: (data: FormFields, avatar?: string) => Promise<void>;
  characters: Character[];
  deleteCharacter: (id: string) => Promise<void>;
  editCharacter: (
    id: string,
    data: FormFields,
    avatar?: string
  ) => Promise<void>;
  isLoadingError: boolean;
  isLoading: boolean;
};

const INDEXEDDB_KEY = "characters" as const;

export const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: CharacterProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { getValue, setValue } = useIndexedDB(INDEXEDDB_KEY);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const storedCharacters = await getValue();
      if (storedCharacters) {
        setCharacters(storedCharacters);
      } else {
        setIsLoadingError(true);
      }
      setIsLoading(false);
    })();
  }, [getValue]);

  const addNewCharacter = useCallback(
    async (data: FormFields, avatar?: string) => {
      const newCharacter: Character = {
        avatar: avatar || "",
        coreAbilities: buildCoreAbilities(data),
        id: uuidv4(),
        name: data.name,
        notes: data.notes,
      };

      const updatedCharacters = [...characters, newCharacter];
      setCharacters(updatedCharacters);
      await setValue(updatedCharacters, "add");
    },
    [characters, setValue]
  );

  const editCharacter = useCallback(
    async (id: string, data: FormFields, avatar?: string) => {
      const updatedCharacters = characters.map((character) => {
        if (character.id === id) {
          return {
            ...character,
            name: data.name,
            notes: data.notes,
            avatar: avatar || data.image,
            coreAbilities: buildCoreAbilities(data),
          };
        }
        return character;
      });
      setCharacters(updatedCharacters);
      await setValue(updatedCharacters, "edit");
    },
    [characters, setValue]
  );

  const deleteCharacter = useCallback(
    async (id: string) => {
      const updatedCharacters = characters.filter(
        (character) => character.id !== id
      );
      setCharacters(updatedCharacters);
      await setValue(updatedCharacters, "delete");
    },
    [characters, setValue]
  );

  const state = useMemo(
    () => ({
      addNewCharacter,
      characters,
      deleteCharacter,
      editCharacter,
      isLoadingError,
      isLoading,
    }),
    [
      addNewCharacter,
      characters,
      deleteCharacter,
      editCharacter,
      isLoadingError,
      isLoading,
    ]
  );

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
