/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Container, Grid, Card, CardContent, Typography, Chip, Box, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { fDateTime } from 'functions/formatTime';
import { FetchReservationsByUser } from 'services/reservationService';
const cardDesign = {
  border: 'none',
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
};
const History = () => {
  const { data: reservations, isLoading, error } = useQuery('reservations', () => FetchReservationsByUser());
  const [visibleReservations, setVisibleReservations] = useState(3);
  const increment = 3;

  const handleShowMore = () => {
    setVisibleReservations((prevVisible) => prevVisible + increment);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Recent Booking
      </Typography>
      <Grid container spacing={3} sx={{ paddingLeft: 2 }}>
        {reservations &&
          reservations.reservations.slice(0, visibleReservations).map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined" sx={cardDesign}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item>
                      <img src={item.space.photos[0]} alt="space" height="100px" />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h5">{item.space.label}</Typography>
                      <Box display="flex" alignItems="center">
                        <LocationOnIcon fontSize="small" />
                        <Typography variant="body1">{item.space.address.city}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <CalendarMonthIcon fontSize="small" />
                        <Typography variant="body1">{fDateTime(item.createdAt)}</Typography>
                      </Box>
                      <Box mt={1}>
                        {item.basket.services.map((service) => (
                          <Chip label={service.name} size="small" key={service._id} style={{ marginRight: '0.5rem' }} />
                        ))}
                      </Box>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {' '}
                        <strong>Total Price: {item.basket && item.basket.totalPrice} dt </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>{' '}
      {reservations && visibleReservations < reservations.reservations.length && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="outlined" color="primary" onClick={handleShowMore}>
            Show More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default History;
