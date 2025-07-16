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

export const SUCCESS_NOTIFICATIONS = {
  add: "Character added successfully!",
  edit: "Character edited successfully!",
  delete: "Character deleted successfully!",
} as const;

export const ERROR_NOTIFICATIONS = {
  add: "Error adding character.",
  edit: "Error editing character.",
  delete: "Error deleting character.",
} as const;
