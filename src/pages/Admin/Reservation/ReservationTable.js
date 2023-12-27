/* eslint-disable */
import React from 'react';
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography ,Avatar} from '@mui/material';
import NumberFormat from 'react-number-format';
import Dot from 'components/@extended/Dot';

export default function ReservationTable({data}) {
    const OrderStatus = ({ status }) => {
        let color;
        let title;
      
        switch (status) {
          case "PENDING":
            color = 'warning';
            title = 'Pending';
            break;
          case "CONFIRMED":
            color = 'success';
            title = 'Confirmed';
            break;
          case "REJECTED":
            color = 'error';
            title = 'Rejected';
            break;
          default:
            color = 'primary';
            title = 'None';
        }
      
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
          </Stack>
        );
      };
  const headCells = [
    {
      id: 1,
      align: 'left',
      disablePadding: false,
      label: 'User'
    },
    {
        id: 2,
        align: 'center',
        disablePadding: false,
        label: 'numCard'
      },
      {
        id: 3,
        align: 'center',
        disablePadding: false, 
        label: 'payment Method'
      },
      {
        id: 3,
        align: 'center',
        disablePadding: false,
        label: 'Status'
      },
      {
        id: 4,
        align: 'right',
        disablePadding: false,
        label: 'total Price'
      }
  ];
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                 
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  
                  tabIndex={-1}
                  key={row._id}
                 
                >
                  <TableCell component="th" scope="row" align="left">
                    <Link color="secondary">
                    <Avatar alt="Remy Sharp" src={row?.user?.profilImage}  />  {`${row?.user?.firstName} ${row?.user?.lastName}`} 
                    </Link>
                  </TableCell>
                  <TableCell align="center">{row?.numCard}</TableCell>
                  <TableCell align="center">{row?.paymentMethod}</TableCell>
                  <TableCell align="left">
                    <OrderStatus status={row?.status} />
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat value={row?.basket?.totalPrice} displayType="text" thousandSeparator prefix="$" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
