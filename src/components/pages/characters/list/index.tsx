import React from "react";
import { Link } from "react-router";

import { characters } from "../../../../mocks";
import { AppRoute } from "../../../../settings";
import CharactersList from "../../../list";

import "./characters.css";

const CharactersPage: React.FC = () => (
  <section className="characters">
    <h1 className="main-title">Your characters</h1>
    {characters.length ? (
      <CharactersList characters={characters} />
    ) : (
      <>
        <p className="characters-empty-list">
          You have not created any characters yet
        </p>
        <Link className="button button-secondary" to={AppRoute.NewCharacter}>
          Create new character
        </Link>
      </>
    )}
  </section>
);

export default CharactersPage;
