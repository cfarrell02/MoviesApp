import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { TVContext } from "../../../contexts/tvContext";

const Footer = (props) => {
  const navigate = useNavigate();
  const {pageNum,type} = useContext(TVContext);
  
  const setPageNumber = (pageNumber) =>{
    const newNum = pageNumber;
    if(newNum<=0) return;
    switch(type){
      case 'discover':
        navigate(`/tvshows/page=${newNum}`, { replace: true });
        break;
      case 'toprated':
        navigate(`/tvshows/toprated/page=${newNum}`, { replace: true });
        break;
      default:
        console.error('Pagination not applicable for this page')
        break;
    }
  }
  const handleChange = (event, value) => {
    setPageNumber(value);
  };
 
  const currentPageNumber = parseInt(pageNum);
  return (
  <Pagination count={500} defaultPage={currentPageNumber}  siblingCount={2} boundaryCount={2} onChange={handleChange}/>
  );
};

export default Footer;
