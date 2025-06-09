import { FormFields } from "./pages/characters/form";

export const buildCoreAbilities = (data: FormFields) => {
  return {
    strength: {
      score: Number(data.strength),
      modifier: Math.floor((Number(data.strength) - 10) / 2),
    },
    dexterity: {
      score: Number(data.dexterity),
      modifier: Math.floor((Number(data.dexterity) - 10) / 2),
    },
    constitution: {
      score: Number(data.constitution),
      modifier: Math.floor((Number(data.constitution) - 10) / 2),
    },
    intelligence: {
      score: Number(data.intelligence),
      modifier: Math.floor((Number(data.intelligence) - 10) / 2),
    },
    wisdom: {
      score: Number(data.wisdom),
      modifier: Math.floor((Number(data.wisdom) - 10) / 2),
    },
    charisma: {
      score: Number(data.charisma),
      modifier: Math.floor((Number(data.charisma) - 10) / 2),
    },
  };
};
