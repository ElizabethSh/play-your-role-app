import { FormFields } from "@pages/characters/form";
import { CORE_ABILITIES } from "@settings";

import { Ability } from "types/character";

export type CoreAbilities = Record<string, Ability>;

const getAbility = (ability: number | ""): Ability => {
  return {
    score: Number(ability),
    modifier: Math.floor((Number(ability) - 10) / 2),
  };
};

export const buildCoreAbilities = (data: FormFields): CoreAbilities => {
  return CORE_ABILITIES.reduce((acc, ability) => {
    acc[ability] = getAbility(data[ability]);
    return acc;
  }, {} as CoreAbilities);
};
