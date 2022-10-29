import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ) 
  const [favourites, setFavourites] = useState( [] )
  const [watchlist, setWatchlist] = useState( [] )

  const addToFavourites = (movie) => {
    let newFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      newFavourites.push(movie.id);
    }
    setFavourites(newFavourites);
  };

  const addToMustWatch = (movie) => {
    let newWatchlist = [...watchlist];
    if (!watchlist.includes(movie.id)) {
      newWatchlist.push(movie.id);
    }
    setWatchlist(newWatchlist);
  };


    const addReview = (movie, review) => {
      setMyReviews( {...myReviews, [movie.id]: review } )
    };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    setFavourites( favourites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        watchlist,
        addToFavourites,
        addToMustWatch,
        removeFromFavourites,
        addReview
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;