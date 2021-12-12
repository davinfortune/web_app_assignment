import React, { useContext } from "react";
import { ShowsContext } from "../../contexts/showsContext";
import PlaylistAddIcon from'@material-ui/icons/PlaylistAdd';
import IconButton from "@material-ui/core/IconButton";

const AddToPlaylistIcon = ({ movie }) => {
    const context = useContext(ShowsContext);

    const handleAddToPlaylist = (e) => {
      e.preventDefault();
      context.addToPlaylist(movie);
    };
    return (
      <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
    );
  };
  
  export default AddToPlaylistIcon;