import React from "react";

import { avatar } from "../../../../icons";
import { characters } from "../../../../mocks";
import { CORE_ABILITIES } from "../../../../settings";

import "./item.css";

const CharacterDetailsPage: React.FC = () => {
  const character = characters[0];

  return (
    <section className="main-content character">
      <div className="character-header">
        {avatar}
        <h1 className="main-title">{character?.name}</h1>
      </div>
      <h3 className="character-title">Core abilities</h3>
      <ul className="character-abilities">
        {CORE_ABILITIES.map((ability: string) => (
          <li className="ability" key={ability}>
            <h6 className="ability-name">{ability}</h6>
            <p className="ability-value">
              {character.coreAbilities[ability].score}
            </p>
            <p className="ability-modifier">
              {character.coreAbilities[ability].modifier}
            </p>
          </li>
        ))}
      </ul>
      <h3 className="character-title">Notes</h3>
      <p className="character-notes">{character?.notes}</p>
    </section>
  );
};

export default CharacterDetailsPage;
