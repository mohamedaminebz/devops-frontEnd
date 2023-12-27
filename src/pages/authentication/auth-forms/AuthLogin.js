/* eslint-disable no-unused-vars */
import React from 'react';

// material-ui
import { Stack, Checkbox, Divider, FormControlLabel, Grid, Link, Typography } from '@mui/material';
// third party
import * as Yup from 'yup';

// project import
import FirebaseSocial from './FirebaseSocial';

// assets
import GenericForm from 'components/GenericComponents/GenericForm';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Login } from 'store/feature/authSlice';
import { useNavigate } from 'react-router-dom';
import { roles } from 'utils/roles';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: 'ganikas@gmail.com',
    password: '123'
    // images: { type: 'image', value: [] },

    // multiselect: { type: 'multiselect', options: ['Inception', 'The Dark Knight', 'Forrest Gump', 'Pulp Fiction'] } // Example options for selectedMovies

    /*   role: { type: 'select', options: ['Admin', 'User', 'Guest'] },
    birthDate: { type: 'date' } */
  };
  const buttonLabel = 'Login';
  const inputsPerRow = 1;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const user = await dispatch(Login(values)).unwrap();
      if (user.data.role == roles.ADMIN) {
        navigate('/dashboard');
      } else if (user.data.role == roles.CLIENT) {
        navigate('/home');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
      setStatus(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <GenericForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        buttonName={buttonLabel}
        inputsPerRow={inputsPerRow}
      />

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <FormControlLabel
            control={
              <Checkbox
                // checked={checked}
                //    onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
                size="small"
              />
            }
            label={<Typography variant="h6">Keep me sign in</Typography>}
          />
          <Link variant="h6" component={RouterLink} to="" color="text.primary">
            Forgot Password?
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Divider>
          <Typography variant="caption"> Login with</Typography>
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <FirebaseSocial />
      </Grid>
    </>
  );
};

export default AuthLogin;
