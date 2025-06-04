import React from "react";
import { Link } from "react-router";

import { avatar } from "../../icons";
import { AppRoute } from "../../settings";
import { Character } from "../../types/character";

import "./list.scss";

type CharactersListProps = {
  characters: Character[];
};

const CharactersList: React.FC<CharactersListProps> = ({ characters }) => {
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
            <select name="options">
              <option value="view">View</option>
              <option value="edit" selected>
                Edit
              </option>
              <option value="delete">Delete</option>
            </select>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
