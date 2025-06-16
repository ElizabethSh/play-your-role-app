import React from "react";

import "./picker.scss";

const AVATARS = [
  {
    src: "https://i.poweredtemplates.com/p/sp/117921/sp_p_slide1.jpg?tr=w-445",
    characterClass: "paladin",
  },
  {
    src: "https://i.poweredtemplates.com/p/sp/125412/sp_p_slide1.jpg?tr=w-445",
    characterClass: "rogue",
  },
  {
    src: "https://i.poweredtemplates.com/p/sp/130680/sp_p_slide1.jpg?tr=w-445",
    characterClass: "wizard",
  },
] as const;

type AvatarProps = {
  onSelect: (avatar: string) => void;
  selectedAvatar?: string;
};

const AvatarPicker: React.FC<AvatarProps> = ({ onSelect, selectedAvatar }) => {
  const onAvatarClick = (avatar: string) => {
    onSelect(avatar);
  };

  return (
    <div className="avatar-picker">
      <h2 className="label">Select an Avatar</h2>
      <p className="avatar-picker-description">
        Choose from a variety of avatars to represent yourself.
      </p>

      <div className="avatar-picker-buttons">
        {AVATARS.map(({ src, characterClass }) => (
          <button
            aria-label="Select avatar"
            className={`avatar-button button ${
              selectedAvatar === src ? "selected" : ""
            }`}
            key={characterClass}
            type="button"
            onClick={() => onAvatarClick(src)}
          >
            <img src={src} alt={characterClass} width="120" height="150" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarPicker;
