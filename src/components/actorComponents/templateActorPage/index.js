import React from "react";  // useState/useEffect redundant 
import ActorHeader from "../headerActor";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../../spinner';
import MoviesList from "../movieList";
import TVList from "../tvList";

const TemplateMoviePage = ({ person, children }) => {

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // if (isError) {
  //   return <h1>{error.message}</h1>;
  // }

  return (
    <>
      <ActorHeader person = {person}/>
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList 
                cols={1}>
                    <ImageListItem key={person.profile_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                        alt={person.profile_path}
                    />
                    </ImageListItem>
                
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
          <Grid container>
            <Grid item xs={6}>
          <TVList person = {person}/>
            </Grid>
            <Grid item xs={6}>
          <MoviesList person= {person}/>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </>
  );
};

export default TemplateMoviePage;