/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import { Container, Stack, Button, Typography, Box, Divider, Tab, Grid, Avatar, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { addReview, checkuserReviewBySpace, getReviewsByIdSpace } from 'services/reviewServices';
import { fDate } from 'functions/formatTime';
import TextField from '@mui/material/TextField';
import SuccessModal from 'components/Success/successModal';

import { useSelector } from 'react-redux';
import SendIcon from '@mui/icons-material/Send';
import { doMutationClient } from 'utils/mutation';
function ReviewsSpace({ data }) {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: reviews, isLoading, error } = useQuery('reviews', () => getReviewsByIdSpace(id));
  const { data: checkReview } = useQuery('checkReview', () => checkuserReviewBySpace(id));

  const [showAll, setShowAll] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const { mutate, isSuccess, show } = doMutationClient('Error message if any', 'reviews', (data) => addReview(data));
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const data = {
      comment,
      rating
    };
    await mutate({ _id: id, newData: data });
  };
  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries('checkReview');
      setComment('');
      setRating(0);
    }
  }, [isSuccess, queryClient]);
  const visibleReviews = showAll ? reviews?.reviews : reviews?.reviews?.slice(0, 6);
  return (
    <div style={{ marginTop: 15 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        Reviews &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Typography>
      <Grid container spacing={2} px={5}>
        {visibleReviews?.map((review) => (
          <>
            <Grid item key={review._id} xs={12} sm={12} md={12}>
              <Box
                sx={{
                  // boxShadow: 1,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  borderBottom: '0.5px solid #e8e8e8'
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {' '}
                  <Avatar sx={{ bgcolor: '#00ADEF', fontSize: 15 }} alt="Remy Sharp">
                    {review.user.firstName[0]}
                    {review.user.lastName[0]}
                  </Avatar>
                  <Stack direction="column">
                    <Typography variant="h6" mt={1}>
                      {review.user.firstName} {review.user.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {fDate(review.date)}
                    </Typography>
                  </Stack>
                </Stack>

                <Box mt={1}>
                  <Rating value={review.rating} readOnly />
                </Box>
                <Typography variant="body1">{review.comment}</Typography>
              </Box>
            </Grid>
          </>
        ))}
        {checkReview === false && (
          <Grid item xs={12} sm={12} md={12} p={2}>
            <form onSubmit={(e) => handleCommentSubmit(e)}>
              <Box
                sx={{
                  boxShadow: 1,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {' '}
                  <Avatar size="small" sx={{ bgcolor: '#00ADEF' }} src={user?.profilImage}></Avatar>
                  <Stack direction="column">
                    <Typography variant="h6" mt={1}>
                      {user?.firstName} {user?.lastName}
                    </Typography>
                  </Stack>
                </Stack>
                <Box mt={1}>
                  <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} readOnly={false} required />{' '}
                </Box>
                <Stack direction="row" alignItems="center">
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Write Your Comment Here"
                    size="small"
                    color="primary"
                    focused
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />{' '}
                  <IconButton aria-label="delete" size="large" type="submit">
                    <SendIcon fontSize="inherit" sx={{ color: '#00ADEF' }} />
                  </IconButton>
                </Stack>
              </Box>
            </form>
          </Grid>
        )}
      </Grid>
      {!showAll && reviews?.reviews?.length > 6 && (
        <Button variant="outlined" onClick={() => setShowAll(true)} sx={{ mt: 2 }}>
          See All
        </Button>
      )}
      {showAll && (
        <Button variant="outlined" onClick={() => setShowAll(false)} sx={{ mt: 2 }}>
          Show Less
        </Button>
      )}
      {isSuccess && <SuccessModal show={show} title="Review Added Succesfully " />}
    </div>
  );
}

export default ReviewsSpace;
