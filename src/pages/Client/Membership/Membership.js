/* eslint-disable */
import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import image from './trans.png';
import GenericModal from 'components/GenericComponents/GenericModal';
import { doMutationClient } from 'utils/mutation';
import { createMembership } from 'services/clientService';
import SuccessModal from 'components/Success/successModal';

export default function Membership() {
  const [Modal, setModal] = useState({
    open: true,
    type: '',
    value: ''
  });
  const { mutate, isSuccess, show } = doMutationClient('Error Occured ', 'servicePerSpace', (service) => createMembership(service));

  const AddModal = (row) => {
    setModal({ open: true, type: 'Add', title: 'Create new Service ' });
  };
  const handleClose = () => {
    setModal({ open: false });
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    city: '',
    spaceName: '',
    phoneNumber: '',
    zipCode: ''
  };
  const buttonLabel = 'create';
  const inputsPerRow = 3;
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const formdata = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        service: values.service,
        addressSpace: {
          city: values.city,
          zipCode: values.zipCode
        },
        spaceName: values.spaceName,
        phoneNumber: values.phoneNumber
      };

      await mutate(formdata);
      handleClose();
    } catch (err) {
      console.log(err);
      setStatus(err?.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        width: '100%',
        height: '750px',
        backgroundSize: 'cover',
        marginTop: '-15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        padding: '0px', // Adjust padding as needed
        color: 'black',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        align="justify"
        sx={{ color: 'white', marginBottom: '50px', opacity: 1, fontSize: '45px', maxWidth: '100vh' }}
      >
        Get new clients and manage your salon…
        <br />
        At your fingertips!
      </Typography>
      <Typography
        variant="body1"
        align="justify"
        sx={{
          color: 'white',
          marginBottom: '100',
          opacity: 1,
          fontSize: '25px',
          maxWidth: '120vh',
          textAlign: 'left',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        }}
      >
        Over 50,000 beauty professionals have already chosen Treatwell. Join our community, say goodbye to administrative tasks and focus on
        what really matters your customers.
      </Typography>
      <br />
      <br />
      <br />
      <Button variant="contained" color="primary" style={{ opacity: 1 }} onClick={AddModal}>
        Membership Demande
      </Button>
      {isSuccess && <SuccessModal show={show} title={'Membership Request is sended, We ll reply within 7 days'} />}
      {Modal.type === 'Add' && (
        <GenericModal
          initialValues={initialValues}
          //validationSchema={validationSchema}
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
