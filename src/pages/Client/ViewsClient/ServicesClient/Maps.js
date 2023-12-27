/* eslint-disable */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Card from '@mui/material/Card';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from './marker2.png';
import { useEffect, useState } from 'react';

export default function Maps({ data }) {
  const [userLocation, setUserLocation] = useState(null);

  const GpsPoints = data?.map((space) => ({
    lat: space.space.GPS.lat,
    lng: space.space.GPS.lng,
    title: space.space.GPS.title
  }));
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [30, 32] // adjust the size as needed
  });

  useEffect(() => {
    // Get the user's current location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        console.log([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);
  const center = [36.831232, 10.0794368];

  const MyMarkers = ({ data }) => {
    return data?.map(({ lat, lng, title }, index) => (
      <Marker key={index} position={{ lat, lng }} icon={customIcon}>
        <Popup>{title} 🪒</Popup>
      </Marker>
    ));
  };
  const tileLayer = {
    attribution: '&copy; <a href="https://flagdownload.com/wp-content/uploads/Flag_of_Tunisia_Flat_Round.png">Mbooking</a> Plateform',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  };
  return (
    <MapContainer center={userLocation || center} zoom={12} scrollWheelZoom={false} style={{ height: '100%', overflow: 'hidden' }}>
      <TileLayer {...tileLayer} />
      {userLocation && (
        <Marker position={userLocation} icon={customIcon}>
          <Popup>Your Location 🏠</Popup>
        </Marker>
      )}

      <MyMarkers data={GpsPoints} />
    </MapContainer>
  );
}
