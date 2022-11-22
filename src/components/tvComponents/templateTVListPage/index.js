import React, { useState } from "react";
import Header from "../headerTVList";
import FilterCard from "../filterTVCard";
import TVList from "../tvList";
import Grid from "@mui/material/Grid";

function TVListPageTemplate({ TV, title, action }) {

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  let displayedTV = TV
    .filter((m) => {
      return m.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });
    
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
        <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
      </Grid>
      <Grid item container spacing={5}>
        <TVList action={action} TV={displayedTV}></TVList>
      </Grid>
    </Grid>
  );
}
export default TVListPageTemplate;