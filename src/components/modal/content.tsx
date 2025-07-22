import React from "react";

import Button from "@components/button/button";

import "./content.scss";

type ConfirmationModalContentProps = {
  onCancelClick: () => void;
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
          label="Cancel"
          onClick={onCancelClick}
          variant="outlined"
          modification="primary"
        />
        <Button
          label="Delete"
          type="button"
          variant="outlined"
          modification="danger"
          onClick={onDeleteClick}
        />
      </div>
    </div>
  );
};

export default ConfirmationModalContent;
