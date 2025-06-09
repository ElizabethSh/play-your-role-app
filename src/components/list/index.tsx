import React from "react";
import { Link } from "react-router-dom";

import { useCharacters } from "../../context/character";
import { avatar } from "../../icons";
import { AppRoute } from "../../settings";

import "./list.scss";

type CharactersListProps = {
  openDialog: (id: string) => void;
};

const CharactersList: React.FC<CharactersListProps> = ({ openDialog }) => {
  const { characters } = useCharacters();

  return (
    <ul className="characters-list">
      {characters.map((character) => (
        <li key={character.id} className="characters-item">
          <Link
            to={`${AppRoute.Characters}/${character.id}`}
            className="character-link"
          >
            {avatar}
            <h3 className="character-name">{character.name}</h3>
            <p>Abilities</p>
          </Link>
          <div className="options">
            <Link
              className="link-as-button option"
              to={`${AppRoute.Characters}/${character.id}`}
            >
              View
            </Link>
            <Link
              className="link-as-button option"
              to={`${AppRoute.Characters}/${character.id}/edit`}
            >
              Edit
            </Link>
            <button
              className="option danger"
              type="button"
              onClick={() => openDialog(character.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
