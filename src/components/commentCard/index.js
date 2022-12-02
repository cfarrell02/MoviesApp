import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteComment} from "../../api/firebase-api";

const Comment =  ({ comment, user }) => {

  const deleteCommentFromFirebase = async () => {
    console.log(`removed ${comment.content}`)
    await deleteComment(comment.id);

  }
  return (
    <>
        <Card sx={{  padding:2, margin:2}} >
    
    <Grid container spacing={2} sx={{padding:2}}>
              <Avatar sx={{marginRight:1}} size="small"/>
        <Typography component="div" sx={{ flexGrow: 1 ,marginRight:1, paddingTop:1}}>
     {comment.creator} ({comment.time.toDate().toDateString()}) 
     </Typography>
     {user.email === comment.email ? 
     <Button onClick={() => deleteCommentFromFirebase()}><DeleteIcon/></Button> : null
     }
    </Grid>

    <Divider/>

  
      <Typography sx={{paddingTop:1}}>{comment.content} </Typography>

    
      </Card>
    </>
  );
};
export default Comment