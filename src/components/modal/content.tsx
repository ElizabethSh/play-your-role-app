import React from "react";

import Button from "../button";

import "./content.scss";

type ConfirmationModalContentProps = {
  onCancelClick: (id?: string) => void;
  onDeleteClick: () => void;
};

const ConfirmationModalContent: React.FC<ConfirmationModalContentProps> = ({
  onCancelClick,
  onDeleteClick,
}) => {
  return (
    <div className="modal-content">
      <h5 className="modal-title">Delete character?</h5>
      <p className="modal-description">You can&#39;t undo this action.</p>
      <div className="modal-actions">
        <Button
          label="cancel"
          variant="primary"
          onClick={() => onCancelClick()}
        />
        <Button label="Delete" variant="danger" onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default ConfirmationModalContent;
