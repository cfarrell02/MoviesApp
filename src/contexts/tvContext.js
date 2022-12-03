import React, { useState , useEffect} from "react";
import { getFavourites, updateUserShowFavourites} from "../api/firebase-api";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export const TVContext = React.createContext(null);

const TVContextProvider = (props) => {
  const [favouriteTV, setFavouriteTV] = useState( [] )
 // const [myReviews, setMyReviews] = useState( [] )
  const [mustWatchTV,setMustWatchTV] = useState( [] )
  const [pageNum, setPageNum] = useState([])
  const [type, setType] = useState([])
  const [fetchedFavourites, setFetchedFavourites] = useState(true);
  const [user, setUser] = useState({});
  const setPageNumber = (num) => {
    
    //if(newPageNum <= 0) return;
    setPageNum(num);
  }


  const firebaseFavourites  = async () =>{
    if(!fetchedFavourites) return;
    const data = await getFavourites(user.email);
  setFavouriteTV(data.shows)
  setFetchedFavourites(false);

  }
  useEffect(() => {
    onAuthStateChanged(getAuth(), (currentUser) => {
      setUser(currentUser);
      if(!currentUser) return;

      firebaseFavourites();

    })});

  const setShowType = (type) =>{
    setType(type);
  }

  const addToFavouriteTV = (TV) => {
    let newFavourites = [...favouriteTV];
    if (!favouriteTV.includes(TV.id)) {
      newFavourites.push(TV.id);
    }
    updateUserShowFavourites(user.email,newFavourites).then(() => {
    setFetchedFavourites(true);
    
    setFavouriteTV(newFavourites);
    })
  };

  const addToMustWatch = (TV) => {
    let newMustWatch = [...mustWatchTV];
    if (!mustWatchTV.includes(TV.id)) {
      newMustWatch.push(TV.id);
    }
    setMustWatchTV(newMustWatch);
   // console.log(newMustWatch)
  };

  // We will use this function in a later section
  const removeFromFavourites = (TV) => {
    const newFavourites = favouriteTV.filter(
      (mId) => mId !== TV.id
    )
    updateUserShowFavourites(user.email,newFavourites).then(() => {
    setFavouriteTV(newFavourites)
  setFetchedFavourites(true);
    })
    
  };

  const removeFromMustWatch = (TV) => {
    setMustWatchTV( mustWatchTV.filter(
      (mId) => mId !== TV.id
    ) )
  };

  // const addReview = (TV, review) => {
  //   setMyReviews( {...myReviews, [TV.id]: review } )
  // };

 return (
    <TVContext.Provider
      value={{
        favouriteTV,
        addToFavouriteTV,
        removeFromFavourites,
        // addReview,
        mustWatchTV,
        addToMustWatch,
        removeFromMustWatch,
        pageNum,
        setPageNumber,
        type,
        setShowType
      }}
    >
      {props.children}
    </TVContext.Provider>
  );
};

export default TVContextProvider;