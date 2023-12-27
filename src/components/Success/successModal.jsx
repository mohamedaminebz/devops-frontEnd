import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Lottie from 'lottie-react';
import { Typography } from '@mui/material';

import successAnimation from '../../assets/animations/success.json';

export default function SuccessModal({ show, title }) {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);

    if (show) {
      // Automatically close the modal after 5 seconds
      const timeout = setTimeout(() => {
        setOpen(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Typography variant="h4" sx={{ color: '#1E3E79' }}>
            <strong> {title}</strong>
          </Typography>
          <Lottie
            animationData={successAnimation}
            style={{
              resizeMode: 'contain',
              alignSelf: 'center',
              margin: 'auto',
              height: 250,
              width: 250
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
