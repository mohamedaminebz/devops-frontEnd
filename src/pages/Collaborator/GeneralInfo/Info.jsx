/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Container, Box, Button, Stack, Typography, Card, CardContent, CardActions, Chip, IconButton, Grid } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import { FreeMode, Navigation } from 'swiper/modules';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import Loading from 'components/loading/Loading';
function Info({ data, isLoading }) {
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Typography variant="h4"> {data?.label}</Typography>
      <div style={{ width: '1000px', marginTop: 10 }}>
        <Swiper slidesPerView={3} spaceBetween={30} freeMode={true} modules={[FreeMode, Navigation]} className="mySwiper" navigation={true}>
          {data?.photos.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item}
                alt="space"
                width="95%"
                style={{
                  borderRadius: '5px',
                  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Stack direction="row" spacing={1} alignItems="center" mt={2}>
        <LocationOnIcon fontSize="small" />
        <Typography variant="h6">
          {data?.address.city}, {data?.address.zipCode}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" mt={2}>
        <EmailIcon fontSize="small" />
        <Typography variant="h6">{data?.email}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" mt={2}>
        <PhoneIcon fontSize="small" />
        <Typography variant="h6">{data?.phoneNumber}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" mt={2}>
        <CategorySharpIcon fontSize="small" />
        {data?.categories.map((item) => (
          <Typography key={item._id} variant="h6">
            {' '}
            {item.label},
          </Typography>
        ))}
      </Stack>

      <Stack direction="row" spacing={1} mt={2}>
        <DevicesOtherIcon fontSize="small" />
        <Typography variant="h6">{data?.amenities}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} mt={2}>
        <DescriptionIcon fontSize="small" />
        <Typography variant="h6">{data?.description}</Typography>
      </Stack>

      {data?.socialMediaLinks.facebook && (
        <Stack direction="row" spacing={1} mt={2}>
          <FacebookIcon fontSize="small" />
          <Typography variant="h6">{data?.socialMediaLinks.facebook}</Typography>
        </Stack>
      )}
      {data?.socialMediaLinks.instagram && (
        <Stack direction="row" spacing={1} mt={2}>
          <InstagramIcon fontSize="small" />
          <Typography variant="h6">{data?.socialMediaLinks.instagram}</Typography>
        </Stack>
      )}
    </div>
  );
}

export default Info;
