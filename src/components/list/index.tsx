import React from "react";
import { Link } from "react-router";

import { useCharacters } from "../../context/character";
import { avatar } from "../../icons";
import { AppRoute } from "../../settings";

import "./list.scss";

const CharactersList: React.FC = () => {
  const { deleteCharacter, characters } = useCharacters();

  const handleDelete = (id: string) => {
    deleteCharacter(id);
  };

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
              className="link-as-button"
              to={`${AppRoute.Characters}/${character.id}`}
            >
              View
            </Link>
            <button type="button">Edit</button>
            <button type="button" onClick={() => handleDelete(character.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
