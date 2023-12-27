/* eslint-disable */
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import SwipeDownAltIcon from '@mui/icons-material/SwipeDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import * as Yup from 'yup';

import GenericModal from 'components/GenericComponents/GenericModal';
import { doMutation } from 'utils/mutation';
import { deleteService, makePromotion, resetPrice, updateService } from 'services/spaceService';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GenericDelete from 'components/GenericComponents/GenericDelete';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function ServiceList({ data, subCategoryList,id }) {

  const [selectedService, setselectedService] = useState(null);
  const [Modal, setModal] = useState({
    open: true,
    type: '',
    value: ''
  });

  // const id = '64c1a5c14acfdf100e0abd72';

  const AddModal = (service) => {
    setselectedService(service);
    setModal({ open: true, type: 'add', title: 'Update This Service ' });
  };

  const AddModalForPromotion = (service) => {
    setselectedService(service);
    setModal({ open: true, type: 'promotion', title: 'Make a Promotion to  This Service ' });
  };

  const handleClose = () => {
    setModal({ open: false });
  };
  //...........................................................................Mutations ......................................................................................

  const { mutate } = doMutation('Update Error Occured ', 'Service Updated successfully', 'servicePerSpace', (service) =>
    updateService(service)
  );
  const { mutate: resetMutation } = doMutation('Update Error Occured ', 'Original Price is Reset ', 'servicePerSpace', (service) =>
    resetPrice(service)
  );

  const { mutate: promotionMutation } = doMutation('Update Error Occured ', 'Promotion is no ON', 'servicePerSpace', (service) =>
    makePromotion(service)
  );

  const { mutate: deleteServiceMutation, isLoading: deleteServiceLoading } = doMutation(
    'oups something went wrong ! ',
    'Service deleted successfully',
    'servicePerSpace',
    (id) => deleteService(id)
  );
  //...........................................................................Mutations ......................................................................................
  const initialValues = {
    name: selectedService?.name,
    Category: { type: 'select', options: subCategoryList },
    duration: selectedService?.duration,
    price: selectedService?.price,
    description: selectedService?.description,
    photos: { type: 'image', value: [] }
    /* images: { type: 'image', value: [] } */
  };
  const initialValuesForPromotion = {
    PromotionPrice: 0
  };
  const buttonLabelForPromotion = 'Update';
  const inputsPerRowForPromotion = 1;
  const validationSchemaForPromotion = Yup.object().shape({
    PromotionPrice: Yup.string().max(255).required('PromotionPrice is required')
  });

  const buttonLabel = 'Update';
  const inputsPerRow = 2;
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required('name is required'),

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
      formdata.append('_id', selectedService._id);
      formdata.append('space', id);
      console.log(formdata);

      await mutate(formdata);
      handleClose()
    } catch (err) {
      console.log(err);
      setStatus(err?.message);
    } finally {
      setSubmitting(false);
    }
  };
  const handleSubmitForPromotion = async (values, { setSubmitting, setStatus }) => {
    try {
      const jsonObject = {
        serviceId: selectedService?._id,
        pricePromo: values.PromotionPrice
      };

      await promotionMutation(jsonObject);
      
    } catch (err) {
      console.log(err);
      setStatus(err?.message);
    } finally {
      setSubmitting(false);
    }
  };
  const resetPriceBtn = async (service) => {
    setselectedService(service);
    const jsonObject = {
      serviceId: selectedService?._id
    };
    await resetMutation(jsonObject);
  };

  return (
    <Grid container spacing={2}>
      {data?.map((service) => {
        const hasPromo = service?.promo;
        const originalPrice = service?.price;
        const promoPrice = service?.pricePromo;
        return (
          <Grid item xs={12} sm={6} md={4} key={service?._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      backgroundColor: '#00ADEF',
                      width: 56,
                      height: 56,
                      position: 'relative'
                    }}
                    aria-label="price"
                  >
                    <Typography
                      variant="body2"
                      color="text.white"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {hasPromo ? promoPrice : originalPrice}
                    </Typography>
                  </Avatar>
                }
                action={
                  hasPromo ? (
                    <Typography
                      variant="body2"
                      color="#1E3E79"
                      sx={{
                        textDecoration: 'line-through'
                      }}
                    >
                      {originalPrice}
                    </Typography>
                  ) : null
                }
                title={service?.name}
                subheader={`About ${service?.duration} min`}
              />
              <CardMedia component="img" height="194" image={service?.photo} alt={service?.photo} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {service?.description}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center', display: 'flex' }}>
                <IconButton aria-label="promo">
                  <SwipeDownAltIcon color="primary" onClick={() => AddModalForPromotion(service)} />
                </IconButton>

                <IconButton aria-label="edit">
                  <BorderColorIcon onClick={() => AddModal(service)} color="primary" />
                </IconButton>
                <GenericDelete
                  mutate={deleteServiceMutation}
                  loading={deleteServiceLoading}
                  header={`Service with name ${service?.name}`}
                  payload={service?._id}
                  
                />
                {service.promo && (
                  <IconButton aria-label="reset" onClick={() => resetPriceBtn(service)}>
                    <RestartAltIcon color="primary" />
                  </IconButton>
                )}
              </CardActions>
            </Card>

            {selectedService && Modal.type === 'add' && (
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

            {selectedService && Modal.type === 'promotion' && (
              <GenericModal
                initialValues={initialValuesForPromotion}
                validationSchema={validationSchemaForPromotion}
                onSubmit={handleSubmitForPromotion}
                buttonName={buttonLabelForPromotion}
                inputsPerRow={inputsPerRowForPromotion}
                Modal={Modal}
                handleClose={handleClose}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
