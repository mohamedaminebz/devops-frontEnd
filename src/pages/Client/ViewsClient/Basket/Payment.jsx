/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignUpIn from './SignUpIn';
import FormPay from './FormPay';
import { GetUserByToken } from '../../../../store/feature/authSlice';

function Payment({ handleChange, PaymentInfo, handleSubmit }) {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /*   useEffect(() => {
    dispatch(GetUserByToken());
  }, [loading, isLoggedIn]); */
  if (loading) {
    return <div> loading</div>;
  } else
    return (
      <div>
        {' '}
        {isLoggedIn ? <FormPay handleChange={handleChange} PaymentInfo={PaymentInfo} handleSubmit={handleSubmit} /> : <SignUpIn />}
      </div>
    );
}

export default Payment;
