import React, { useContext } from "react";
import PageTemplate from "../components/tvComponents/templateTVListPage";
import { TVContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavouritesTV from "../components/cardIcons/removeFromFavouritesTV";
import WriteReview from "../components/cardIcons/writeReview";


const FavouriteTVPage = () => {
  const {favouriteTV: tvIds, setShowType } = useContext(TVContext);


  // Create an array of queries and run in parallel.
  const favouriteTVQueries = useQueries(
    tvIds.map((tvId) => {
      return {
        queryKey: ["tv", { id: tvId }],
        queryFn: getTVShow,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteTVQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const TV = favouriteTVQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

setShowType("favourites")
  return (

    <PageTemplate
      title="Favourite Shows"
      TV={TV}
      action={(TV) => {
        return (
          <>
            <RemoveFromFavouritesTV TV={TV} />
            {/*<WriteReview movie={TV} /> */}
          </>
        );
      }}
    /> 
    
  );
};

export default FavouriteTVPage;
