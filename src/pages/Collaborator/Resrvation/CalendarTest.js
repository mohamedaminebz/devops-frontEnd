import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import {
  FetchMyReservations, //toggleReservations
  toggleReservations
} from 'services/reservationService';
// import { doMutation } from 'utils/mutation';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doMutation } from 'utils/mutation';

function CalendarTest() {
  const localizer = momentLocalizer(moment);
  const { user } = useSelector((state) => state.auth);
  const [selectedResrv, setSelectedResrv] = useState(null);
  const idSpace = user?.spaceID;
  const { data } = useQuery('FetchMyReservations', () => FetchMyReservations(idSpace));
  const modifiedData = data?.map((event) => ({
    ...event,
    startTime: moment(event.startTime).utc().toDate(),
    endTime: moment(event.endTime).utc().toDate(),
    title: event.basket.services.map((service) => service.name).join(', ')
  }));

  console.log('data is ', data);



  const eventPropGetter = (event) => {
    const color = event.status === 'CONFIRMED' ? 'green' : 'red';

    return { style: { backgroundColor: color } };
  };

  function hundlClickEvent(e) {
    console.log('Event Selected ', e);
    setSelectedResrv(e);
    handleClickOpen();
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { mutate } = doMutation('Error Occured ', 'Reservation Toggled added successfully', 'FetchMyReservations', (service_id)=>toggleReservations(service_id) );

  async function ToggleStatus (){
    await mutate(selectedResrv._id)
    setOpen(false);
  }


  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={modifiedData}
        startAccessor="startTime"
        endAccessor="endTime"
        style={{ margin: '20px' }}
        onSelectEvent={(e) => hundlClickEvent(e)}
        eventPropGetter={eventPropGetter}
      />
<Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
  PaperProps={{
    style: {
      width: '28%', // Set the desired width
      maxHeight: '60%', // Set the desired maximum height
      overflow: 'auto', 
      
      
      // Add scroll if content overflows
    },
    
  }}
 
>

        <DialogTitle id="alert-dialog-title">{'Reservation Details ℹ  '}</DialogTitle>
        <div style={{ display: "flex", flexDirection: "column"}}>

        <DialogContent >
          <DialogContentText id="alert-dialog-description"> Reservation By  {selectedResrv?.user?.firstName } {selectedResrv?.user?.lastName }</DialogContentText>
          <DialogContentText id="alert-dialog-description"> Phone Number {selectedResrv?.user?.phoneNumber}</DialogContentText>

          <DialogContentText id="alert-dialog-description">
            Status : <strong style={{ color: selectedResrv?.status === 'CONFIRMED' ? 'green' : 'red' }}>{selectedResrv?.status}</strong>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description"> paymentStatus: {selectedResrv?.paymentStatus}</DialogContentText>
          <DialogContentText id="alert-dialog-description">  paymentMethod: {selectedResrv?.paymentMethod}</DialogContentText>
        </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose}> Close </Button>
          <Button variant="contained" onClick={ToggleStatus} autoFocus  size='sm '>
            { selectedResrv?.status === 'CONFIRMED' ? 'Cancel' : 'Confirm' } Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CalendarTest;
