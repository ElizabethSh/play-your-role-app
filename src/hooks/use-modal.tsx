import { useRef } from "react";

export const useModal = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = (id: string) => {
    if (dialogRef?.current && !dialogRef.current.open) {
      dialogRef.current.dataset.characterId = id;
      dialogRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (dialogRef?.current?.open) {
      dialogRef.current.close();
    }
  };

  return {
    dialogRef,
    openModal,
    closeModal,
  };
};
