import React from "react";
import { Link } from "react-router-dom";

import { useCharacters } from "@context/character";

import { avatar } from "icons";
import { AppRoute } from "settings";

import CharacterOptionsMenu from "./CharacterOptionsMenu";

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
          <CharacterOptionsMenu
            characterId={character.id}
            openDialog={openDialog}
          />
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
