import React, { useContext } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getShow } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";
import WriteReview from "../components/cardIcons/writeReview";

const PlaylistShowsPage = () => {
  const {myPlaylist: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getShow,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);
  if (isLoading) {
    return <Spinner />;
  }
  const shows = favoriteMovieQueries.map((q) => q.data);
  const toDo = () => true;


  return (
    <PageTemplate
      title="Your Playlist"
      shows={shows}
      action={(show) => {
        return (
          <>
            <RemoveFromPlaylist show={show} />
          </>
        );
      }}
    />
  );
};

export default PlaylistShowsPage;