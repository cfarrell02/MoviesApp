import React, {useContext} from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/movieComponents/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlaylistAdd from '../components/cardIcons/playlistAdd';
import { MoviesContext } from "../contexts/moviesContext";
import { useParams } from "react-router-dom";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const UpcomingMoviesPage  = (props) => {
  const {setPageNumber, setShowType} = useContext(MoviesContext);
  const {pageNumber} = useParams();
  const {  data, error, isLoading, isError }  = useQuery([`upcoming-${pageNumber}`,{pageNum:pageNumber}], getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }
  setPageNumber(pageNumber);
  setShowType('upcoming');
  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movieId) => true 

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <PlaylistAdd movie = {movie}/>
      }}
    />
  );
};
export default UpcomingMoviesPage ;


