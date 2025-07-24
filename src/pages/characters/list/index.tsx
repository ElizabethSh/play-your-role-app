import React from "react";
import { Link } from "react-router-dom";

import CharactersList from "@components/list";
import Modal from "@components/modal";
import ConfirmationModalContent from "@components/modal/content";
import { useCharacters } from "@context/character";
import { useModal } from "@hooks/use-modal";

import { AppRoute } from "settings";

import CharactersSkeleton from "./CharactersSkeleton";

import "./characters.scss";

const CharactersPage: React.FC = () => {
  const { characters, deleteCharacter, isLoadingError, isLoading } =
    useCharacters();
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

  const getPageContent = ({
    content,
    title,
  }: {
    content: React.ReactNode;
    title?: string;
  }) => {
    return (
      <section className="characters main-content">
        {title && <h1 className="main-title">{title}</h1>}
        {content}
      </section>
    );
  };

  if (isLoading) {
    return getPageContent({
      content: <CharactersSkeleton />,
      title: "Your characters",
    });
  }

  if (isLoadingError) {
    return getPageContent({
      content: (
        <div className="characters-error">
          <p>Error retrieving data from IndexedDB</p>
          <p>Please refresh the page</p>
        </div>
      ),
    });
  }

  const getCharactersList = () => {
    if (characters.length > 0) {
      return <CharactersList openDialog={openModal} />;
    }

    return (
      <div className="characters-empty">
        <p className="characters-empty-description">
          You have not created any characters yet
        </p>
        <Link
          className="link-as-button link-as-button-secondary"
          to={AppRoute.NewCharacter}
        >
          Create new character
        </Link>
      </div>
    );
  };

  return (
    <>
      <Modal dialogRef={dialogRef} ariaLabel="Delete character confirmation">
        <ConfirmationModalContent
          onCancelClick={closeModal}
          onDeleteClick={handleDelete}
        />
      </Modal>
      {getPageContent({
        content: getCharactersList(),
        title: "Your characters",
      })}
    </>
  );
};

export default CharactersPage;
