import React from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getUpcomingShows } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylists";

const UpcomingTvShowsPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('tv', getUpcomingShows)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data.results;
  console.log(shows);

  // Redundant, but necessary to avoid app crashing.
  const playlists = shows.filter(m => m.playlists)
  localStorage.setItem('playlists', JSON.stringify(playlists))
  const addToPlaylist = (playlists) => true 

  return (
    <PageTemplate
      title="Upcoming Tv Shows"
      shows={shows}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
  );
};


export default UpcomingTvShowsPage;