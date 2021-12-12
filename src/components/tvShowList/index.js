import React from "react";
import Show from "../tvShowsCard";
import Grid from "@material-ui/core/Grid";

const tvShowList = ( {shows, action }) => {
  let showCards = shows.map((tv) => (
    <Grid key={tv.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Show key={tv.id} show={tv} action={action} />
    </Grid>
  ));
  return showCards;
};

export default tvShowList;