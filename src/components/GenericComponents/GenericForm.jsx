/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { Button, Grid, InputLabel, OutlinedInput, Select, MenuItem, Stack, FormHelperText, TextField } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

const GenericForm = ({ initialValues, validationSchema, onSubmit, buttonName, inputsPerRow = 1 }) => {
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
  const handleOptionChange = (event, newValue) => {
    setSelectedOption(newValue);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, status, setFieldValue }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Render form fields dynamically */}
            {Object.keys(initialValues).map((fieldName) => (
              <Grid item xs={12 / inputsPerRow} key={fieldName}>
                <Stack spacing={1}>
                  <InputLabel htmlFor={fieldName}>{fieldName}</InputLabel>
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
                          setFieldValue(`${fieldName}.value`, event.target.files);
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
                        value={selectedOption}
                        onChange={(event, newValue) => {
                          console.log(newValue);
                          setSelectedOption(newValue);
                          setFieldValue(`${fieldName}.options`, newValue);
                        }}
                        options={initialValues[fieldName].options}
                        getOptionLabel={(option) => option.label}
                        renderTags={(tagValue, getTagProps) =>
                          tagValue.map((option, index) => <Chip label={option.label} key={index} {...getTagProps({ index })} />)
                        }
                        renderInput={(params) => <TextField {...params} label={` Select ${fieldName}`} placeholder={`${fieldName}`} />}
                      />
                    </Grid>
                  ) : null}
                </Stack>
              </Grid>
            ))}

            {/* Image Input */}

            {/* General form submission error */}
            {status && (
              <Grid item xs={12}>
                <FormHelperText error id="standard-weight-helper-text-submit">
                  {status}
                </FormHelperText>
              </Grid>
            )}

            {/* Submit button */}
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  {buttonName}
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </Form>
      )}
    />
  );
};

export default GenericForm;
