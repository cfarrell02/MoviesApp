import React, { useState } from "react";

export const TVContext = React.createContext(null);

const TVContextProvider = (props) => {
  const [favouriteTV, setFavouriteTV] = useState( [] )
 // const [myReviews, setMyReviews] = useState( [] )
  const [mustWatchTV,setMustWatchTV] = useState( [] )
  const [pageNum, setPageNum] = useState([])
  const [type, setType] = useState([])
  const setPageNumber = (num) => {
    
    //if(newPageNum <= 0) return;
    setPageNum(num);
  }

  const setShowType = (type) =>{
    setType(type);
  }

  const addToFavouriteTV = (TV) => {
    let newFavourites = [...favouriteTV];
    if (!favouriteTV.includes(TV.id)) {
      newFavourites.push(TV.id);
    }
    setFavouriteTV(newFavourites);
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
    setFavouriteTV( favouriteTV.filter(
      (mId) => mId !== TV.id
    ) )
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