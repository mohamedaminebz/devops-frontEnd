/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getReviewsByIdSpace } from 'services/reviewServices';

import { Container, Stack, Button, Typography, Box, Rating, Skeleton } from '@mui/material';

function AverageReview({ data }) {
  const { id } = useParams();
  const idSpace = data ? data : id;
  const { data: reviews, isLoading, error } = useQuery('reviews', () => getReviewsByIdSpace(idSpace));
  const [averageRating, setAverageRating] = useState(null); // Use null as an initial value

  useEffect(() => {
    if (reviews?.reviews?.length === 0) {
      setAverageRating(0);
      return;
    }

    let totalRatings = 0;
    reviews?.reviews?.forEach((item) => {
      totalRatings += item.rating;
    });
    const mean = totalRatings / reviews?.reviews?.length;
    setAverageRating(mean);
  }, [reviews]);

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {isLoading ? (
        <Skeleton variant="text" width={300} animation="wave" />
      ) : data ? (
        <Typography variant="h5" sx={{ color: '#FAAF00', fontWeight: 'bold' }}>
          {averageRating}
        </Typography>
      ) : (
        <Typography variant="h3" sx={{ color: '#FAAF00', fontWeight: 'bold' }}>
          {averageRating}
        </Typography>
      )}
      {!isLoading && data ? (
        <Rating name="size-small" value={averageRating} precision={0.25} size="small" />
      ) : (
        <Rating name="size-small" value={averageRating} precision={0.25} size="large" />
      )}
      {!isLoading && data ? (
        <Typography variant="h6" sx={{ color: '#1E3E79', fontWeight: 'bold' }}>
          {reviews?.reviews?.length} avis
        </Typography>
      ) : (
        <Typography variant="h5" sx={{ color: '#1E3E79', fontWeight: 'bold' }}>
          {reviews?.reviews?.length} avis
        </Typography>
      )}
    </Stack>
  );
}

export default AverageReview;
