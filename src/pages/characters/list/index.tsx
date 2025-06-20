import React from "react";
import { Link } from "react-router-dom";
import CharactersList from "@components/list";
import Modal from "@components/modal";
import ConfirmationModalContent from "@components/modal/content";
import { useCharacters } from "@context/character";
import { useModal } from "@hooks/use-modal";
import { AppRoute } from "settings";

import "./characters.scss";

const CharactersPage: React.FC = () => {
  const { characters, deleteCharacter, isLoadingError } = useCharacters();
  const { dialogRef, openModal, closeModal } = useModal();

  const handleDelete = () => {
    if (!dialogRef.current) return;
    // Get the character ID from the dialog's dataset
    const characterId = dialogRef.current.dataset.characterId;

    if (characterId) {
      deleteCharacter(characterId);
      closeModal();
    }
  };

  const getCharactersList = () => {
    if (characters.length > 0) {
      return <CharactersList openDialog={openModal} />;
    }

    return (
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
    );
  };

  let content;
  if (isLoadingError) {
    content = (
      <div className="characters-error">
        <p>Error retrieving data from Local Storage</p>
        <p>Please refresh the page</p>
      </div>
    );
  } else {
    content = (
      <>
        <h1 className="main-title">Your characters</h1>
        {getCharactersList()}
      </>
    );
  }

  return (
    <>
      <Modal dialogRef={dialogRef} ariaLabel="Delete character confirmation">
        <ConfirmationModalContent
          onCancelClick={closeModal}
          onDeleteClick={handleDelete}
        />
      </Modal>
      <section className="characters main-content">{content}</section>
    </>
  );
};

export default CharactersPage;
