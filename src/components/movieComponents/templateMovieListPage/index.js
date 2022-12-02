import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import FilterListIcon from '@mui/icons-material/FilterList';
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import Footer from "../footerMovie";
import {MoviesContext} from "../../../contexts/moviesContext";
import {getMovieSearchResults} from '../../../api/tmdb-api'
import { useQuery } from "react-query";

function MovieListPageTemplate({ movies, title, action }) {

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {pageNum} = useState(MoviesContext)

  // var {searchQuery, error, isLoading, isError } = useQuery(
  //   [`searchQuery-${nameFilter}`, { query: nameFilter, pageNum: 1 }],
  //   getMovieSearchResults
  // );


  // movies = searchQuery !== undefined ? searchQuery.results : movies;

 // const searchQuery =  getSearchResults(nameFilter,pageNum)
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
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
      </Grid>
      
      <Grid item container spacing={5}>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
      <Grid item xs = {12}>
      <Box display="flex"
      justifyContent="center"
      alignItems="center"
      sx= {{paddingTop:2}}>
        
      <Footer title={pageNum} /></Box></Grid>
      <Fab
        color="primary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          top: '5em',
          right: '1em'
        }}
      >
        Filter
        <FilterListIcon/>
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
      </Drawer>
    </Grid>
  );
}
export default MovieListPageTemplate;