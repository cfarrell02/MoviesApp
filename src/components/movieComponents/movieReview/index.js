import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

const MovieReview =  ({ review }) => {
  return (
    <>
            <Grid container spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ flexGrow: 1 }}
      >
        <Card sx={{ width:600, minHeight:300, padding:2}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Review By: {review.author} </Typography>
    <Divider sx={{marginTop:4, marginBottom:2}}/>
      <Typography>{review.content} </Typography>
      </Card>
      </Grid>
    </>
  );
};
export default MovieReview