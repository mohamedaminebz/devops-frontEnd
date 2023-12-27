/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Stack, Button, Typography, Box, Divider, Tab, Grid, Avatar } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function OpeningHours({ data }) {
  const getDayNameByIndex = (dayIndex) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (dayIndex >= 0 && dayIndex < 7) {
      return days[dayIndex];
    } else {
      throw new Error('Invalid day index. The day index should be between 0 and 6.');
    }
  };

  return (
    <div style={{ marginTop: 15 }}>
      {' '}
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        Opening Hours
      </Typography>
      {data?.openingHours.map((item, index) => (
        <Stack direction="row" alignItems="center" width={'50%'} key={index} spacing={1} mt={1}>
          {item.opened ? <FiberManualRecordIcon color="primary" /> : <FiberManualRecordIcon color="secondary" />}
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {getDayNameByIndex(item.day)}
          </Typography>
          <Box flexGrow={1}></Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {item.openingTime} - {item.closingTime}
          </Typography>
        </Stack>
      ))}
    </div>
  );
}

export default OpeningHours;
