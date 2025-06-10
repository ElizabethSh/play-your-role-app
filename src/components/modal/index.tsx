import React from "react";

import "./modal.scss";

type ModalProps = {
  ariaLabel?: string;
  children: React.ReactNode;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
};

const Modal: React.FC<ModalProps> = ({ children, dialogRef, ariaLabel }) => {
  return (
    <dialog aria-label={ariaLabel} className="modal" ref={dialogRef}>
      {children}
    </dialog>
  );
};

export default Modal;
