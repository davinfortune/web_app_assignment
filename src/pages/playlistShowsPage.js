import React, { useContext } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { ShowsContext } from "../contexts/showsContext";
import { useQueries } from "react-query";
import { getShow } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const PlaylistShowPage = () => {
  const {playlists: showIds } = useContext(ShowsContext);

  // Create an array of queries and run in parallel.
  const playlistShowQueries = useQueries(
    showIds.map((showId) => {
      return {
        queryKey: ["watchlist", { id: showId }],
        queryFn: getShow,
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = playlistShowQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const shows = playlistShowQueries.map((q) => q.data);

  return (
    <PageTemplate
      title="Your Playlist"
      shows={shows}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default PlaylistShowPage;