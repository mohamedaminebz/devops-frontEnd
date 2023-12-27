/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import { roles } from 'utils/roles';
import GenericModal from 'components/GenericComponents/GenericModal';
import { useQuery } from 'react-query';
import categoriesServices from 'services/categoriesService';
import { add, update } from 'services/spaceServices';
import * as Yup from 'yup';
import { doMutation } from 'utils/mutation';
import Info from './Info';
import { getById } from 'services/spaceServices';
import OpeningHoursModal from './OpeningHoursModal';

const StyledIconButton = styled(IconButton)({
  boxShadow: '0px 4px 6px gray',
  transition: 'transform 0.5s ease-out',
  color: '#0050b3',
  '&:hover': {
    transform: 'scale(1.1)'
  }
});

function index() {
  const { user, loading } = useSelector((state) => state.auth);
  const { data } = useQuery('spaceInfo', () => getById(user?.spaceID));

  ////// ********************* Generiic Modal Add
  const [Modal, setModal] = useState({
    open: false,
    type: '',
    value: ''
  });
  const AddModal = () => {
    setModal({ open: true, type: 'Add', title: 'Add Your Space' });
  };
  const handleClose = () => {
    setModal({ open: false });
  };

  const { data: categoriesList, isLoading } = useQuery('categoriesList', categoriesServices.getAll);

  const initialValues = {
    label: '',
    email: '',
    phoneNumber: '',
    city: '',
    zipCode: '',
    description: '',
    instagram: '',
    facebook: '',
    amenities: '',
    categories: { type: 'multiselect', options: categoriesList?.data },
    photos: { type: 'image', value: [] },
    localisation: {
      type: 'map',
      latitude: 33.892166,
      longitude: 9.561555
    }
  };
  const buttonLabel = 'Agree';
  const inputsPerRow = 2;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    label: Yup.string().max(255).required('Label is required')
  });
  const { mutate, error, success } = doMutation('Error message if any', 'Space added successfully', '', (data) => add(data), handleClose);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      console.log(values);
      const formData = new FormData();
      formData.append('label', values.label);
      formData.append('email', values.email);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('description', values.description);
      formData.append('address[city]', values.city);
      formData.append('address[zipCode]', values.zipCode);
      formData.append('socialMediaLinks[instagram]', values.instagram);
      formData.append('socialMediaLinks[facebook]', values.facebook);
      formData.append(`amenities`, values.amenities);
      formData.append('GPS[lat]', values.localisation.latitude);
      formData.append('GPS[lng]', values.localisation.longitude);

      values.categories.options.forEach((item, index) => {
        formData.append(`categories[${index}]`, item.label);
      });

      const photosArray = Array.from(values.photos.value);
      photosArray.forEach((photo, index) => {
        formData.append(`photos`, photo);
      });
      //   await mutate(formData);
    } catch (err) {
      setStatus(err);
    } finally {
      setSubmitting(false);
    }
  };

  ////// ********************* Generiic Modal Edit
  const EditModal = () => {
    setModal({ open: true, type: 'Edit', title: 'Edit Your Space' });
  };
  const formattedCategoriesOptions = categoriesList?.data.map((category) => ({
    label: category.label,
    value: category._id
  }));
  const initialValuesEdit = {
    label: data?.label,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
    city: data?.address.city,
    zipCode: data?.address.zipCode,
    description: data?.description,
    instagram: data?.socialMediaLinks.instagram,
    facebook: data?.socialMediaLinks.facebook,
    amenities: data?.amenities,
    categories: { type: 'multiselect', options: formattedCategoriesOptions, defaultOptions: data?.categories }
  };

  const { mutate: mutateEdit } = doMutation(
    'Error message if any',
    'Space updated successfully',
    'spaceInfo',
    (data) => update(data),
    handleClose
  );

  const handleSubmitEdit = async (values, { setSubmitting, setStatus }) => {
    try {
      console.log(values);
      const d = {
        label: values.label,
        email: values.email,
        phoneNumber: values.phoneNumber,
        description: values.description,
        address: {
          city: values.city,
          zipCode: values.zipCode
        },
        socialMediaLinks: {
          instagram: values.instagram,
          facebook: values.facebook
        },
        amenities: values.amenities,
        categories: [values.categories?.defaultOptions]
      };
      console.log(values.categories.defaultOptions);

      await mutateEdit({ _id: user?.spaceID, newData: values });
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  ////// *********************  Modal OpeningHours
  const OpeningHours = () => {
    setModal({ open: true, type: 'OpeningHours' });
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={2}>
        <Box flexGrow={1}>
          <Typography variant="h4"> General Information</Typography>
        </Box>

        {user && user.role === roles.COLLABORATOR && !user.space ? (
          <Box mr={2}>
            {' '}
            <Tooltip title="Add Your Space">
              <span>
                <StyledIconButton
                  onClick={() => AddModal()}
                  aria-label="Edit Opening Hours"
                  sx={{
                    backgroundColor: '#0050b3',
                    color: 'white',
                    '&:hover': {
                      color: '#0050b3'
                    }
                  }}
                >
                  <AddIcon />
                </StyledIconButton>{' '}
              </span>
            </Tooltip>
          </Box>
        ) : (
          ''
        )}

        <Box mr={2}>
          <Tooltip title="Preview Space">
            <span>
              <StyledIconButton aria-label="Edit Opening Hours">
                <RemoveRedEyeIcon />
              </StyledIconButton>
            </span>
          </Tooltip>
        </Box>
        <Box mr={2}>
          <Tooltip title="Edit Opening Hours">
            <span>
              <StyledIconButton aria-label="Edit Opening Hours" onClick={() => OpeningHours()}>
                <CalendarMonthIcon />
              </StyledIconButton>{' '}
            </span>
          </Tooltip>
        </Box>
        <Box mr={2}>
          <Tooltip title="Edit Information">
            <span>
              <StyledIconButton aria-label="Edit info" onClick={() => EditModal()}>
                <EditIcon />
              </StyledIconButton>{' '}
            </span>
          </Tooltip>
        </Box>
      </Stack>

      <Info data={data} isLoading={isLoading} />
      {Modal.type === 'Add' && (
        <GenericModal
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          buttonName={buttonLabel}
          inputsPerRow={inputsPerRow}
          Modal={Modal}
          handleClose={handleClose}
        />
      )}
      {Modal.type === 'Edit' && (
        <GenericModal
          initialValues={initialValuesEdit}
          validationSchema={validationSchema}
          onSubmit={handleSubmitEdit}
          buttonName={buttonLabel}
          inputsPerRow={inputsPerRow}
          Modal={Modal}
          handleClose={handleClose}
        />
      )}
      {Modal.type === 'OpeningHours' && <OpeningHoursModal Modal={Modal} handleClose={handleClose} data={data} />}
    </div>
  );
}

export default index;
