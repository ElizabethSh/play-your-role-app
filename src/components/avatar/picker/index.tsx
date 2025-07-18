import React from "react";

import Button from "@mui/material/Button";

import "./picker.scss";

type AvatarProps = {
  onSelect: (avatar: string) => void;
  selectedAvatar?: string;
};

const AvatarPicker: React.FC<AvatarProps> = ({ onSelect, selectedAvatar }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        onSelect(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const onReset = () => {
    onSelect("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="avatar-picker">
      <h2 className="label">Select an Avatar</h2>

      <div className="avatar-picker-upload">
        <label htmlFor="avatar-upload" className="avatar-upload-label">
          Upload your own avatar:
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onImageChange}
        />
        {selectedAvatar && (
          <div className="avatar-preview-container">
            <div className="avatar-preview">
              <img
                src={selectedAvatar}
                alt="Selected avatar preview"
                width="120"
                height="150"
              />
            </div>
            <Button
              className="avatar-reset-button"
              variant="outlined"
              color="secondary"
              onClick={onReset}
              aria-label="Reset avatar selection"
            >
              Clear
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarPicker;
