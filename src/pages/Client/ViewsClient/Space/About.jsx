/* eslint-disable no-unused-vars */
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Typography, Box, Grid } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import markerIcon from '../../../../assets/images/location.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [30, 32]
});
function About({ data }) {
  return (
    <div style={{ marginTop: 15 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        About
      </Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="body1">{data?.description}</Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <LocalPhoneIcon color="primary" />
            <Typography variant="body1" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
              {data?.phoneNumber}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <EmailIcon color="primary" />
            <Typography variant="body1" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
              {data?.email}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <div style={{ height: '400px', width: '100%' }}>
            {data?.GPS && (
              <MapContainer center={[data?.GPS?.lat, data?.GPS?.lng]} zoom={13} style={{ height: '70%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[data?.GPS?.lat, data?.GPS?.lng]} icon={customIcon}>
                  <Popup>{data?.GPS?.lat}</Popup>
                </Marker>
              </MapContainer>
            )}

            {/* <Box display="flex" alignItems="center" mt={2}>
              <LocationOnIcon color="primary" />
              <Typography variant="body1" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
                {data?.address?.city}
              </Typography>
            </Box> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default About;
