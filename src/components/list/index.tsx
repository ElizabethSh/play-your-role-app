import React from "react";

import { avatar } from "../../icons";
import { Character } from "../../types/character";

import "./list.css";

type CharactersListProps = {
  characters: Character[];
};

const CharactersList: React.FC<CharactersListProps> = ({ characters }) => {
  return (
    <ul className="characters-list">
      {characters.map((character) => (
        <li key={character.id} className="characters-item">
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
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
