import React, { useEffect, useState }  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getPersonMovies } from "../../../api/tmdb-api";
import { excerpt } from "../../../util";
import { Typography, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar"

export default function MoviesList({ person}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPersonMovies(person.id).then((similarMovies) => {
      setMovies(similarMovies.cast);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  movies.sort(function(a, b){return b.popularity-a.popularity});

  return (

    <TableContainer component={Paper}>

    <Typography align="center" variant="h6" sx={{ flexGrow: 1 }} style={{paddingTop:10,paddingBottom:10}}>
    {person.name}'s Movies
      </Typography>
      <Divider flexItem />
      <Table sx={{minWidth: 550}} aria-label="similar movies table">
        <TableHead>
          <TableRow>
            <TableCell >Title</TableCell>
            <TableCell align="center">Character</TableCell>
            <TableCell aligm="center">Poster</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.title}
              </TableCell>
              <TableCell >{r.character}</TableCell>
              <TableCell>               
                <Avatar
                        sx = {{width:56, height:56}}
                        variant="square"
                        src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`}
                        alt={person.profile_path}
                    /> </TableCell>
              <TableCell >
              <Link
                  to={`/movies/${r.id}`}
                //   state={{
                //       movie: movie,
                //   }}
                >
                  Full Movie
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}