import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myPlaylist, setMyPlaylist] = useState( [] ) 
  const [myReviews, setMyReviews] = useState( {} )


  const addToFavorites = (movie) => {
    setFavorites([...favorites,movie.id])
  };

  const addToPlaylist = (show) => {
    // console.log("at add to playlist");
    // console.log(show);
    // console.log(myPlaylist);
    var exists = false;
    for(let i = 0; i<=myPlaylist.length; i++){
      if(show.id == myPlaylist[i]){
        exists = true;
      }
      if(exists == false){
        setMyPlaylist([...myPlaylist,show.id])
      }
    }
    console.log(myPlaylist);
  }; 

  const removeFromPlaylist = (show) => {
    setMyPlaylist( myPlaylist.filter(
      (mId) => mId !== show.id
    ) )
  };


  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };


  return (
    <MoviesContext.Provider
    value={{
      favorites,
      myPlaylist,
      addToFavorites,
      removeFromFavorites,
      addReview,
      addToPlaylist,
      removeFromPlaylist,
    }}
  >
    {props.children}
  </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;