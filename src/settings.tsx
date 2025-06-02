export enum AppRoute {
  Root = "/",
  Characters = "/characters",
  Character = "/characters/:id",
  NewCharacter = "/characters/new",
  NotFound = "*",
}

export const CORE_ABILITIES = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;
