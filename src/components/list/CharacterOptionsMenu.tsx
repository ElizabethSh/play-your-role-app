import React, { useState } from "react";
import { Link } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { AppRoute } from "settings";

type CharacterOptionsMenuProps = {
  characterId: string;
  openDialog: (id: string) => void;
};

const CharacterOptionsMenu: React.FC<CharacterOptionsMenuProps> = ({
  characterId,
  openDialog,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more options"
        aria-controls={open ? `character-menu-${characterId}` : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`character-menu-${characterId}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          component={Link}
          to={`${AppRoute.Characters}/${characterId}`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem
          component={Link}
          to={`${AppRoute.Characters}/${characterId}/edit`}
          onClick={handleMenuClose}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            openDialog(characterId);
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            slotProps={{ primary: { color: "error" } }}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default CharacterOptionsMenu;
