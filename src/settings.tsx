export enum AppRoute {
  Root = "/",
  Characters = "/characters",
  Character = "/characters/:id",
  EditCharacter = "/characters/:id/edit",
  NewCharacter = "/new-character",
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
