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
import FavouriteTVPage from "./pages/favouriteTVPage";
import MustWatchMovies from "./pages/mustWatchMoviePage";
import { useEffect, useState } from "react";
import TVReviewPage from "./pages/tvReviewPage";
import TopRatedTVPage from "./pages/topratedTVPage";
import TVContextProvider from "./contexts/tvContext";
import LoginPage from "./pages/loginPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PersonDetailsPage from "./pages/actorDetailsPage";
import AboutPage from "./pages/aboutPage";

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
  const [user, setUser] = useState({});
useEffect(() => {
  onAuthStateChanged(getAuth(), (currentUser) => {
    setUser(currentUser);
  })});
  return (

    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    {user != null ? (
      <>
          <SiteHeader />      
          <MoviesContextProvider>
            <TVContextProvider>
              
      <Routes>
        <Route exact path="/movies/favourites" element={<FavouriteMoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
        <Route path="/tvshows/reviews/:id" element = {<TVReviewPage/>}/>
        <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
        <Route path="/mustwatch" element={<MustWatchMovies/>} />
        <Route path="/movies/upcoming/page=:pageNumber" element={ <UpcomingMoviesPage /> } />
        <Route path= "/movies/toprated/page=:pageNumber" element = {<TopRatedMoviesPage/>}/>
        <Route path="/tvshows/page=:pageNumber" element = {<TVPage/>}/>
        <Route path="/tvshows/:id" element = {<TVDetailsPage/>}/>
        <Route path="/tvshows/toprated/page=:pageNumber" element={ <TopRatedTVPage /> } />
        <Route path="/tvshows/favourites" element={ <FavouriteTVPage /> } />
        <Route path="/page=:pageNumber" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/person/:id" element={<PersonDetailsPage/>}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={ <Navigate to="/login" /> } />
      </Routes>
              
      </TVContextProvider>
      </MoviesContextProvider></>
      ):(
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={ <Navigate to="/login" /> } />
      </Routes>)
      }
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App /> );

