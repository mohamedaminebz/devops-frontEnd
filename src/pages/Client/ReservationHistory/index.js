/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Badge, IconButton } from '@mui/material';

import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useNavigate } from 'react-router-dom';
function index() {
  const navigate = useNavigate();
  return (
    <IconButton
      disableRipple
      color="secondary"
      sx={{ color: 'text.primary', bgcolor: 'grey.100' }}
      aria-label="open profile"
      aria-controls={'profile-grow'}
      aria-haspopup="true"
      onClick={() => navigate('/recent_reservation')}
    >
      <Badge color="primary">
        <BookmarkAddedIcon />
      </Badge>
    </IconButton>
  );
}

export default index;
