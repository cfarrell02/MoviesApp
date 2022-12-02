import React , { useContext , useEffect, useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/movieComponents/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import { getAllComments } from "../api/firebase-api";
import { useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {getAuth , onAuthStateChanged} from "firebase/auth";
import { Typography } from "@mui/material";
import Comments from "../components/commentSection";

const AboutPage = (props) => {
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (currentUser) => {
      setUser(currentUser);
    
    const setAllComments = async () => {
        const data = await getAllComments();
        setComments(data);
    }
     setAllComments();

  });

}, []);

comments.sort((a, b) => a.time - b.time);





  return (
    <Grid item container alignItems="center"
    justifyContent="center" >
    <Paper sx={{margin:5, padding:5, align:'center'}} alignItems="center"
    justifyContent="center"> 
    <Typography variant="h5" component="h2">
        About
        </Typography>
        <Divider sx={{marginTop:1, marginBottom:1}}/>
        <Typography variant="body1" component="p">
        This is a movie app that allows you to search for movies and add them to your favourites. You can also add comments to movies.
        The very same can be done with tv shows!
        </Typography>
        <Divider sx={{marginTop:5, marginBottom:5}}/>
        
        <Comments comments={comments} user={user} />
    </Paper>
    </Grid>

  );
};
export default AboutPage;