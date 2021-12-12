import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddIcon from'@material-ui/icons/PlaylistAdd';
import IconButton from "@material-ui/core/IconButton";

const AddToPlaylistIcon = ({ show }) => {
    const context = useContext(MoviesContext);

    const handleAddToPlaylist = (e) => {
      e.preventDefault();
      // console.log("at handle add to playlist");
      // console.log(show);
      context.addToPlaylist(show);
    };
    return (
      <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
    );
  };
  
  export default AddToPlaylistIcon;