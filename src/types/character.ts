type Ability = {
  name: string;
  readonly score: number;
  readonly modifier: number;
};

export type Character = {
  avatar?: string;
  coreAbilities: Ability[];
  id: string;
  name: string;
  notes?: string;
};
