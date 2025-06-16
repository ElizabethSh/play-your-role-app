import React from "react";

import { avatar as avatarIcon } from "../../icons";

type AvatarProps = {
  image?: string;
  characterName?: string;
};

const Avatar: React.FC<AvatarProps> = ({ image, characterName }) => {
  console.log("image", image);

  console.log("Avatar component rendered with image:", image);

  let avatar;
  if (!image) {
    avatar = avatarIcon;
  } else {
    avatar = (
      <img
        className="character-avatar"
        src={image}
        alt={`${characterName} avatar`}
      />
    );
  }
  return <div className="avatar-container">{avatar}</div>;
};

export default Avatar;
