/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Stack,
  TextField,
  Divider,
  IconButton,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import categoriesServices from 'services/categoriesService';
import Toastfunction from 'functions/ToastFunction';
import { useMutation, useQueryClient } from 'react-query';

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: '#1890FF',
  color: 'white'
});

function NewCategoryModal({ Modal, handleClose }) {
  const { open } = Modal;
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);
  const queryClient = useQueryClient();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleAddSubCategory = () => {
    if (subCategory.trim() !== '') {
      setSubCategories([...subCategories, { label: subCategory }]);
      setSubCategory('');
      setSubCategoryError(false);
    }
  };

  const handleRemoveSubCategory = (index) => {
    const newSubCategories = [...subCategories];
    newSubCategories.splice(index, 1);
    setSubCategories(newSubCategories);
  };
  const handleAgree = () => {
    setCategoryError(false);
    setSubCategoryError(false);

    if (!category.trim()) {
      setCategoryError(true);
      return;
    }

    if (subCategories.length === 0 || subCategories.some((subCat) => !subCat.label.trim())) {
      setSubCategoryError(true);
      return;
    }

    const data = {
      label: category,
      subCategory: subCategories
    };

    categoriesServices
      .add(data)
      .then(() => {
        handleClose();
        Toastfunction.TaostSuccess('Category added succesfuly');
        queryClient.invalidateQueries('categoriesList');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogContent sx={{ width: '600px' }}>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={5} mt={1} mb={2}>
          <Box>
            <Typography variant="h5"> Name Category</Typography>
          </Box>
          <Box>
            <TextField
              id="category"
              label="Category"
              variant="outlined"
              size="small"
              value={category}
              onChange={handleCategoryChange}
              error={categoryError}
              helperText={categoryError ? 'Category cannot be empty' : ''}
            />
          </Box>
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={5} mt={1} mb={2}>
          <Box>
            <Typography variant="h5"> Sub_Categories</Typography>
          </Box>
          <Box flexGrow={1}>
            <TextField
              id="subCategory"
              label="SubCategory"
              variant="outlined"
              size="small"
              value={subCategory}
              onChange={handleSubCategoryChange}
              error={subCategoryError}
              helperText={subCategoryError ? 'Sub-category cannot be empty' : ''}
            />
          </Box>
          <Box>
            <IconButton color="primary" aria-label="add" onClick={handleAddSubCategory}>
              <AddCircleOutlinedIcon />
            </IconButton>
          </Box>
        </Stack>
        {subCategories.map((subCat, index) => (
          <Chip
            key={index}
            label={subCat.label}
            onDelete={() => handleRemoveSubCategory(index)}
            deleteIcon={<HighlightOffIcon />}
            color="primary"
            style={{ marginRight: 8, marginBottom: 8 }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="contained" onClick={handleAgree}>
          Agree
        </Button>
        <Button onClick={handleClose} autoFocus variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewCategoryModal;
