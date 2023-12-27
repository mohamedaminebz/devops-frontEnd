/* eslint-disable no-unused-vars */
import React from 'react';
import Typography from '../../components/Typography';
import { Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';

import { Card, CardContent, CardMedia, Stack, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { getAll } from 'services/spaceServices';
import { useNavigate } from 'react-router-dom';

const CustomCard = styled(Card)({
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  maxWidth: 300,
  margin: 'auto',
  marginTop: 5,
  marginBottom: 5,
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer'
});

const CustomCardMedia = styled(CardMedia)({
  paddingTop: '56.25%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)'
  }
});

const CustomCardContent = styled(CardContent)({
  textAlign: 'left'
});

function Recomended() {
  const navigate = useNavigate();

  const { data: spaceList, isLoading, error } = useQuery('spaceList', () => getAll().then((r) => r.data));

  if (isLoading) {
    return <h1> is loading </h1>;
  }
  const handleNavigate = (id) => {
    navigate(`/space/${id}`);
  };
  return (
    <Container style={{ marginTop: 90 }}>
      <Typography variant="h4" marked="center" align="center" component="h4">
        Recommended
      </Typography>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper"
        navigation={true}
        breakpoints={{
          960: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }}
      >
        {spaceList?.map((item) => (
          <SwiperSlide key={item._id}>
            <CustomCard onClick={() => handleNavigate(item._id)}>
              <CustomCardMedia image={item.photos[0]} title="Photo Title" />
              <CustomCardContent>
                <Typography variant="h5" component="h2">
                  {item.label}
                </Typography>
                <Typography color="textSecondary">Number of Ratings: 5</Typography>
                <Typography color="textSecondary"> {item.address.city}</Typography>
                <Stack direction="row" spacing={1}>
                  {item.categories.map((c) => (
                    <Chip key={c._id} label={c.label} variant="outlined" />
                  ))}
                </Stack>
              </CustomCardContent>
            </CustomCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default Recomended;
