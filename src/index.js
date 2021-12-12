import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import ShowPage from "./pages/tvShowDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import MovieUpcomingPage from "./pages/upcomingMoviePage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import TvShowsPage from './pages/tvShowsPage';
import UpcomingTvShowsPage from './pages/upcomingTvShowsPage';
import PlaylistShowsPage from './pages/playlistShowsPage';
import PopularMoviePage from './pages/popularMoviesPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          {" "}
          <Switch>
            <Route exact path="/reviews/form" component={AddMovieReviewPage} />
            <Route path="/reviews/:id" component={MovieReviewPage} />
            <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
            <Route path="/movies/:id" component={MoviePage} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/upcomingMovies" component={MovieUpcomingPage} />
            <Route exact path="/tvshows" component={TvShowsPage} />
            <Route exact path="/upcomingtvshows" component={UpcomingTvShowsPage} />
            <Route exact path ="/playlist" component={PlaylistShowsPage} />
            <Route exact path ="/popularmovies" component={PopularMoviePage} />
            <Route path="/tvshows/:id" component={ShowPage} />
            <Redirect from="*" to="/" />
          </Switch>
      </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));