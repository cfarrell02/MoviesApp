import React, { useState, useEffect, useContext, createContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Autocomplete, Divider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Avatar from '@mui/material/Avatar';
import { getSearchResults } from "../../api/tmdb-api";
import Box from '@mui/material/Box';
import TheatersIcon from '@mui/icons-material/Theaters';



const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [searchHistory, setSearchHistory] = useState([]);



  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Movies", path: "/page=1" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favourites", path: "/movies/favourites" },
    { label: "Must Watch", path: "/mustwatch" },
    { label: "Top Rated", path: "/movies/toprated" },
    { label: "TV Shows", path: "/tvshows/page=1" },
    { label: "Top Rated", path: "/tvshows/toprated/page=1"},
    { label: "Favourites", path: "/tvshows/favourites" }

  ];

  const dropdownOptions = [
    [
      { title: "Movies"},
      { label: "Discover", path: "/page=1" },
      { label: "Upcoming", path: "/movies/upcoming/page=1" },
      { label: "Favourites", path: "/movies/favourites" },
      { label: "Must Watch", path: "/mustwatch" },
      { label: "Top Rated", path: "/movies/toprated/page=1" }
    ],
    [
      { title: "TV Shows"},
      { label: "Discover", path: "/tvshows/page=1" },
      { label: "Top Rated", path: "/tvshows/toprated/page=1"},
      { label: "Favourites", path: "/tvshows/favourites" }
    ]
  ]

  const [searchResults, setSearchResults] = useState([]);


  const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(getAuth(), (currentUser) => {
      setUser(currentUser);
    })});
    const initial = user.email?.charAt(0).toUpperCase();

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAutoFill = (event,value) => {
    const query = event.target.value;
    getSearchResults(1,query).then((results) => {
  
    setSearchResults(results);
    });

  }

  const handleSearch = (event,value) => {
    if(!value) return;
    setSearchHistory([...searchHistory,value]);
    if(value.media_type === "movie"){
      navigate(`/movies/${value.id}`);
    }else if(value.media_type === "tv"){
      navigate(`/tvshows/${value.id}`);
    }else{
      navigate(`/person/${value.id}`);
    }
  };
  const displayName = user.displayName ? user.displayName : user.email;

  return (
    <>
      <AppBar position="fixed" color="secondary" sx={{ backgroundColor: 'lightblue', color: 'black'}} >
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <TheatersIcon fontSize='medium'/> {displayName}'s Cinema 
          </Typography>

          <Autocomplete
      id="country-select-demo"
      sx={{ width: 500, marginRight:2, backgroundColor: 'white', borderRadius: 2 }}
      options={searchResults ? searchResults : searchHistory}
      autoHighlight
      getOptionLabel={(option) => option.media_type === 'movie' ? option.title: option.name}
      onChange={handleSearch}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="25"
            src={`https://image.tmdb.org/t/p/w500/${option.media_type === 'person' ?option.profile_path: option.poster_path}`}
            alt=""
          />
          { option.media_type === 'movie' ? option.title: option.name} ({option.media_type}) {option.media_type === 'person' ?  (option.media_type === 'movie' ?option.release_date: option.first_air_date):null}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search the database..."
          inputProps={{
            ...params.inputProps,
         //   autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          onChange={handleAutoFill}
          onAction={handleSearch}

        />
        )}
        />


            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
              <Divider orientation="vertical" flexItem />
              {dropdownOptions.map((menu) => (
                <>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <div style ={{paddingLeft: 10, paddingRight: 10}}>
                      <Button variant="contained" {...bindTrigger(popupState)} sx={{ backgroundColor: 'darkblue' , color : 'white'}}>
                        {menu[0].title}
                      </Button>
                      </div>
                      <Menu {...bindMenu(popupState)} >
                        {menu.filter((item,index) => index !== 0).map((opt) => (
                          <div onClick={() => handleMenuSelect(opt.path)}><MenuItem onClick={popupState.close}>{opt.label}</MenuItem></div>
                        ))}
                        
                      </Menu>
                    </React.Fragment>
                    
                  )}
                  </PopupState>
                  <Divider orientation="vertical" flexItem />
                  </>
                
              ))}
              </>
            )}
           <Button onClick = {() => navigate('/about')} sx={{ backgroundColor: 'darkblue' , color : 'white', marginLeft: 2}}>About</Button>
           <Divider orientation="vertical" flexItem sx={{paddingRight: 2}}/>
            <div style = {{paddingLeft: 10}}>
              <Link to="/login" style={{ textDecoration: "none" }}>
            <Avatar >{user !== undefined? initial:'-'} </Avatar> 
            </Link>
            </div>
            
                    </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;