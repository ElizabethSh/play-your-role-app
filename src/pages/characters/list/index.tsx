import React, { useRef } from "react";
import { Link } from "react-router-dom";

import CharactersList from "../../../components/list";
import Modal from "../../../components/modal";
import ConfirmationModalContent from "../../../components/modal/content";
import { useCharacters } from "../../../context/character";
import { AppRoute } from "../../../settings";

import "./characters.scss";

const CharactersPage: React.FC = () => {
  const { characters, deleteCharacter } = useCharacters();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDelete = () => {
    if (!dialogRef.current) return;
    // Get the character ID from the dialog's dataset
    const characterId = dialogRef.current.dataset.characterId;

    if (characterId) {
      deleteCharacter(characterId);
      closeDialog();
    }
  };

  const openModal = (id: string) => {
    if (dialogRef?.current && !dialogRef.current.open) {
      dialogRef.current.dataset.characterId = id;
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => {
    if (dialogRef?.current?.open) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <Modal dialogRef={dialogRef}>
        <ConfirmationModalContent
          onCancelClick={closeDialog}
          onDeleteClick={handleDelete}
        />
      </Modal>
      <section className="characters main-content">
        <h1 className="main-title">Your characters</h1>
        {characters.length ? (
          <CharactersList openDialog={openModal} />
        ) : (
          <>
            <p className="characters-empty-list">
              You have not created any characters yet
            </p>
            <Link
              className="link-as-button link-as-button-secondary"
              to={AppRoute.NewCharacter}
            >
              Create new character
            </Link>
          </>
        )}
      </section>
    </>
  );
};

export default CharactersPage;
