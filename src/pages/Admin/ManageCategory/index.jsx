/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Container,
  Box,
  Button,
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SearchIcon from '@mui/icons-material/Search';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CardCategory from './CardCategory';
import { useQuery } from 'react-query';
import categoriesServices from 'services/categoriesService';
import NewCategoryModal from './Modals/NewCategoryModal';
import EditModal from './Modals/EditModal';

function index() {
  const { data: categories, isLoading, isError, error } = useQuery('categoriesList', categoriesServices.getAll);
  const [searchQuery, setSearchQuery] = useState('');
  const [Modal, setModal] = useState({
    open: false,
    type: '',
    value: categories?.data
  });
  const AddModal = (row) => {
    setModal({ open: true, type: 'Add' });
  };
  const handleClose = () => {
    setModal({ open: false });
  };
  const filteredCategories = categories?.data?.filter((data) => data.label.toLowerCase().includes(searchQuery.toLowerCase())) || [];
  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={2}>
        <Box flexGrow={1}>
          <Typography variant="h4"> Categories</Typography>
        </Box>
        <Box mr={2}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Search here</InputLabel>
            <OutlinedInput
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </Box>
        <Box>
          <Button variant="contained" startIcon={<AddCircleOutlineRoundedIcon />} onClick={() => AddModal()}>
            Add New category
          </Button>
        </Box>
      </Stack>
      <Grid container spacing={2}>
        {filteredCategories.map((data) => (
          <Grid key={data._id} item xs={12} sm={6} md={3}>
            <CardCategory data={data} />
          </Grid>
        ))}
      </Grid>
      {Modal.type === 'Add' && <NewCategoryModal Modal={Modal} handleClose={handleClose} />}
    </div>
  );
}

export default index;
