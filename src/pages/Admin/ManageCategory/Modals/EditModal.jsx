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
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import categoriesServices from 'services/categoriesService';
import Toastfunction from 'functions/ToastFunction';
import { doMutation } from 'utils/mutation';
import { useMutation, useQueryClient } from 'react-query';

function EditModal({ Modal, handleClose }) {
  const { open, value } = Modal;
  const [category, setCategory] = useState(value?.label || '');
  const [subCategory, setSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState(value?.subCategory || []);
  const [categoryError, setCategoryError] = useState(false);
  const [subCategoryError, setSubCategoryError] = useState(false);
  //const m = useMutation(()=>categoriesServices.update())
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
  const { mutate } = doMutation('Error message if any', 'Success message', 'categoriesList', (id, data) =>
    categoriesServices.updateStatus(id, data)
  );
  const handleRemoveSubCategory = (index) => {
    const newSubCategories = [...subCategories];
    newSubCategories.splice(index, 1);
    setSubCategories(newSubCategories);
  };

  const handleAgree = async () => {
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
    console.log(data.subCategory);
    console.log(value._id);

    // await mutate(value._id, data);
    categoriesServices
      .updateStatus(value._id, data)
      .then(() => {
        handleClose();
        queryClient.invalidateQueries('categoriesList');
        Toastfunction.TaostSuccess('Category added succesfuly');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*     
  }; */
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
        {subCategories?.map((subCat, index) => (
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

export default EditModal;
