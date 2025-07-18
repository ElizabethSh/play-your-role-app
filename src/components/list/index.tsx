import React from "react";
import { Link } from "react-router-dom";

import Avatar from "@components/avatar";
import { useCharacters } from "@context/character";

import { AppRoute, CORE_ABILITIES } from "settings";

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
            <Avatar
              image={character.avatar}
              name={character.name}
              size="small"
            />
            <h3 className="character-name">{character.name}</h3>
            <ul className="character-abilities">
              {CORE_ABILITIES.map((ability) => {
                return (
                  <li key={ability} className="character-ability">
                    <span className="ability-score">
                      {character.coreAbilities[ability].score}
                    </span>
                    <span className="ability-name" aria-label={ability}>
                      {ability.slice(0, 3)}
                    </span>
                  </li>
                );
              })}
            </ul>
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
