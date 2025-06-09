import React from "react";

type MenuModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
};

const Modal: React.FC<MenuModalProps> = ({ children, dialogRef }) => {
  return <dialog ref={dialogRef}>{children}</dialog>;
};

export default Modal;
