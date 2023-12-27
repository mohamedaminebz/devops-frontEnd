/* eslint-disable */
import {
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  TextField,
  Box,
  InputAdornment,
  CircularProgress,
  Backdrop,
  AlertTitle,
  Alert
} from '@mui/material';
import ServiceList from './ServiceList';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';
import { createService, fetchServicesPerSpace, fetchSpaceById } from 'services/spaceService';
import * as Yup from 'yup';
import { useState } from 'react';
import GenericModal from 'components/GenericComponents/GenericModal';
import { doMutation } from 'utils/mutation';
import categoriesServices from 'services/categoriesService';
import { useSelector } from 'react-redux';
export default function ServicePage() {
  const [Modal, setModal] = useState({
    open: true,
    type: '',
    value: ''
  });
  const { user } = useSelector((state) => state.auth);
  console.log("User",user)
  const { mutate } = doMutation('Error Occured ', 'Service added successfully', 'servicePerSpace', (service) => createService(service));



    const id =user?.spaceID

    const {data,isLoading,error} = useQuery("servicePerSpace",()=>fetchServicesPerSpace(id))
    const {data:subCategoryList} = useQuery("subCategoryPerSpace",()=>categoriesServices.fetchActiveSubCategoriesForSpace(id))
    
    if (isLoading){
        return<CircularProgress color="inherit" style ={{position:"fixed",top:"35%" ,left:"50%"}} />
    }

  if (error) {
    <Alert severity="error">
      <AlertTitle>Error is Accured</AlertTitle>
      {error?.message}
    </Alert>;
  }
  const AddModal = (row) => {
    setModal({ open: true, type: 'Add', title: 'Create new Service ' });
  };
  const handleClose = () => {
    setModal({ open: false });
  };

  const initialValues = {
    name: '',
    Category: { type: 'select', options: subCategoryList },
    duration: 0,
    price: 0,
    description: '',
    photos: { type: 'image', value: [] }
    /* images: { type: 'image', value: [] } */
  };
  const buttonLabel = 'create';
  const inputsPerRow = 2;
  const validationSchema = Yup.object().shape({
    price: Yup.string().max(255).required('price is required')
  });
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const formdata = new FormData();
      formdata.append('price', values.price);
      formdata.append('duration', values.duration);
      formdata.append('description', values.description);
      formdata.append('name', values.name);
      formdata.append('file', values.photos.value[0]);
      formdata.append('space', id);
      formdata.append('Category', values.Category);
      console.log(formdata);

      await mutate(formdata);
    } catch (err) {
      console.log(err);
      setStatus(err?.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Services
          </Typography>
        </Stack>

        {
          <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                  id="input-with-sx"
                  label=""
                  variant="outlined"
                  placeholder="Find a service"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </div>

            <Button variant="contained" color="primary" onClick={AddModal}>
              Create a Service
            </Button>
          </Stack>
        }
        <br />

         {data?.services && subCategoryList &&<ServiceList data ={data?.services} subCategoryList={subCategoryList} id ={id}/>} 
      </Container>
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
    </div>
  );
}
