import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { TVContext } from "../../../contexts/tvContext";

const Footer = (props) => {
  const navigate = useNavigate();
  const {pageNum,type} = useContext(TVContext);
  
  const setPageNumber = (pageNumber) =>{
    const newNum = parseInt(pageNum)+parseInt(pageNumber)
    if(newNum<=0) return;
    var address = '';
    switch(type){
      case 'discover':
        address = '/tvshows/page='
        break;
      case 'toprated':
        address = '/tvshows/toprated/page='
        break;
    }
    navigate(`${address}${newNum}`, { replace: true });
  }
  const title = props.title
  return (
    <Paper 
      component="div" 
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginBottom: 1.5,
      }}
      >
      <IconButton aria-label="go back" onClick={() => setPageNumber(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>


      <Typography variant="h4" component="h3">
        {title}
      </Typography>
      <IconButton aria-label="go forward" onClick={() => setPageNumber(1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Footer;
