import { FormFields } from "@pages/characters/form";

import { Ability } from "types/character";

const getAbility = (ability: number | ""): Ability => {
  return {
    score: Number(ability),
    modifier: Math.floor((Number(ability) - 10) / 2),
  };
};

export const buildCoreAbilities = (data: FormFields) => {
  return {
    strength: getAbility(data.strength),
    dexterity: getAbility(data.dexterity),
    constitution: getAbility(data.constitution),
    intelligence: getAbility(data.intelligence),
    wisdom: getAbility(data.wisdom),
    charisma: getAbility(data.charisma),
  };
};
