import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { IconButton } from '@mui/material';

const PlaylistAdd = () => {
  return (
    <IconButton aria-label='add to playlist'>
    <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
}

export default PlaylistAdd;