import { Character } from "./types/character";

export const characters: Character[] = [
  {
    avatar: "https://example.com/avatar1.png",
    coreAbilities: [
      { name: "Strength", score: 10, modifier: 0 },
      { name: "Dexterity", score: 12, modifier: 1 },
      { name: "Constitution", score: 14, modifier: 2 },
      { name: "Intelligence", score: 8, modifier: -1 },
      { name: "Wisdom", score: 16, modifier: 3 },
      { name: "Charisma", score: 18, modifier: 4 },
    ],
    id: "1",
    name: "John Doe",
    notes: "Some notes about John",
  },
  {
    avatar: "https://example.com/avatar2.png",
    coreAbilities: [
      { name: "Strength", score: 15, modifier: 2 },
      { name: "Dexterity", score: 10, modifier: 0 },
      { name: "Constitution", score: 12, modifier: 1 },
      { name: "Intelligence", score: 14, modifier: 2 },
      { name: "Wisdom", score: 8, modifier: -1 },
      { name: "Charisma", score: 16, modifier: 3 },
    ],
    id: "2",
    name: "Jane Smith",
    notes: "Some notes about Jane",
  },
];
