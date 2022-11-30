import React, { useState , useEffect} from "react";
import { getFavourites, updateUserMovieFavourites, getMustWatch, updateUserMustWatch, getReviews, updateUserReview} from "../api/firebase-api";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( [] ) 
  const [favourites, setFavourites] = useState( [] )
  const [watchlist, setWatchlist] = useState( [] )
  const [pageNum, setPageNum] = useState()
  const [type, setType] = useState('')
  const [user, setUser] = useState({});
useEffect(() => {
  onAuthStateChanged(getAuth(), (currentUser) => {
    setUser(currentUser);
    if(!currentUser) return;
    const firebaseFavourites  = async () =>{
      const data = await getFavourites(currentUser.email);
    console.log(data.shows)
    setFavourites(data.movies)
    }
    const firebaseMustWatch = async () => {
      const data = await getMustWatch(currentUser.email);
      setWatchlist(data.movies);
    }
    const firebaseReviews = async () => {
      const data = await getReviews(currentUser.email);
      setMyReviews(data.reviews);
    }
    firebaseReviews();
    firebaseMustWatch();
    firebaseFavourites();
  })},[]);


  const setPageNumber = (num) => {
    setPageNum(num);
  }

  const setShowType = (type) =>{
    setType(type);
  }


  const addToFavourites = (movie) => {
    let newFavourites = [...favourites];
    if (!favourites.includes(movie.id)) {
      newFavourites.push(movie.id);
    }
    updateUserMovieFavourites(user.email,newFavourites);
    setFavourites(newFavourites);
  };

  const addToMustWatch = (movie) => {
    let newWatchlist = [...watchlist];
    if (!watchlist.includes(movie.id)) {
      newWatchlist.push(movie.id);
    }
    console.log(newWatchlist);
    updateUserMustWatch(user.email,newWatchlist);
    setWatchlist(newWatchlist);
  };


    const addReview = (movie, review) => {
      let newReviews = [...myReviews];
      newReviews.push(review)
      setMyReviews(newReviews);
      updateUserReview(user.email,newReviews);

      //setMyReviews( {...myReviews, review } )
    };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    const newFavourites = favourites.filter(
      (mId) => mId !== movie.id
    )
    setFavourites(newFavourites)
    updateUserMovieFavourites(user.email,newFavourites);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        watchlist,
        myReviews,
        addToFavourites,
        addToMustWatch,
        removeFromFavourites,
        addReview,
        type,
        pageNum,
        setPageNumber,
        setShowType
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;