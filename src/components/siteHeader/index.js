import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);



  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Movies", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favourites", path: "/movies/favourites" },
    { label: "Must Watch", path: "/mustwatch" },
    { label: "Top Rated", path: "/movies/toprated" },
    { label: "TV Shows", path: "/tvshows" },
    { label: "Top Rated", path: "/tvshows/toprated"}

  ];

  const dropdownOptions = [
    [
      { title: "Movies"},
      { label: "Discover", path: "/" },
      { label: "Upcoming", path: "/movies/upcoming" },
      { label: "Favourites", path: "/movies/favourites" },
      { label: "Must Watch", path: "/mustwatch" },
      { label: "Top Rated", path: "/movies/toprated" }
    ],
    [
      { title: "TV Shows"},
      { label: "Discover", path: "/tvshows" },
      { label: "Top Rated", path: "/tvshows/toprated"}
    ]
  ]

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };



  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
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
                      <Button variant="contained" {...bindTrigger(popupState)}>
                        {menu[0].title}
                      </Button>
                      </div>
                      <Menu {...bindMenu(popupState)} >
                        {menu.filter((item,index) => index !== 0).map((opt) => (
                          <MenuItem onClick={popupState.close}><div onClick={() => handleMenuSelect(opt.path)}>{opt.label}</div></MenuItem>
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
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;