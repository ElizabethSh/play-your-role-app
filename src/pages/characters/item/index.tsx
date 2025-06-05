import React, { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { useCharacters } from "../../../context/character";
import { arrow_left, avatar } from "../../../icons";
import { AppRoute, CORE_ABILITIES } from "../../../settings";

import "./item.scss";

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { characters } = useCharacters();

  const character = useMemo(() => {
    return characters.find((character) => character.id === id);
  }, [id, characters]);

  useEffect(() => {
    if (!character) {
      navigate(AppRoute.NotFound);
    }
  }, []);

  return (
    <section className="main-content character">
      <div className="character-header">
        <Link className="character-back-link" to={AppRoute.Characters}>
          {arrow_left}
          Back to characters
        </Link>
        {avatar}
        <h1 className="main-title character-name">{character?.name}</h1>
      </div>
      <h3 className="character-title">Core abilities</h3>
      <ul className="character-abilities">
        {CORE_ABILITIES.map((ability: string) => (
          <li className="ability" key={ability}>
            <h6 className="ability-name">{ability}</h6>
            <p className="ability-value">
              {character?.coreAbilities[ability].score}
            </p>
            <p className="ability-modifier">
              {character?.coreAbilities[ability].modifier}
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
