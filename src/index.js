import React from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import TVPage from "./pages/tvShowsPage";
import TVDetailsPage from './pages/tvShowDetailsPage'
import SiteHeader from './components/siteHeader'
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import TopRatedMoviesPage from "./pages/topratedMoviesPage";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import {Link} from 'react-router-dom'
import MustWatchMovies from "./pages/mustWatchMoviePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
          <SiteHeader />      {/* New Header  */}
          <MoviesContextProvider>
      <Routes>
        <Route exact path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/mustwatch" element={<MustWatchMovies/>} />
        <Route path="/movies/upcoming" element={ <UpcomingMoviesPage /> } />
        <Route path= "/tvshows/toprated" element = {<TopRatedMoviesPage/>}/>
        <Route path="/tvshows" element = {<TVPage/>}/>
        <Route path="/tvshows/:id" element = {<TVDetailsPage/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
      </MoviesContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App /> );