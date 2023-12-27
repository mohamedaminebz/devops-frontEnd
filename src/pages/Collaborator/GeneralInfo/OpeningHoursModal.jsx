/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, Stack, Divider } from '@mui/material';
import { Checkbox, FormControlLabel, Select, MenuItem, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { update, updatedOpeningHours } from 'services/spaceServices';
import { doMutation } from 'utils/mutation';

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: '#1890FF', // Set your desired background color here
  color: 'white' // Set your desired text color here
});
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function OpeningHoursModal({ handleClose, Modal, data }) {
  const { open } = Modal;
  const [openingHours, setOpeningHours] = useState(data?.openingHours);

  const handleCheckboxChange = (index) => (event) => {
    const updatedOpeningHours = [...openingHours];
    updatedOpeningHours[index].opened = event.target.checked;
    setOpeningHours(updatedOpeningHours);
  };

  const handleTimeChange = (index, field) => (event) => {
    const updatedOpeningHours = [...openingHours];
    updatedOpeningHours[index][field] = event.target.value;
    setOpeningHours(updatedOpeningHours);
  };
  const { mutate } = doMutation(
    'Error message if any',
    'Opening Hours updated successfully',
    'spaceInfo',
    (data) => updatedOpeningHours(data),
    handleClose
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!openingHours || !data._id) {
      console.error('Opening hours or ID is missing or undefined.');
      return;
    }
    const d = { _id: data._id, openingHours };

    await mutate(d);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <StyledDialogTitle id="alert-dialog-title">
        <Typography variant="h4" component="h2">
          Manage Opening Hours
        </Typography>
      </StyledDialogTitle>{' '}
      <DialogContent sx={{ width: '600px' }}>
        <form onSubmit={handleSubmit}>
          {openingHours.map((day, index) => (
            <Grid key={index} container spacing={2} alignItems="center" justifyContent="start">
              <Grid item xs={3}>
                <FormControlLabel
                  control={<Checkbox checked={day.opened} onChange={handleCheckboxChange(index)} color="primary" />}
                  label={daysOfWeek[day.day]}
                />
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h5" component="h2">
                  From
                </Typography>
              </Grid>
              <Grid item xs={2} m={1}>
                <Select value={day.openingTime} onChange={handleTimeChange(index, 'openingTime')} disabled={!day.opened} size="small">
                  <MenuItem value="08:00">08:00</MenuItem>
                  <MenuItem value="09:00">09:00</MenuItem>
                  <MenuItem value="10:00">10:00</MenuItem>
                  <MenuItem value="11:00">11:00</MenuItem>
                  <MenuItem value="12:00">12:00</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="h5" component="h2">
                  To
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Select value={day.closingTime} onChange={handleTimeChange(index, 'closingTime')} disabled={!day.opened} size="small">
                  <MenuItem value="15:00">15:00</MenuItem>
                  <MenuItem value="16:00">16:00</MenuItem>
                  <MenuItem value="17:00">17:00</MenuItem>
                  <MenuItem value="18:00">18:00</MenuItem>
                  <MenuItem value="19:00">19:00</MenuItem>
                  <MenuItem value="20:00">20:00</MenuItem>
                </Select>
              </Grid>
            </Grid>
          ))}
          <Divider />
          <DialogActions>
            <Button type="submit" autoFocus variant="contained">
              Save
            </Button>
            <Button onClick={handleClose} autoFocus variant="outlined">
              Close
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default OpeningHoursModal;
