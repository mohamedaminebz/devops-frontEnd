import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

function ServiceComponent({ sr }) {
  const [showDescription, setShowDescription] = useState(false);

  const buttonStyle = {
    width: 100,
    height: 32
    // Set the text color to ensure it's visible on the custom background color
  };

  const handleToggleDescription = (event) => {
    // Prevent toggling the description when clicking the "Select" button
    if (event.target.tagName !== 'BUTTON') {
      setShowDescription(!showDescription);
    }
  };

  return (
    <>
      <Card
        key={sr?._id}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '100px',
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
          cursor: 'pointer',
          backgroundColor: showDescription ? '#F5F5F5' : 'inherit'
        }}
        onClick={handleToggleDescription}
      >
        <div style={{ maxWidth: '300px', marginLeft: 15 }}>{sr?.name}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>{sr?.price} DT</div>

          {sr.promo ? <div style={{ textDecoration: 'line-through' }}>{sr?.pricePromo} DT</div> : null}
        </div>
        <div style={{ margin: 15 }}>
          {' '}
          <Button variant="outlined" color="primary" style={buttonStyle}>
            Select
          </Button>
        </div>
      </Card>
      {showDescription && (
        <div style={{ width: '100%', padding: '0 15px', marginLeft: 15 }}>
          <Typography>{sr?.description}</Typography>
        </div>
      )}
    </>
  );
}

export default ServiceComponent;
