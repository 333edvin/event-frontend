import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useAuth } from '../Contexts/auth';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout =()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')
    navigate('/')
    toast.success("Logout SuccessFull")
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <>
       <AppBar position="fixed" sx={{bgcolor:"white"}} >
      <Container >
        <Toolbar disableGutters>
          <VolunteerActivismIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,color:"black"}} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Bliss Events 
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu 
  id="menu-appbar"
  anchorEl={anchorElNav}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  keepMounted
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  open={Boolean(anchorElNav)}
  onClose={handleCloseNavMenu}
  sx={{
    display: { xs: 'block', md: 'none' },
  }}
>
<Link to={'/'} className='text-dark'>
              Home</Link><br />
              <Link to={'/about'} className='text-dark'>
              About</Link><br />
              <Link to={'/gallery'} className='text-dark'>
              Gallery</Link>
</Menu>

          </Box>
          <VolunteerActivismIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
             Bliss Events 
          </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',gap:'30px' } }}>
              <Link to={'/'} className='text-dark'>
              Home</Link>
              <Link to={'/about'} className='text-dark'>
              About</Link>
              <Link to={'/gallery'} className='text-dark'>
              Gallery</Link>
             
            </Box>

            <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton sx={{ p: 0 }} onClick={handleClick}>
          <AccountCircleIcon className='text-dark' />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!auth.user ? (
          <div>
              <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>
                Login
            </MenuItem>
              </Link>
              <Link to={'/register'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>
                Signup
            </MenuItem>
              </Link>
          </div>
        ) : (
          <div>
              <Link to={'/dashboard'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>
                Dashboard
            </MenuItem>
              </Link>
            <MenuItem onClick={() => { handleClose(); handleLogout(); }}>
              Logout
            </MenuItem>
          </div>
        )}
      </Menu>
    </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Header;
