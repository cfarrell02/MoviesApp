import React, { useContext } from "react";
import { getTopRatedTVShows } from "../api/tmdb-api";
import PageTemplate from '../components/tvComponents/templateTVListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlaylistAdd from '../components/cardIcons/playlistAdd'
import AddToFavouritesIconTV from '../components/cardIcons/addToFavouritesTV'
import { TVContext } from "../contexts/tvContext";
import { useParams } from "react-router-dom";

const TopRatedTVPage  = (props) => {
  const {setPageNumber, setShowType} = useContext(TVContext);
  const {pageNumber} = useParams();
  const {  data, error, isLoading, isError }  = useQuery([`toprated-tv-${pageNumber}`,{pageNum: pageNumber}], getTopRatedTVShows)
  setPageNumber(pageNumber);
  setShowType('toprated');

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const TV = data.results;
  

  // Redundant, but necessary to avoid app crashing.
  const favourites = TV.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movieId) => true 

  return (
    <PageTemplate
      title="Top Rated Shows"
      TV={TV}
      action={(TV) => {
        return <AddToFavouritesIconTV TV={TV} />
      }}
    />
  );
};
export default TopRatedTVPage ;


