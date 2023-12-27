import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GenericDelete({ header, mutate, payload, loading }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async () => {
    try {
      await mutate(payload);
      setOpen(false);
    } catch (error) {
      console.log('Error catched is ', error);
    }
  };
  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon color="error" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Process For deleting an item ..❌❓'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{`Are you sure you want to delete this ${header} ?`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Close
          </Button>
          <Button onClick={handleConfirm} autoFocus disabled={loading} variant="contained" color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
