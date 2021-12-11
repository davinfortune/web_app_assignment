import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../tvShowsFilterCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TvList from "../tvShowList";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

function TvShowListPageTemplate({ shows, title, action }) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  console.log(shows)
  let displayedShows = shows
    .filter((m) => {
      return m.title?.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <TvList action={action} shows={displayedShows}></TvList>
      </Grid>
    </Grid>
  );
}
export default TvShowListPageTemplate;