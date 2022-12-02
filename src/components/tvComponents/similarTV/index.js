import React, { useEffect, useState }  from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getSimilarTVShows } from "../../../api/tmdb-api";
import { excerpt } from "../../../util";
import { Typography, Divider } from "@mui/material";

export default function SimilarTV({ TV }) {
  const [similarTV, setSimilarTV] = useState([]);

  useEffect(() => {
    getSimilarTVShows(TV.id).then((similarTV) => {
      setSimilarTV(similarTV);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(TV)

  return (

    <TableContainer component={Paper}>

    <Typography align="center" variant="h6" sx={{ flexGrow: 1 }} style={{paddingTop:10,paddingBottom:10}}>
    Similar Shows
      </Typography>
      <Divider flexItem />
      <Table sx={{minWidth: 550}} aria-label="similar movies table">
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="center">Overview</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {similarTV.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.name}
              </TableCell>
              <TableCell >{excerpt(r.overview !== "" ? r.overview : "-")}</TableCell>
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