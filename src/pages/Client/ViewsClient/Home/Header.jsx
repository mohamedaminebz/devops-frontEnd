/* eslint-disable no-unused-vars */
import React from 'react';
import BG from '../../../../assets/images/client/BG2.jpeg';
import BGSmall from '../../../../assets/images/client/BG_Small.jpeg'; // Add the path to the small image

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from '@mui/material';
import Grid from '@mui/material/Grid';

const Container = styled('div')({
  position: 'relative',
  width: '100%',
  maxWidth: '100%'
});

const Image = styled('img')({
  width: '100%',
  height: 'auto'
});

const TextOverlay = styled('div')({
  position: 'absolute',
  top: '50%',
  right: '100px',
  transform: 'translateY(-50%)',
  textAlign: 'right',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
});

const SearchBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  padding: '14px',
  width: '300px',
  margin: 'auto',
  marginTop: 40
});

function Header() {
  const isSmallScreen = window.innerWidth <= 268; // Adjust the breakpoint to your desired value

  return (
    <Container sx={{ marginTop: -3 }}>
      <Image src={isSmallScreen ? BGSmall : BG} alt="bg" height={isSmallScreen ? '200%' : '100%'} />
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <TextOverlay>
            <Typography color="blue" variant="h4">
              Discover & book{' '}
            </Typography>
            <Typography color="blue" variant="h6">
              local beauty professionals{' '}
            </Typography>
            <SearchBox>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-category">Category</InputLabel>
                <OutlinedInput
                  size="small"
                  id="outlined-adornment-category"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  label="Category"
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-location">Location</InputLabel>
                <OutlinedInput
                  size="small"
                  id="outlined-adornment-location"
                  startAdornment={
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  }
                  label="Location"
                />
              </FormControl>
              <Button href="/booking/register" color="secondary" variant="contained" sx={{ color: 'white', width: '100%' }}>
                Search here
              </Button>
            </SearchBox>
          </TextOverlay>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Header;
