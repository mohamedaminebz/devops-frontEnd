/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Stack,
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
  InputAdornment,
  Box,
  Typography
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import partnershipServices from 'services/partnershipServices';
import { useQuery } from 'react-query';
import DetailsModel from './Modals/DetailsModel';
import ApproveModal from './Modals/ApproveModal';
const columns = [
  { id: 'FirstName', label: 'FirstName', minWidth: 80 },
  { id: 'LastName', label: 'LastName', minWidth: 80 },
  {
    id: 'Email',
    label: 'Email',
    minWidth: 80,
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'phoneNumber',
    label: 'PhoneNumber',
    minWidth: 80,
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'spaceName',
    label: 'SpaceName',
    minWidth: 80
  },
  {
    id: 'Service',
    label: 'Service',
    minWidth: 80
  },
  {
    id: 'other',
    label: 'Other',
    minWidth: 80
  }
];

function index() {
  const { data: partnership, isLoading, isError, error } = useQuery('partnershipRequest', partnershipServices.getAll);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  useEffect(() => {
    if (isError) {
      console.log('Error:', error);
    } else {
      // Set the initial filtered data to the fetched data
      setFilteredData(partnership?.data || []);
    }
  }, [isError, error, partnership]);

  // Filter data based on the search term and filter value
  useEffect(() => {
    const filteredResults = partnership?.data?.filter((item) => {
      return item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) && (filterValue === '' || item.state === filterValue);
    });
    setFilteredData(filteredResults || []);
  }, [searchTerm, filterValue, partnership?.data]);

  // Event handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  //// ************** MODAL LOGIC *********************

  const [Modal, setModal] = useState({
    open: false,
    type: '',
    value: partnership?.data
  });
  const viewModal = (row) => {
    setModal({ open: true, type: 'view', value: row });
  };
  const handleClose = () => {
    setModal({ open: false });
  };

  const approveModal = (row) => {
    setModal({ open: true, type: 'approve', value: row });
  };

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={2}>
        <Box flexGrow={1}>
          <Typography variant="h4"> Partnership Requests</Typography>
        </Box>
        <Box mr={2}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Search here</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={searchTerm}
              onChange={handleSearchChange}
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
          {' '}
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel htmlFor="select-input">Select a Filter</InputLabel>
            <Select
              value={filterValue}
              onChange={handleFilterChange}
              label="Select an option"
              inputProps={{
                name: 'select-input',
                id: 'select-input'
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="NOT_APPROVED">Not Approved</MenuItem>
              <MenuItem value="APPROVED">Approved</MenuItem>
              <MenuItem value="ARCHIVED">Archived</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Container className="container">
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice()
                  .reverse()
                  .map((item) => (
                    <TableRow key={item._id} hover>
                      <TableCell>{item.firstName}</TableCell>
                      <TableCell>{item.lastName}</TableCell>
                      <TableCell>{item.email}</TableCell>

                      <TableCell>{item.phoneNumber}</TableCell>
                      <TableCell>{item.spaceName}</TableCell>
                      <TableCell>{item.service}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => viewModal(item)}>
                          <Tooltip title="View Details">
                            <RemoveRedEyeIcon />
                          </Tooltip>
                        </IconButton>{' '}
                        &nbsp;
                        {item.state === 'NOT_APPROVED' ? (
                          <Button variant="outlined" endIcon={<ErrorOutlineIcon />} size="small" onClick={() => approveModal(item)}>
                            approve
                          </Button>
                        ) : (
                          <IconButton color="success">
                            <Tooltip title="Approuved">
                              <CheckCircleIcon />
                            </Tooltip>
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      {Modal.type === 'view' && <DetailsModel Modal={Modal} handleClose={handleClose} />}
      {Modal.type === 'approve' && <ApproveModal Modal={Modal} handleClose={handleClose} />}
    </div>
  );
}

export default index;
