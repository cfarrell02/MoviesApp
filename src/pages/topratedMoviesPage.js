import React, {useContext} from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from '../components/movieComponents/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlaylistAdd from '../components/cardIcons/playlistAdd'
import { MoviesContext } from "../contexts/moviesContext";
import { useParams } from "react-router-dom";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

const TopRatedMoviesPage  = (props) => {
  const {setPageNumber, setShowType} = useContext(MoviesContext);
  const {pageNumber} = useParams();

  const {  data, error, isLoading, isError }  = useQuery([`toprated-${pageNumber}`,{pageNum:pageNumber}], getTopRatedMovies)
  setPageNumber(pageNumber);
  setShowType('toprated');
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;


  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
  );
};
export default TopRatedMoviesPage ;


