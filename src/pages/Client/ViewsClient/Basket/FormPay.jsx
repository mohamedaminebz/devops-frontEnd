/* eslint-disable no-unused-vars */
import React from 'react';
import { List, ListItem, ListItemText, Stack, Box, Typography, Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RoomIcon from '@mui/icons-material/Room';
import TextField from '@mui/material/TextField';

const StyleCard = {
  border: '1px solid #cccccc',
  borderRadius: 2,
  padding: 4
};
const StylePay = {
  border: '1px solid #cccccc',
  borderRadius: 2,
  padding: 1
};
function FormPay({ handleChange, PaymentInfo, handleSubmit }) {
  return (
    <Stack sx={StyleCard}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl fullWidth>
          <FormLabel id="demo-radio-buttons-group-label"> Paiement Method</FormLabel>
          <RadioGroup name="paymentMethod" value={PaymentInfo?.paymentMethod} onChange={handleChange}>
            <Stack direction="row" alignItems="center" sx={StylePay} m={1}>
              <Box flexGrow={1}>
                <FormControlLabel required value="CARD" control={<Radio />} label="Pay with card" />{' '}
              </Box>
              <CreditCardIcon />
            </Stack>
            <Stack direction="row" alignItems="center" sx={StylePay} m={1}>
              <Box flexGrow={1}>
                <FormControlLabel required value="CASH" control={<Radio />} label="Pay on the spot" />{' '}
              </Box>

              <RoomIcon />
            </Stack>
          </RadioGroup>
        </FormControl>

        {PaymentInfo?.paymentMethod === 'CARD' ? (
          <div>
            <TextField
              name="numCard"
              value={PaymentInfo?.numCard}
              label="Number of card"
              variant="outlined"
              onChange={handleChange}
              type="number"
              sx={{ margin: 1 }}
              required
            />
            <TextField
              sx={{ margin: 1 }}
              name="expire"
              value={PaymentInfo?.expire}
              label="Expire"
              variant="outlined"
              onChange={handleChange}
              type="text"
              required
            />{' '}
            <TextField
              sx={{ margin: 1 }}
              name="code"
              value={PaymentInfo?.code}
              label="Code"
              variant="outlined"
              onChange={handleChange}
              type="number"
              required
            />
          </div>
        ) : (
          ''
        )}
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#000000', color: '#FFFFFF', marginTop: 3 }} fullWidth>
          Confirm
        </Button>
      </form>
    </Stack>
  );
}

export default FormPay;
