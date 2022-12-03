import React, { useState , useEffect} from "react";
import { getFavourites, updateUserMovieFavourites, getMustWatch, updateUserMustWatch, getReviews, updateUserReview ,getAllReviews} from "../api/firebase-api";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { waitForPendingWrites } from "firebase/firestore";
import { FireTruck } from "@mui/icons-material";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( [] ) 
  const [favourites, setFavourites] = useState( [] )
  const [watchlist, setWatchlist] = useState( [] )
  const [pageNum, setPageNum] = useState()
  const [type, setType] = useState('')
  const [user, setUser] = useState();
  const [fetchedFavourites, setFetchedFavourites] = useState(true);
  const [fetchedWatchlist, setFetchedWatchlist] = useState(true);
  const [fetchedReviews, setFetchedReviews] = useState(true);

  const firebaseFavourites  = async () => {
      console.log(fetchedFavourites)
    if(fetchedFavourites){

    const data = await getFavourites(user.email);
 
  setFavourites(data.movies)
  setFetchedFavourites(false);
  console.log(data)
    }
    
  }
  const firebaseMustWatch = async () => {
    
    if(!fetchedWatchlist) return;
   
    const data = await getMustWatch(user.email);
    setWatchlist(data.movies);
   setFetchedWatchlist(false);
  }
  const firebaseReviews = async () => {
   if(!fetchedReviews) return;
    const data = await getAllReviews();
    
    setMyReviews(data);
   setFetchedReviews(false);
  }
  useEffect(() => {
    onAuthStateChanged(getAuth(), (currentUser) => {
      setUser(currentUser);
      if(!user) return;
  })
  firebaseReviews();
  firebaseMustWatch();
  firebaseFavourites();
    });


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
    updateUserMovieFavourites(user.email,newFavourites).then(() => {
    setFetchedFavourites(true);
    
    setFavourites(newFavourites);
    });
    
  };

  const addToMustWatch = (movie) => {
    let newWatchlist = [...watchlist];
    if (!watchlist.includes(movie.id)) {
      newWatchlist.push(movie.id);
    }
    console.log(newWatchlist);
    updateUserMustWatch(user.email,newWatchlist).then(() => {
    setFetchedWatchlist(true);
    
    setWatchlist(newWatchlist);
    });
  };


    const addReview = (movie, review) => {
      let newReviews = [...myReviews];
      newReviews.push(review)
      updateUserReview(user.email,newReviews).then(() => {
      setMyReviews(newReviews);
      setFetchedReviews(true);
      });
      

      //setMyReviews( {...myReviews, review } )
    };

  // We will use this function in a later section
  const removeFromFavourites = (movie) => {
    const newFavourites = favourites.filter(
      (mId) => mId !== movie.id
    )
    updateUserMovieFavourites(user.email,newFavourites).then(() => {
    setFavourites(newFavourites)
    setFetchedFavourites(true);
    })
    
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