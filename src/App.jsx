/* eslint-disable no-unused-vars */
// project import
import React, { useEffect } from 'react';
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import CustomToaster from 'utils/CustomToaster';
import { GetUserByToken } from 'store/feature/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import './themes/Style.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import Loading from 'components/loading/Loading';
import Loader from 'components/Loader';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUserByToken());
  }, [dispatch]);

  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeCustomization>
      <CustomToaster />
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
