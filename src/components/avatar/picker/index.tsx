import React from "react";

import Button from "@mui/material/Button";

import "./picker.scss";

type AvatarProps = {
  onSelect: (avatar: string) => void;
  selectedAvatar?: string;
  setError: (error: string) => void;
  clearError?: () => void;
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const AvatarPicker: React.FC<AvatarProps> = ({
  onSelect,
  selectedAvatar,
  setError,
  clearError,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (clearError) clearError();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, GIF, or WEBP).");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Image is too large. Maximum size is 2MB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
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
    if (clearError) clearError();
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
          className="avatar-upload-input"
          id="avatar-upload"
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onImageChange}
        />
        <Button
          variant="contained"
          className="avatar-upload-button"
          component="span"
          onClick={() => inputRef.current?.click()}
        >
          Choose Image
        </Button>

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
