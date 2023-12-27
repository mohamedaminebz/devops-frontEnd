/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Stack, Typography, Card, CardContent, CardActions, Chip, IconButton } from '@mui/material';

import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Switch from '@mui/material/Switch';
import EditModal from './Modals/EditModal';
import categoriesServices from 'services/categoriesService';
const label = { inputProps: { 'aria-label': 'Size switch demo' } };

function CardCategory({ data }) {
  const [switchState, setSwitchState] = useState(false);

  useEffect(() => {
    if (data && data.status) {
      setSwitchState(data.status === 'ACTIVE');
    }
  }, [data]);

  const handleSwitchChange = async (event) => {
    try {
      if (data && data._id) {
        const newSwitchState = event.target.checked;
        setSwitchState(newSwitchState);
        const newStatus = newSwitchState ? 'INACTIVE' : 'ACTIVE';
        const d = { status: newStatus };
        await categoriesServices.updateStatus(data._id, d);
      }
    } catch (error) {
      console.error('Error updating category status:', error);
    }
  };

  const [Modal, setModal] = useState({
    open: false,
    value: data
  });
  const Edit = () => {
    setModal({ open: true, value: data });
  };
  const handleClose = () => {
    setModal({ open: false });
  };

  return (
    <Card sx={{ boxShadow: 2, color: !switchState ? '#9E9E9E' : '', backgroundColor: !switchState ? '#fafafa' : '' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Box flexGrow={1}>
            <Typography variant="h5"> {data?.label}</Typography>
          </Box>

          <Box>
            <IconButton aria-label="delete" color="primary" onClick={() => Edit()}>
              <EditRoundedIcon />
            </IconButton>
          </Box>
        </Stack>
        <Typography variant="h6"> Sub_Category</Typography>

        <Box mt={1}>
          {data?.subCategory?.map((item) => (
            <Chip key={item._id} label={item.label} size="small" mb={1} sx={{ color: !switchState ? '#9E9E9E' : '' }} />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Switch {...label} checked={switchState} onChange={(event) => handleSwitchChange(event)} size="small" />
      </CardActions>

      <EditModal Modal={Modal} handleClose={handleClose} />
    </Card>
  );
}

export default CardCategory;
