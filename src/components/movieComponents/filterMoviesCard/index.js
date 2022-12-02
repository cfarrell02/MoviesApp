import React from "react";  // useState/useEffect redundant
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../../images/pexels-dziana-hasanbekava-5480827.jpg';
import { getGenres } from "../../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../../spinner';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box';

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

  export default function FilterMoviesCard(props) {
    const { data, error, isLoading, isError } = useQuery("genres", getGenres);
  
    if (isLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <h1>{error.message}</h1>;
    }
    const genres = data.genres;
    if (genres[0].name !== "All"){
      genres.unshift({ id: "0", name: "All" });
    }
  
    const handleChange = (e, type, value) => {
      e.preventDefault();
      props.onUserInput(type, value); // NEW
    };
  
    const handleTextChange = (e, props) => {
      handleChange(e, "name", e.target.value);
    };
  
    const handleGenreChange = (e) => {
      handleChange(e, "genre", e.target.value);
    };
  
  
    return (
      <Box display="flex"
      justifyContent="center"
      alignItems="center">

      <Paper 
      
      component="div" 
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginBottom: 1.5,
        marginTop:1.5,
       maxWidth:500,
        backgroundColor: "rgb(204, 204, 0)"
      }}
      >
        
        <Grid container spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ flexGrow: 1 }}
      >
<Grid item xs={12} display="flex"
  justifyContent="center"
  alignItems="center" sx={{paddingBottom:1 , paddingTop:2}} >

<Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the Movies.
        </Typography>
        </Grid>
  <Grid item xs={6} display="flex"
  justifyContent="right"
  alignItems="center" >
        <TextField
      sx={formControl}
      id="filled-search"
      label="Search field"
      type="search"
      variant="filled"
      value={props.titleFilter}
      onChange={handleTextChange}
      
    />

      </Grid>
      <Grid item xs={6} display="flex"
  justifyContent="left"
  alignItems="center" >
        <FormControl sx={formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
    labelId="genre-label"
    id="genre-select"
    defaultValue=""
    value={props.genreFilter}
    onChange={handleGenreChange}
  > 
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
          
        </FormControl>
        </Grid>
        
        
              
      {/* <img src={img} style={{height:300}}/> */}

            </Grid>
    </Paper>
 </Box>
  );
}
