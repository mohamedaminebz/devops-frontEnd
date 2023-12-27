/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Container, Stack, Button, Typography, Box, Divider, Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

const StyleCard = {
  border: '0.5px solid #cccccc',
  borderRadius: 2,
  padding: 0,
  marginTop: 16
};

const imageStyle = {
  width: 80,
  height: 80,
  position: 'relative',
  top: '-50px',
  borderRadius: 5,
  boxShadow: 5
};

function Basket({ data, selectedServices }) {
  const getTotal = (services) => {
    let total = 0;
    services?.forEach((item) => {
      if (item.promo === true) {
        total += item.pricePromo;
      } else {
        total += item.price;
      }
    });
    return total;
  };
  return (
    <Stack sx={StyleCard}>
      <Stack direction="column" alignItems="center" sx={{ borderBottom: '1px solid #cccccc', paddingBottom: 2 }}>
        <img src={data?.photos[0]} alt="Your Image" style={imageStyle} />

        <Typography variant="h4">
          <strong>{data?.label}</strong>
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }} pr={3} pl={3} color="textSecondary">
          <strong>{data?.address.city}</strong>
        </Typography>
      </Stack>
      <Stack direction="column" sx={{ borderBottom: '1px solid #cccccc', paddingBottom: 2, padding: 2 }}>
        {selectedServices && selectedServices?.length === 0 ? (
          <Typography variant="p" color="textSecondary">
            No services selected yet
          </Typography>
        ) : (
          selectedServices?.map((service, index) => (
            <Stack direction="row" key={index}>
              <Box flexGrow={1} pb={1}>
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="p" color="textSecondary">
                  {service.duration} min
                </Typography>{' '}
              </Box>
              <Box>
                <Typography variant="h6">{service.promo === true ? service.pricePromo : service.price} DT</Typography>
              </Box>
            </Stack>
          ))
        )}
      </Stack>
      <Stack direction="row" sx={{ paddingBottom: 2, padding: 2 }}>
        <Box flexGrow="1">
          <Typography variant="h6">
            <strong>Total: </strong>
          </Typography>
        </Box>
        <Typography variant="h6">
          <strong>{getTotal(selectedServices)} dt</strong>
        </Typography>
      </Stack>{' '}
    </Stack>
  );
}

export default Basket;
