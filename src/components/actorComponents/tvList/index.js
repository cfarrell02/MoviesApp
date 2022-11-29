import React, { useEffect, useState }  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getPersonTV } from "../../../api/tmdb-api";
import Avatar from "@mui/material/Avatar";
import { excerpt } from "../../../util";
import { Typography, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function TVList({ person}) {
  const [TV, setTV] = useState([]);

  useEffect(() => {
    getPersonTV(person.id).then((similarTV) => {
      setTV(similarTV.cast);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  TV.sort(function(a, b){return b.popularity-a.popularity});

  const [query,setQuery] = useState("");

  let filteredShows = TV.filter((m) => { return m.name.toLowerCase().search(query.toLowerCase()) !== -1;
  }).sort(function(a, b){return b.popularity-a.popularity});

  const filterShows = (event,value) => {
  setQuery(event.target.value);
};

  return (

    <TableContainer component={Paper}>

    <Typography align="center" variant="h6" sx={{ flexGrow: 1 }} style={{paddingTop:10,paddingBottom:10}}>
    {person.name}'s Shows
      </Typography>
      <Divider flexItem />
      <Box align="center">
      <TextField size="small" style={{margin:5, width:300}} placeholder="Filter..." onChange={filterShows}/>
      </Box>
      <Divider flexItem />
      <Table sx={{minWidth: 550}} aria-label="similar shows table">
        <TableHead>
          <TableRow>
            <TableCell >Title</TableCell>
            <TableCell align="center">Character</TableCell>
            <TableCell align="center">Poster</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredShows.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.name}
              </TableCell>
              <TableCell >{r.character}</TableCell>
              <TableCell style = {{maxWidth :50, maxHeight:50}}>                   
               <Avatar
                        sx = {{width:56, height:56}}
                        variant="square"
                        src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`}
                        alt={person.profile_path}
                    /> 
              </TableCell>
              <TableCell >
              <Link
                  to={`/tvshows/${r.id}`}
                //   state={{
                //       movie: movie,
                //   }}
                >
                  Full Show
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}