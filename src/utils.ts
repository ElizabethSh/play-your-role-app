import { FormFields } from "./pages/characters/form";

export const buildCoreAbilities = (data: FormFields) => {
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
