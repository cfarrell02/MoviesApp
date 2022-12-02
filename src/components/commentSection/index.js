import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Comment from "../commentCard";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {addNewComment} from "../../api/firebase-api";

const Comments =  ({ comments , user}) => {
    const [commentText, setCommentText] = React.useState("");

    const postComment = (content) => {
      console.log(content);
        const comment = {
            content: content,
            creator: user.displayName ? user.displayName : user.email,
            email: user.email,
            time: new Date()
        } 
        
        addNewComment(comment);
    }

  return (
    <>
            <Grid container spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ flexGrow: 1 }}
      >
        <Grid item xs={12}>
        <Card sx={{ width:1000, minHeight:300,maxHeight:1000, padding:2}}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
     Comments </Typography>
    <Divider sx={{marginTop:2,marginBottom:2}}/>
      {comments.map((comment) => {
        return (
          <Comment comment={comment} user={user}/>
        )
      })
      }
      <Divider sx={{marginTop:4, marginBottom:2}}/>
     <TextField placeholder="Write a comment..." onChange={(e,m) => setCommentText(e.target.value)} sx={{minWidth:500}} />
      <Button onClick={() => postComment(commentText)} sx={{marginTop:2, marginBottom:2}}>Post</Button>
      </Card>
      </Grid>
      
      </Grid>
    </>
  );
};
export default Comments