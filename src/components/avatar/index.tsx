import React from "react";

import { avatar as avatarIcon } from "../../icons";

import "./avatar.scss";

type AvatarProps = {
  image?: string;
  characterName?: string;
};

const Avatar: React.FC<AvatarProps> = ({ image, characterName }) => {
  let avatar;
  if (!image) {
    avatar = avatarIcon;
  } else {
    avatar = (
      <img
        alt={`${characterName} avatar`}
        className="character-avatar"
        src={image}
        width="200"
      />
    );
  }
  return <div className="avatar-container">{avatar}</div>;
};

export default Avatar;
