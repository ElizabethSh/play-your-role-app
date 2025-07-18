import React from "react";

import MUIAvatar from "@mui/material/Avatar";

import "./avatar.scss";

type AvatarProps = {
  image?: string;
  name: string;
  size: "small" | "large";
};

const Avatar: React.FC<AvatarProps> = ({ size, image, name }) => (
  <MUIAvatar
    src={image || undefined}
    alt={name}
    className={`avatar avatar-${size}`}
  >
    {!image && name?.[0]}
  </MUIAvatar>
);

export default Avatar;
