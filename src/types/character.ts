type Ability = {
  readonly score: number;
  readonly modifier: number;
};

export type Character = {
  avatar?: string;
  coreAbilities: Record<string, Ability>;
  id: string;
  name: string;
  notes?: string;
};
