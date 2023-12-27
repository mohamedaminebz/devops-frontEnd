/* eslint-disable no-unused-vars */
import React from 'react';
import { List, ListItem, ListItemText, Stack, Box, Typography, Button } from '@mui/material';
const StyleCard = {
  border: '1px solid #cccccc',
  borderRadius: 2,
  padding: 4
};
function SignUpIn() {
  const navigateSignUp = () => {
    window.open('/booking/register', '_blank');
  };
  const navigateSignIn = () => {
    window.open('/booking/login', '_blank');
  };
  return (
    <Stack sx={StyleCard} direction="column" spacing={1}>
      <Button onClick={() => navigateSignUp()} variant="contained" sx={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
        Sign Up
      </Button>

      <Typography variant="p" color="textSecondary">
        Already have an account?
      </Typography>

      <Button variant="outlined" onClick={() => navigateSignIn()}>
        Sign In
      </Button>
    </Stack>
  );
}

export default SignUpIn;
