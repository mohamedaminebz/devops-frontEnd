import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5
};

function ProductValues() {
  return (
    <Box component="section" sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}>
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box component="img" src="https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=1024x1024&w=is&k=20&c=lNQVwTuYzo9wQZfZzHioQMCJRTHWVzhX1UXmcqgnF5k=" alt="suitcase" sx={{ height: 155 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                The best luxury hotels
              </Typography>
              <Typography variant="h5">
                {'From the latest trendy boutique hotel to the iconic palace with XXL pool'}

                {', go for a mini-vacation just a few subway stops away from your home.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box component="img" src="https://media.cntraveler.com/photos/5d827bb077061d0008731f5f/16:9/w_1600,c_limit/1-Hotel-West-Hollywood_2019_Pool_157.jpg" alt="graph" sx={{ height: 155 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                New experiences
              </Typography>
              <Typography variant="h5">
                {'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '}

                {'your Sundays will not be alike.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box component="img" src="https://media.istockphoto.com/id/470455143/photo/cheap-motel-room-bed.jpg?s=612x612&w=0&k=20&c=kquWQfvZ4Y_ffwPn0ypJOoinvUPy4T09KODxZe4c0fA=" alt="clock" sx={{ height: 155 }} />
              <Typography variant="h6" sx={{ my: 5 }}>
                Exclusive rates
              </Typography>
              <Typography variant="h5">
                {'By registering, you will access specially negotiated rates '}
                {'that you will not find anywhere else.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
