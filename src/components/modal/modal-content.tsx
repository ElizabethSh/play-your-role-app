import React from "react";

import Button from "../button";

type ConfirmationModalContentProps = {
  onCancelClick: (id?: string) => void;
  onDeleteClick: () => void;
};

const ConfirmationModalContent: React.FC<ConfirmationModalContentProps> = ({
  onCancelClick,
  onDeleteClick,
}) => {
  return (
    <>
      <div> Hello</div>
      <Button
        label="cancel"
        variant="primary"
        onClick={() => onCancelClick()}
      />
      <Button label="Delete" variant="danger" onClick={onDeleteClick} />
    </>
  );
};

export default ConfirmationModalContent;
