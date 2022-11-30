

import React, { useContext , useState , useEffect} from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getMovieCredits } from "../../../api/tmdb-api";
import img from '../../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";

export default function Credits(movie){
    const [credits, setCredits] = useState([]);
    useEffect(() => {
        getMovieCredits(movie.movie.id).then((creds) => {
            setCredits(creds);
        });
    }, []);



    return(
        <Card style={{maxHeight:1000, overflow:'scroll'}}>
        <Grid container display="flex"
    justifyContent="center"
    alignItems="center">
            {credits.map((c) => (
                <Grid item xs={3} display="flex"
                justifyContent="center"
                alignItems="center" style={{padding:10}}>
                    <Link to={`/person/${c.id}`} style={{ textDecoration: "none" }}>
                    <Card sx={{ maxWidth:  400, width:300}} >
                    <CardHeader
                        title={c.name}
                        subheader={c.character}
                    />
                          <CardMedia
        sx={{ height: 300 }}
        image={ c.profile_path ? `https://image.tmdb.org/t/p/w500/${c.profile_path}` : img
        }
      />
                    </Card>
                    </Link>
                </Grid>
            ))}

        </Grid>

        </Card>
    );
}