import React from "react";
import { Link } from "react-router-dom";

import CharactersList from "../../../components/list";
import { useCharacters } from "../../../context/character";
import { AppRoute } from "../../../settings";

import "./characters.scss";

const CharactersPage: React.FC = () => {
  const { characters } = useCharacters();

  return (
    <section className="characters main-content">
      <h1 className="main-title">Your characters</h1>
      {characters.length ? (
        <CharactersList />
      ) : (
        <>
          <p className="characters-empty-list">
            You have not created any characters yet
          </p>
          <Link
            className="link-as-button button-secondary"
            to={AppRoute.NewCharacter}
          >
            Create new character
          </Link>
        </>
      )}
    </section>
  );
};

export default CharactersPage;
