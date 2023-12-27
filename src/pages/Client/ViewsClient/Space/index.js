/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, Stack, Button, Typography, Box, Rating,IconButton } from '@mui/material';
import { useQuery } from 'react-query';
import { getById } from 'services/spaceServices';
import { useNavigate, useParams } from '../../../../../node_modules/react-router-dom/dist/index';
import HeaderSpace from './HeaderSpace';
import ServicesSpace from './ServicesSpace';
import { Reviews } from '../../../../../node_modules/@mui/icons-material/index';
import ReviewsSpace from './ReviewsSpace';
import About from './About';
import OpeningHours from './OpeningHours';
import AverageReview from './AverageReview';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { doMutation } from 'utils/mutation';
import { toggleFavorite } from 'services/spaceService';
function index() {
  const { id } = useParams();
  const { data: space, isLoading, error } = useQuery('spaceInfo', () => getById(id));
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isFavory, setIsFavory] = useState(user?.favories?.some(item => item ===id))

  


    const { mutate } = doMutation('Error Occured during adding the favorite space', 'Favorite is toggled  !', 'Myfavories', (favorite) =>
    toggleFavorite(favorite)
  );
    const toggleFavoriteBtn = async()=>{
      const  favorite = {
        userId : user._id,
        spaceId : id
      }
      await mutate(favorite)
      if(isFavory){
        setIsFavory(false)
      }
      else {
        //user.favories.push(id)
        setIsFavory(true)
      }
    }
  
  return (
    <Container sx={{ marginTop: 15 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h3"> {space?.label}</Typography>

        <Box flexGrow={1} />
        <IconButton aria-label="favorite" onClick={toggleFavoriteBtn}>
              {isFavory? <FavoriteIcon color ="error"/> :  <FavoriteBorderIcon  /> }
             
        </IconButton>

        <Button variant="contained" sx={{ backgroundColor: '#1E3E79' }} onClick={() => navigate(`/basket/${space?._id}`)}>
          Book Now
        </Button>
      </Stack>
      <AverageReview />
      <HeaderSpace data={space} />
      <ServicesSpace data={space} />
      <ReviewsSpace data={space} />
      <About data={space} />
      <OpeningHours data={space} />
    </Container>
  );
}

export default index;
