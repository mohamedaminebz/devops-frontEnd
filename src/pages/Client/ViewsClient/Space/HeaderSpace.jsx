/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import { Container, Stack, Button, Typography, Box, Divider } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function HeaderSpace({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [nextOpeningDay, setNextOpeningDay] = useState('');
  useEffect(() => {
    // Function to determine if the space is open or closed now
    const updateOpeningStatus = () => {
      const currentDay = new Date().getUTCDay();
      const currentHour = new Date().getUTCHours();
      const currentMinutes = new Date().getUTCMinutes();

      // Find the opening hours for the current day (if available)
      const todayOpeningHours = data?.openingHours.find((oh) => oh.day === currentDay);

      if (todayOpeningHours) {
        const { openingTime, closingTime, opened } = todayOpeningHours;
        const [openHour, openMinutes] = openingTime.split(':');
        const [closeHour, closeMinutes] = closingTime.split(':');

        // Check if the current time falls within the opening hours of the current day
        if (
          opened &&
          currentHour >= parseInt(openHour) &&
          currentHour < parseInt(closeHour) &&
          (currentHour !== parseInt(openHour) || currentMinutes >= parseInt(openMinutes)) &&
          (currentHour !== parseInt(closeHour) || currentMinutes < parseInt(closeMinutes))
        ) {
          setIsOpen(true);
          setOpenTime(openingTime);
          setCloseTime(closingTime);
          setNextOpeningDay('');
          return;
        }
      }

      // If not open now, find the next opening day and time
      let nextDayIndex = 1;
      while (nextDayIndex <= 7) {
        const nextDay = (currentDay + nextDayIndex) % 7;
        const nextOpeningHours = data?.openingHours.find((oh) => oh.day === nextDay);

        if (nextOpeningHours && nextOpeningHours.opened) {
          setIsOpen(false);
          setOpenTime(nextOpeningHours.openingTime);
          setCloseTime(nextOpeningHours.closingTime);
          setNextOpeningDay(getDayName(nextDay));
          return;
        }

        nextDayIndex++;
      }

      // If no valid opening hours found, consider it closed for the next week
      setIsOpen(false);
      setOpenTime('');
      setCloseTime('');
      setNextOpeningDay('');
    };

    updateOpeningStatus();
  }, [data]);
  // Function to get the localized name of the day
  // Function to get the localized name of the day
  const getDayName = (dayIndex) => {
    const options = { weekday: 'long' };
    const locale = navigator.language;
    const date = new Date();
    date.setDate(date.getDate() + dayIndex);
    return new Intl.DateTimeFormat(locale, options).format(date);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Swiper slidesPerView={3} spaceBetween={10} freeMode={true} modules={[FreeMode, Navigation]} className="mySwiper" navigation={true}>
        {data?.photos?.map((item) => (
          <SwiperSlide key={item._id}>
            <Box
              sx={{
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Adjust the shadow as needed
                borderRadius: 2, // Optional, to add rounded corners
                overflow: 'hidden' // Optional, to clip the shadow if using rounded corners
              }}
            >
              <img src={item} alt="spaceImage" height={350} />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Stack direction="row" spacing={1}>
        <LocationOnOutlinedIcon />
        <Typography variant="h5">
          {data?.address.city}, {data?.address.zipCode}
        </Typography>
      </Stack>
      <Stack direction="row" mt={1} spacing={1}>
        <AccessTimeIcon />
        <Typography variant="h5">
          {isOpen
            ? `Open now from ${openTime} to ${closeTime}`
            : nextOpeningDay
            ? `Closed, Opens on ${nextOpeningDay} from ${openTime} to ${closeTime}`
            : `Closed for the next week`}
        </Typography>
      </Stack>
      <div style={{ marginTop: 15 }} className="three-color-line"></div>
    </div>
  );
}

export default HeaderSpace;
