import { CORE_ABILITIES } from "@settings";

import { buildCoreAbilities } from "./utils";

describe("buildCoreAbilities", () => {
  it("returns correct ability scores and modifiers", () => {
    const mockData = {
      name: "Test",
      notes: "",
      image: undefined,
      strength: 15,
      dexterity: 12,
      constitution: 10,
      intelligence: 8,
      wisdom: 14,
      charisma: 13,
    };

    const result = buildCoreAbilities(mockData);

    CORE_ABILITIES.forEach((ability) => {
      expect(result[ability]).toBeDefined();
      expect(result[ability].score).toBe(Number(mockData[ability]));
      expect(result[ability].modifier).toBe(
        Math.floor((Number(mockData[ability]) - 10) / 2)
      );
    });
  });
});
