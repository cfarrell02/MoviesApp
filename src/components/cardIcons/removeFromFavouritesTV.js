import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TVContext } from "../../contexts/tvContext";

const RemoveFromFavouritesIconTV = ({ TV }) => {
  const context = useContext(TVContext);

  const handleRemoveFromFavourites = (e) => {
    e.preventDefault();
    context.removeFromFavourites(TV);
  };
  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavourites}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesIconTV;