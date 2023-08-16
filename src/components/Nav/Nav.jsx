import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CottageIcon from '@mui/icons-material/Cottage';
import InfoIcon from '@mui/icons-material/Info';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LogoutIcon from '@mui/icons-material/Logout';



function Nav() {
  const user = useSelector((store) => store.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="nav">
      <Link to="/home">
        {/* <h2 className="nav-title">Luego app</h2> */}
        {/* <img src='images/luego-app-lsogo.png'/> */}
        <img src='images/luego-app.png'/>
      </Link>
      
      <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="text" sx={{color:'white'}}
        size="large"
      > 
        <DensityMediumIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}
        </MenuItem>

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
          <MenuItem onClick={handleClose}>
            <Link className="navLink" to="/user">
            <CottageIcon/> Home
            </Link>
          </MenuItem>
            
            {/* <Link className="navLink" to="/homeProjects">
              Home Projects
            </Link> */}
          <MenuItem onClick={handleClose}>
            <Link className="navLink" to="/info">
              <InfoIcon /> Info Page
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link className="navLink" to="/about">
              <HelpCenterIcon/> About
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
           <LogoutIcon/> <LogOutButton className="navLink" />
          </MenuItem>
          </>
        )}

      </Menu>
      </div>
    </div>
  );
}

export default Nav;
