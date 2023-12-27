/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button, Grid, Container, Stack } from '@mui/material';

import Services from './Services';
import Basket from './Basket';
import Typography from 'pages/Client/components/Typography';
import { getById } from 'services/spaceServices';
import DatePicker from './DatePicker';
import Payment from './Payment';
import { doMutationClient } from 'utils/mutation';
import { addReservation } from 'services/reservationService';
import SuccessModal from 'components/Success/successModal';
import { useNavigate } from 'react-router-dom';

const steps = ['Step One', 'Step Two', 'Step Three'];

const index = () => {
  const { id } = useParams();
  const { data: space } = useQuery('spaceInfo', () => getById(id));
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  /******** Services component  */

  const [selectedServices, setSelectedServices] = useState(() => {
    const storedSelectedServices = localStorage.getItem('selectedServices');
    return storedSelectedServices ? JSON.parse(storedSelectedServices) : [];
  });
  const handleServiceSelection = (service) => {
    setSelectedServices((prevSelectedServices) => {
      const updatedServices = prevSelectedServices.some((item) => item._id === service._id)
        ? prevSelectedServices.filter((item) => item._id !== service._id)
        : [...prevSelectedServices, service];
      localStorage.setItem('selectedServices', JSON.stringify(updatedServices));

      return updatedServices;
    });
  };

  //****************** Date Picker  */
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (timeSlot) => {
    setSelectedTime(timeSlot);

    let selectedDateTime = new Date(selectedDate);
    const [hours, minutes] = timeSlot.split(':');
    selectedDateTime.setHours(parseInt(hours), parseInt(minutes));
    setSelectedDateTime(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(hours), parseInt(minutes))
    );
  };
  //******** Form  */
  const [PaymentInfo, setPaymentInfo] = useState({
    numCard: 0,
    expire: '',
    code: 0,
    paymentMethod: ''
  });

  const handleChange = (event) => {
    setPaymentInfo({
      ...PaymentInfo,
      [event.target.name]: event.target.value
    });
  };
  const { mutate, isSuccess, show } = doMutationClient('Error message if any', '', (data) => addReservation(data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reservationData = {
      startTime: {
        year: selectedDateTime.getFullYear(),
        month: selectedDateTime.getMonth(),
        day: selectedDateTime.getDate(),
        hours: selectedDateTime.getHours(),
        min: selectedDateTime.getMinutes()
      },
      paymentMethod: PaymentInfo.paymentMethod,
      numCard: PaymentInfo.numCard,
      expire: PaymentInfo.expire,
      code: PaymentInfo.code,
      services: selectedServices
    };
    await mutate({ _id: space._id, newData: reservationData });
  };
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/home');
        localStorage.removeItem('selectedServices');
      }, 5000);
    }
  }, [isSuccess]);

  //******* Steps  */
  const handleNext = () => {
    if ((activeStep === 0 && selectedServices.length === 0) || (activeStep === 1 && (selectedTime === null || selectedDate === null))) {
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Services selectedServices={selectedServices} onServiceSelect={handleServiceSelection} />;
      case 1:
        return (
          <DatePicker
            handleTimeSelect={handleTimeSelect}
            handleDateChange={handleDateChange}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            space={space}
          />
        );
      case 2: {
        return <Payment handleSubmit={handleSubmit} handleChange={handleChange} PaymentInfo={PaymentInfo} />;
      }

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={7} mr={4}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h3">
              Step {activeStep + 1} of {steps.length}
            </Typography>
            <div style={{ flexGrow: 1 }}>{/* Empty div to take remaining space */}</div>
            {activeStep !== 0 && (
              <Button onClick={handleBack} style={{ marginRight: '10px' }}>
                Back
              </Button>
            )}
            {activeStep !== steps.length - 1 ? (
              <Button
                variant="outlined"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && selectedServices.length === 0) ||
                  (activeStep === 1 && (selectedTime === null || selectedDate === null))
                }
              >
                Next
              </Button>
            ) : (
              <Button variant="outlined" disabled>
                Finish
              </Button>
            )}
          </Stack>
          <Stack mt={5}>
            {activeStep === 0 ? (
              <Typography variant="h3">Select Service</Typography>
            ) : activeStep === 1 ? (
              <Typography variant="h3">Select the start time of your appointment</Typography>
            ) : activeStep === 2 ? (
              <Typography variant="h3">Payment</Typography>
            ) : (
              ''
            )}
          </Stack>
          <div style={{ marginTop: '20px' }}>{getStepContent(activeStep)}</div>
        </Grid>
        <Grid item xs={12} md={3}>
          <Basket data={space} selectedServices={selectedServices} />{' '}
        </Grid>
      </Grid>
      {isSuccess && <SuccessModal show={show} title="Reservation Added Succesfully " />}
    </Container>
  );
};

export default index;
