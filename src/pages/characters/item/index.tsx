import React, { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import Avatar from "@components/avatar";
import { useCharacters } from "@context/character";
import { arrowLeft as arrowLeftIcon } from "@icons";
import EditIcon from "@mui/icons-material/Edit";
import { AppRoute, CORE_ABILITIES } from "@settings";

import "./item.scss";

const CharacterDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { characters } = useCharacters();

  const character = useMemo(() => {
    return characters.find((character) => character.id === id);
  }, [id, characters]);

  if (!character) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <section className="main-content character">
      <div className="character-header">
        <Link className="character-back-link" to={AppRoute.Characters}>
          {arrowLeftIcon}
          <span className="link-title">Back to characters</span>
        </Link>
        <Link
          className="character-edit-link"
          to={AppRoute.Characters + `/${id}/edit`}
        >
          <EditIcon />
          <span className="link-title">Edit character</span>
        </Link>
        <Avatar size="large" image={character.avatar} name={character.name} />
        <h1 className="main-title character-name">{character.name}</h1>
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
