
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import AddToFavouritesIcon from "../../cardIcons/addToFavourites";
import WriteReviewIcon from "../../cardIcons/writeReview";
import { useContext } from "react";
import {MoviesContext}  from "../../../contexts/moviesContext";
import Box from "@mui/material/Box";

const MovieHeader = (props) => {
  const movie = props.movie;
  const {favourites} = useContext(MoviesContext)
  const navigate = useNavigate();

  return (
    <Paper 
        component="div" 
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            margin: 0,
        }}
      >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

        <Box align='center'>

      <Typography variant="h4" component="h3">
      <AddToFavouritesIcon movie={movie}/>
      <WriteReviewIcon movie={movie} />

        {movie.title+" "}
        {
          favourites.includes(movie.id) ? (
              <FavoriteIcon style={{color:'red'}}/>
          ) : null
        }

        <a href={movie.homepage}>
          <HomeIcon color="primary" />
        </a>


        <br />
        {movie.tagline ?
        <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span> : null}
      </Typography>
      </Box>

      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;