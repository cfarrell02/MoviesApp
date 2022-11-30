
import {React, useContext} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToFavouritesIconTV from "../../cardIcons/addToFavouritesTV";
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import { TVContext } from "../../../contexts/tvContext";

const TVHeader = (props) => {
  const TV = props.TV;
  const {favouriteTV} = useContext(TVContext)
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

      <Typography variant="h4" component="h3">
        <AddToFavouritesIconTV TV= {TV}/>
        {TV.name+" "}
        {
          favouriteTV.includes(TV.id) ? (
              <FavoriteIcon style={{color:'red'}}/>
          ) : null
        }
        <a href={TV.homepage}>
          <HomeIcon color="primary" />
        </a>
        <br />{
        TV.tagline ?
        <span sx={{ fontSize: "1.5rem" }}>{`   "${TV.tagline}"`} </span> : null}
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TVHeader;