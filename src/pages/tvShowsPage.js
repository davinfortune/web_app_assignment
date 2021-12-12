import React from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getShows } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylists";

const TvShowsPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('tvshows', getShows)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data.results;

  // Redundant, but necessary to avoid app crashing.
  // const playlists = shows.filter(m => m.playlist)
  // localStorage.setItem('playlists', JSON.stringify(playlists))
  // const addToPlaylist = (showId) => true 
  // console.log(playlists);

  return (
    <PageTemplate
      title="Tv Shows"
      shows={shows}
      action={(show) => {
        return <AddToPlaylistIcon show={show} />
      }}
    />
  );
};


export default TvShowsPage;