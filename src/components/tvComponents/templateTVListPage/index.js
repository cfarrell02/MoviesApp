import React, { useContext, useState } from "react";
import Header from "../headerTVList";
import Footer from "../footerTVList";
import FilterCard from "../filterTVCard";
import TVList from "../tvList";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import FilterListIcon from '@mui/icons-material/FilterList';
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { TVContext } from "../../../contexts/tvContext";

function TVListPageTemplate({ TV, title, action }) {

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {pageNum} = useContext(TVContext);

  let displayedTV = TV
    .filter((m) => {
      return m.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });
    
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };
  console.log(`Page num: ${pageNum}`)
  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />


      </Grid>
      <Grid item container xs={12} spacing={4}>
        <TVList action={action} TV={displayedTV}></TVList>
        
      </Grid>
      <Grid item xs = {12}>
      <Box display="flex"
      justifyContent="center"
      alignItems="center"
      sx= {{paddingTop:2}}>
        
      <Footer title={pageNum} /></Box></Grid>
      <Fab
        color="primary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          top: '5em',
          right: '1em'
        }}
      >
        Filter
        <FilterListIcon/>
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
      </Drawer>
    </Grid>
  );
}
export default TVListPageTemplate;