export type Ability = {
  score: number | "";
  modifier: number | "";
};

export type Character = {
  avatar?: string;
  coreAbilities: Record<string, Ability>;
  id: string;
  name: string;
  notes?: string;
};
