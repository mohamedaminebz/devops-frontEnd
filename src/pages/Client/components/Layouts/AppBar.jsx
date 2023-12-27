/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Drawer,
  IconButton,
  Hidden,
  Link
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import categoriesServices from 'services/categoriesService';
import { useQuery } from 'react-query';
import Logo from '../../../../assets/images/Logo/logo.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from 'layout/MainLayout/Header/HeaderContent/Profile/index';
import Favories from 'pages/Client/Favories/Favories';
import History from 'pages/Client/ReservationHistory/index';

const AppBarr = () => {
  const { data, isLoading, error } = useQuery('activeCategories', categoriesServices.getCategoriesActive);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const appBarRef = useRef(null);
  const subcategoriesRef = useRef(null);

  const handleCategoryClick = (category, event) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleCloseSubcategories = () => {
    setSelectedCategory(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subcategoriesRef.current && !subcategoriesRef.current.contains(event.target)) {
        setSelectedCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const goToService = (id) => {
    navigate(`/client/service/${id}`);
  };
  const handleNavigate = () => {
    navigate(`/home`);
  };
  return (
    <div style={{ position: '' }}>
      <AppBar elevation={0} position="fixed" color="default" ref={appBarRef} sx={{ backgroundColor: 'white', padding: 1, boxShadow: 2 }}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setSelectedCategory(selectedCategory === null ? data[0] : null)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Box onClick={() => handleNavigate()}>
            <img src={Logo} alt="Treatwell" style={{ marginLeft: '15px', width: '100px', marginRight: 15, cursor: 'pointer' }} />
          </Box>

          <Hidden smDown>
            {data?.map((category) => (
              <Grid item xs={1} key={category.id} ml={3}>
                <Typography
                  variant="body1"
                  onClick={() => handleCategoryClick(category)}
                  sx={{
                    color: selectedCategory === category ? '#089DD3' : 'inherit',
                    borderBottom: selectedCategory === category ? '2px solid #089DD3' : 'none',
                    transition: 'color 0.3s, borderBottom 0.9s',
                    marginRight: '15px',
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#089DD3'
                    }
                  }}
                >
                  {category.label}
                </Typography>
              </Grid>
            ))}
          </Hidden>
          {!isLoggedIn ? (
            <div style={{ marginLeft: 'auto' }}>
              <Link href="/booking/membership" style={{ color: '#FF3366' }}>
                Become Collaborator
              </Link>{' '}
              &nbsp; &nbsp;
              <Button color="black" href="/booking/login" variant="outlined" sx={{ borderRadius: 20 }}>
                Sign in
              </Button>{' '}
              &nbsp;
              <Button href="/booking/register" color="pink" variant="contained" sx={{ color: 'white', borderRadius: 20 }}>
                Sign Up
              </Button>
            </div>
          ) : (
            <>
              <div style={{ marginLeft: 'auto', display: 'flex' }}>
                <History />
                <Favories />
                <Profile />
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Hidden mdUp>
        <Drawer anchor="left" open={selectedCategory !== null} onClose={handleCloseSubcategories} ModalProps={{ keepMounted: true }}>
          <List>
            {data?.map((category) => (
              <ListItem key={category.id} button onClick={() => handleCategoryClick(category)}>
                <ListItemText primary={category.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Hidden>

      {selectedCategory && (
        <Grid
          container
          ref={subcategoriesRef}
          style={{
            zIndex: 10,
            position: 'fixed',
            top: appBarRef.current ? appBarRef.current.offsetHeight : 0,
            left: 0,
            right: 0,
            background: 'rgb(245, 243, 243)',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            opacity: selectedCategory ? 1 : 0,
            pointerEvents: selectedCategory ? 'auto' : 'none'
          }}
        >
          <Grid item sx={{ p: 2 }} xs={4}>
            <List>
              {selectedCategory.subCategory.map((subcategory) => (
                <ListItem key={subcategory._id} button>
                  <ListItemText primary={subcategory.label} onClick={() => goToService(subcategory?.label)} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item sx={{ p: 2 }} xs={4}>
            <img
              src="https://res.cloudinary.com/duchnti5k/image/upload/v1690412480/Booking_Platform/download%20%281%29.webp.webp"
              height={150}
              alt="hh"
            />
          </Grid>
          <Grid item sx={{ p: 2 }} xs={4}>
            <img
              src="https://res.cloudinary.com/duchnti5k/image/upload/v1690412480/Booking_Platform/download%20%281%29.webp.webp"
              height={150}
              alt="hh"
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AppBarr;
