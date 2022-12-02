import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from "../../contexts/moviesContext";
import React, { useContext } from "react";
import { IconButton } from '@mui/material';

const PlaylistAdd = ({movie}) => {
  const context = useContext(MoviesContext);

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
    console.log(movie);
  };
  return (
    <IconButton aria-label='add to playlist' onClick = {handleAddToPlaylist}>
    <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
}

export default PlaylistAdd;