/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// @mui
import { Typography, Container, Button, Grid, Box, Avatar, TextField, Stack } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import Loading from 'components/loading/Loading';
import authService from 'services/authServices';
import Toastfunction from 'functions/ToastFunction';

export default function index() {
  const { user, errorPasswordProfile, succesPSW, succesProfile, loading } = useSelector((state) => state.auth);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [Update, setUpdate] = useState({
    password: '',
    oldpassword: '',
    confpassword: ''
  });

  const [UpdateInfo, setUpdateInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  });
  const [errorConform, seterrorConform] = useState(false);
  const [errorValid, seterrorValid] = useState(false);

  const handleChangepassword = (e) => {
    setUpdate({ ...Update, [e.target.name]: e.target.value });
  };
  const handleChangeInfo = (e) => {
    setUpdateInfo({ ...UpdateInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterrorConform(false);
    seterrorValid(false);
    if (Update.password.length < 7) {
      seterrorValid(true);
    } else if (Update.password !== Update.confpassword) {
      seterrorConform(true);
    } else {
      try {
        await authService.changePassword(Update);
        Toastfunction.TaostSuccess('Password updated succesfully');
      } catch (error) {
        Toastfunction.ToastError(error);
      }
    }
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();

    try {
      await authService.updateProfile(UpdateInfo);
      Toastfunction.TaostSuccess('Profile updated succesfully');
    } catch (error) {
      Toastfunction.ToastError(error);
    }
  };

  useEffect(() => {
    if (succesPSW) {
      setUpdate({ password: '', oldpassword: '', confpassword: '' });
    } else if (succesProfile) {
      setUpdateInfo({ firstName: '', lastName: '', phoneNumber: '', address: '' });
    }
    if (user) {
      setUpdateInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address
      });
    }
  }, [succesPSW, user, succesProfile]);

  return (
    <Container className="container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Profile
            </Typography>
          </>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={5}>
              <Grid
                sx={{
                  //border: '1px solid #1E3E79'
                  boxShadow: 2
                }}
                container
                direction="column"
                className="  rounded shadow-lg m-1"
              >
                <Grid
                  className="pt-4 rounded"
                  item
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#1E3E79',
                    border: '1px solid black'
                  }}
                >
                  <Avatar
                    src={user?.profilImage}
                    alt="User Image"
                    style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      top: 50
                    }}
                  />
                </Grid>
                <Grid
                  item
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50
                  }}
                >
                  <Typography variant="h5">
                    <strong>
                      {user?.firstName} {user?.lastName}{' '}
                    </strong>
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    height: 200,
                    marginTop: 3
                  }}
                >
                  {' '}
                  <Stack direction="row" alignItems="center">
                    <AssignmentIndIcon />
                    <Typography variant="body1" m={1}>
                      {' '}
                      <span style={{ margin: 4 }}> {user?.role}</span>
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <AlternateEmailIcon />
                    <Typography variant="body1" m={1}>
                      {' '}
                      <span style={{ margin: 4 }}> {user?.email}</span>
                    </Typography>
                  </Stack>{' '}
                  <Stack direction="row" alignItems="center">
                    <PhoneIcon />
                    <Typography variant="body1" m={1}>
                      {' '}
                      <span style={{ margin: 4 }}> {user?.phoneNumber}</span>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={7}>
              {/* Colonne de droite : informations spécifiques */}
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                          <Tab label="Modifier information générale" value="1" />
                          <Tab label="Modifier mot de passe" value="2" />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <form onSubmit={(e) => handleSubmitInfo(e)}>
                          <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            label="firstName"
                            variant="outlined"
                            size="small"
                            name="firstName"
                            value={UpdateInfo.firstName}
                            onChange={handleChangeInfo}
                          />{' '}
                          <br />
                          <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            label="lastName"
                            variant="outlined"
                            size="small"
                            name="lastName"
                            value={UpdateInfo.lastName}
                            onChange={handleChangeInfo}
                          />
                          <br />
                          <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            label="Numéro télephone"
                            variant="outlined"
                            size="small"
                            name="phoneNumber"
                            value={UpdateInfo.phoneNumber}
                            onChange={handleChangeInfo}
                          />{' '}
                          <br />
                          <TextField
                            sx={{ m: 1 }}
                            id="outlined-basic"
                            label="Address"
                            variant="outlined"
                            size="small"
                            name="address"
                            value={UpdateInfo.address}
                            onChange={handleChangeInfo}
                          />{' '}
                          <br />
                          <Button variant="contained" type="submit" sx={{ m: 1 }}>
                            Save
                          </Button>{' '}
                        </form>
                      </TabPanel>
                      <TabPanel value="2">
                        <form onSubmit={(e) => handleSubmit(e)}>
                          <TextField
                            sx={{ m: 1 }}
                            label="Mot de passe actuel "
                            required
                            name="oldpassword"
                            type="password"
                            variant="outlined"
                            size="small"
                            value={Update.oldpassword}
                            onChange={handleChangepassword}
                            error={errorPasswordProfile}
                            helperText={errorPasswordProfile ? 'Mot de passe  incorrecte  ' : ''}
                          />{' '}
                          <br />
                          <TextField
                            sx={{ m: 1 }}
                            label="Nouveau mot de passe  "
                            required
                            name="password"
                            type="password"
                            variant="outlined"
                            size="small"
                            value={Update.password}
                            onChange={handleChangepassword}
                            error={errorValid}
                            helperText={errorValid ? 'Mot de passe doit être au minimum 7 caractères ' : ''}
                          />
                          <br />
                          <TextField
                            sx={{ m: 1 }}
                            label="Confirmer nouveau mot de passe  "
                            required
                            name="confpassword"
                            type="password"
                            variant="outlined"
                            size="small"
                            value={Update.confpassword}
                            onChange={handleChangepassword}
                            error={errorConform}
                            helperText={errorConform ? ' Mot de passe non  conforme ' : ''}
                          />{' '}
                          <br />
                          <Button autoFocus variant="contained" type="submit" sx={{ m: 1 }}>
                            Save
                          </Button>{' '}
                        </form>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
