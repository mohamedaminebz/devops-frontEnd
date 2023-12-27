/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Stack, Box, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { getAvailableTimeOnAdate } from 'services/reservationService';

const StyleCard = {
  border: '1px solid #cccccc',
  borderRadius: 2,
  padding: 1
};
function DatePicker({ handleTimeSelect, handleDateChange, selectedDate, selectedTime, space }) {
  const [availableTimeSlots, setavailableTimeSlots] = useState([]);
  useEffect(() => {
    if (selectedDate && space?._id) {
      const data = { date: selectedDate, spaceId: space._id };
      getAvailableTimeOnAdate(data)
        .then((d) => {
          setavailableTimeSlots(d.timeSlots);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedDate, space]);

  return (
    <Stack sx={StyleCard}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" alignItems="center">
          <DateCalendar
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <input {...params} />}
            ToolbarComponent={() => null}
          />
          {selectedDate && (
            <Box sx={{ width: 280, maxHeight: '300px', overflowY: 'auto' }}>
              <List>
                {availableTimeSlots.map((timeSlot, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => handleTimeSelect(timeSlot)}
                    style={{
                      color: selectedTime === timeSlot ? '#1E3E79' : 'inherit'
                    }}
                  >
                    <Typography>
                      {selectedTime === timeSlot ? (
                        <strong>
                          {' '}
                          <FiberManualRecordIcon sx={{ height: 10, width: 10 }} />
                          &nbsp;&nbsp;{timeSlot}{' '}
                        </strong>
                      ) : (
                        timeSlot
                      )}{' '}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Stack>
      </LocalizationProvider>{' '}
    </Stack>
  );
}

export default DatePicker;
