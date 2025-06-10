import React from "react";

import "./modal.scss";

type ModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, dialogRef }) => {
  return (
    <dialog className="modal" ref={dialogRef}>
      {children}
    </dialog>
  );
};

export default Modal;
