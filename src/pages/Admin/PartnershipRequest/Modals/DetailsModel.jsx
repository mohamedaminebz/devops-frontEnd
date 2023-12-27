import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid, Button, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import image from '../../../../assets/images/partnership1.png';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DnsIcon from '@mui/icons-material/Dns';

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: '#1890FF', // Set your desired background color here
  color: 'white' // Set your desired text color here
});
function DetailsModel({ handleClose, Modal }) {
  const { value } = Modal;

  return (
    <Dialog open={Modal.open} onClose={handleClose} maxWidth="md">
      <StyledDialogTitle id="alert-dialog-title">
        <Typography variant="h3" component="h2">
          View Details
        </Typography>
      </StyledDialogTitle>{' '}
      <DialogContent>
        <Grid container sx={{ width: '400px' }} mt={2}>
          <img src={image} alt="ff" height={200} />
          <Grid item xs={6} mt={2}>
            <Stack spacing={1}>
              <Typography variant="h5">Partner Information</Typography>
              <Box display="flex" alignItems="center">
                <Box pr={1}>
                  <PersonIcon />
                </Box>
                <Typography>
                  {value.firstName} {value.lastName}
                </Typography>
              </Box>{' '}
              <Box display="flex" alignItems="center">
                <Box pr={1}>
                  <LocalPhoneIcon />
                </Box>
                <Typography>{value.phoneNumber}</Typography>
              </Box>{' '}
              <Box display="flex" alignItems="center">
                <Box pr={1}>
                  <EmailIcon />
                </Box>
                <Typography>{value.email}</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6} mt={2}>
            <Typography variant="h5">Space Information</Typography>

            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <Box pr={1}>
                  <DnsIcon />
                </Box>
                <Typography> {value.spaceName}</Typography>
              </Box>{' '}
              <Box display="flex" alignItems="center">
                <Box pr={1}>
                  <MiscellaneousServicesIcon />
                </Box>
                <Typography> {value.service}</Typography>
              </Box>{' '}
              <Box display="flex" alignItems="center">
                <Box pr={1}>
                  <LocationOnIcon />
                </Box>
                <Typography>{value.addressSpace.city}</Typography>
                <Typography>{value.addressSpace.zipCode}</Typography>
              </Box>{' '}
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailsModel;
