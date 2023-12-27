/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { Button, Grid, InputLabel, OutlinedInput, Select, MenuItem, Stack, FormHelperText, TextField, Divider } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { Dialog, DialogContent, DialogActions, DialogTitle, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MapContainer, TileLayer, Marker, useMap, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import markerIcon from '../../assets/images/location.png';

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: '#1890FF',
  color: 'white'
});
const customIcon = L.icon({
  iconUrl: markerIcon, // Make sure this is a valid URL to the icon image
  iconSize: [32, 32], // Adjust the size as needed
  iconAnchor: [16, 32] // Adjust the anchor point
});

const GenericModal = ({ initialValues, validationSchema, onSubmit, buttonName, inputsPerRow = 1, Modal, handleClose }) => {
  const { open, title } = Modal;

  const [showPassword] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  // Handler for image selection
  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        imagesArray.push(reader.result);
        if (i === files.length - 1) {
          setSelectedImages(imagesArray);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const [selectedLocation, setSelectedLocation] = useState({ latitude: 0, longitude: 0 });

  const handleMapInteraction = (latitude, longitude, setFieldValue, fieldName) => {
    setSelectedLocation({
      latitude,
      longitude
    });
    setFieldValue(`${fieldName}.latitude`, latitude);
    setFieldValue(`${fieldName}.longitude`, longitude);
  };
  const GetCoordinates = ({ onMapInteraction, setFieldValue, fieldName }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const info = L.DomUtil.create('div', 'legend');

      const positionControl = L.Control.extend({
        options: {
          position: 'bottomleft'
        },

        onAdd: function () {
          info.textContent = 'Click on map';
          return info;
        }
      });

      const control = new positionControl();

      map.addControl(control);

      map.on('click', (e) => {
        const newLatitude = e.latlng.lat;
        const newLongitude = e.latlng.lng;

        onMapInteraction(newLatitude, newLongitude, setFieldValue, fieldName);
      });

      return () => {
        map.removeControl(control);
      };
    }, [map, onMapInteraction]);

    return null;
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <StyledDialogTitle id="alert-dialog-title">
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </StyledDialogTitle>{' '}
      <DialogContent sx={{ width: '600px', marginTop: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          render={({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, status, setFieldValue }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Render form fields dynamically */}
                {Object.keys(initialValues).map((fieldName) => (
                  <>
                    <Grid item xs={12 / inputsPerRow} key={fieldName}>
                      <Stack spacing={1}>
                        {initialValues[fieldName] != 'textArea' ? <InputLabel htmlFor={fieldName}>{fieldName}</InputLabel> : ''}
                        {typeof initialValues[fieldName] === 'string' ? (
                          <>
                            <Field
                              as={OutlinedInput}
                              id={fieldName}
                              type={fieldName === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                              name={fieldName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder={`Enter ${fieldName}`}
                              fullWidth
                              error={touched[fieldName] && Boolean(errors[fieldName])}
                            />
                            <ErrorMessage component={FormHelperText} name={fieldName} error id={`${fieldName}-helper-text`} />
                          </>
                        ) : typeof initialValues[fieldName] === 'object' && initialValues[fieldName].type === 'select' ? (
                          <Field
                            as={Select}
                            id={fieldName}
                            name={fieldName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            error={touched[fieldName] && Boolean(errors[fieldName])}
                          >
                            {initialValues[fieldName].options.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Field>
                        ) : typeof initialValues[fieldName] === 'object' && initialValues[fieldName].type === 'date' ? (
                          <Field
                            as={TextField}
                            id={fieldName}
                            type="date"
                            name={fieldName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            error={touched[fieldName] && Boolean(errors[fieldName])}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                        ) : initialValues[fieldName].type === 'image' ? (
                          <Grid item xs={12}>
                            <input
                              type="file"
                              id="images"
                              name={`${fieldName}.value`}
                              multiple
                              onChange={(event) => {
                                setFieldValue(`${fieldName}.value`, event.currentTarget.files);
                                handleImageChange(event);
                              }}
                            />
                            {/* Show preview of selected images */}
                            {selectedImages.length > 0 && (
                              <div>
                                <h3>Selected Images Preview:</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                  {selectedImages.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`Preview ${index}`}
                                      style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </Grid>
                        ) : initialValues[fieldName].type === 'multiselect' ? (
                          <Grid item xs={12}>
                            <Autocomplete
                              size="small"
                              multiple
                              id="fixed-tags-demo"
                              name={`${fieldName}.options`}
                              value={selectedOption} // Set the value conditionally
                              onChange={(event, newValue) => {
                                setSelectedOption(newValue);
                                setFieldValue(`${fieldName}.options`, newValue);
                              }}
                              options={initialValues[fieldName].options}
                              getOptionLabel={(option) => option.label}
                              renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => <Chip label={option.label} key={index} {...getTagProps({ index })} />)
                              }
                              renderInput={(params) => (
                                <TextField {...params} label={` Select ${fieldName}`} placeholder={`${fieldName}`} />
                              )}
                            />
                          </Grid>
                        ) : initialValues[fieldName].type === 'map' ? (
                          <Grid item xs={12} key={fieldName}>
                            <MapContainer center={[33.892166, 9.561555]} zoom={8} style={{ height: '200px', width: '100%' }}>
                              <GetCoordinates onMapInteraction={handleMapInteraction} setFieldValue={setFieldValue} fieldName={fieldName} />

                              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                              {selectedLocation.latitude !== 0 && selectedLocation.longitude !== 0 && (
                                <Marker position={[selectedLocation.latitude, selectedLocation.longitude]} icon={customIcon}>
                                  <Popup>Selected Location</Popup>
                                </Marker>
                              )}
                            </MapContainer>
                          </Grid>
                        ) : (
                          <>
                            <Field
                              as={OutlinedInput}
                              id={fieldName}
                              type={'number'}
                              name={fieldName}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder={`Enter ${fieldName}`}
                              fullWidth
                              error={touched[fieldName] && Boolean(errors[fieldName])}
                            />
                            <ErrorMessage component={FormHelperText} name={fieldName} error id={`${fieldName}-helper-text`} />
                          </>
                        )}
                      </Stack>
                    </Grid>

                    {initialValues[fieldName].type === 'textArea' ? (
                      <Grid item xs={12}>
                        <>
                          <InputLabel htmlFor={fieldName}>{fieldName}</InputLabel>
                          <Field
                            as={OutlinedInput}
                            id={fieldName}
                            type={'text'}
                            name={fieldName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder={`Enter ${fieldName}`}
                            fullWidth
                            error={touched[fieldName] && Boolean(errors[fieldName])}
                          />
                          <ErrorMessage component={FormHelperText} name={fieldName} error id={`${fieldName}-helper-text`} />
                        </>
                      </Grid>
                    ) : null}
                  </>
                ))}

                {/* General form submission error */}
                {status && (
                  <Grid item xs={12}>
                    <FormHelperText error id="standard-weight-helper-text-submit">
                      {status}
                    </FormHelperText>
                  </Grid>
                )}
              </Grid>{' '}
              <Divider />
              <DialogActions>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth type="submit" variant="contained" color="primary">
                    {buttonName}
                  </Button>
                </AnimateButton>{' '}
                &nbsp; &nbsp; &nbsp;
                <Button onClick={handleClose} autoFocus variant="outlined">
                  Close
                </Button>
              </DialogActions>
            </Form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

export default GenericModal;
