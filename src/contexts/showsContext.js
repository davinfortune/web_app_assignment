import React, { useState } from "react";

export const ShowsContext = React.createContext(null);

const ShowsContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} )
  const [playlists, setPlaylists] = useState( [] ) 

  const addReview = (show, review) => {
    setMyReviews( {...myReviews, [show.id]: review } )
  };

  const addToPlaylist= (show) => {
    var exists = false;
    for(let i = 0; i<playlists.length; i++){
      if(show.id === playlists[i]){
        exists = true;
      }
    }
    if(exists === false){
      setPlaylists([...playlists, show.id])
    }
  };

  const removeFromPlaylist = (show) => {
    setPlaylists( playlists.filter(
      (mId) => mId !== show.id
    ) )
  };

  return (
    <ShowsContext.Provider
    value={{ 
      playlists,
      addReview,
      addToPlaylist,
      removeFromPlaylist,
    }}
  >
    {props.children}
  </ShowsContext.Provider>
  );
};

export default ShowsContextProvider;