
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

const MovieHeader = (props) => {
  const person = props.person;
  // const persons = JSON.parse(localStorage.getItem("favourites")); 
  // const ids = person.map((m) => m.id);
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
       {/* {
          ids.includes(person.id) ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        } */}

      <Typography variant="h4" component="h3">
        {person.name+" "}
        <a href={person.homepage}>
          <HomeIcon color="primary" />
        </a>
        <br />
        {/* {movie.tagline ?
        <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span> : null} */}
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;