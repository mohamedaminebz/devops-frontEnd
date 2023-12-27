import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import partnershipServices from 'services/partnershipServices';
//import Toastfunction from 'functions/ToastFunction';
const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: '#1890FF', // Set your desired background color here
  color: 'white' // Set your desired text color here
});
function ApproveModal({ handleClose, Modal }) {
  const { value } = Modal;
  const data = { state: 'APPROVED' };

  const approve = () => {
    partnershipServices
      .approve(value._id, data)
      .then(() => {
        handleClose();
        Toastfunction.TaostSuccess('Patnership Approved Succesfuly');

        value.state = 'APPROVED';
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Dialog open={Modal.open} onClose={handleClose} maxWidth="md">
      <StyledDialogTitle id="alert-dialog-title">
        <Typography variant="h4" component="h2">
          Partnership Request {value.firstName}
        </Typography>
      </StyledDialogTitle>{' '}
      <DialogContent sx={{ width: '600px' }}>
        <Stack spacing={2} mt={2}>
          <Box>
            {' '}
            <Typography variant="h3">Are you sure to approve this partner ?</Typography>{' '}
          </Box>
          <Box display="flex">
            <Box pr={1}>
              <WarningAmberIcon color="warning" />
            </Box>
            <Typography variant="h6">
              If you agree to approve it, an email will be sent to them containing a login and password, let them access to the platform as
              a collaborator.
            </Typography>{' '}
          </Box>{' '}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={approve} autoFocus variant="contained">
          Agree
        </Button>
        <Button onClick={handleClose} autoFocus variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApproveModal;
