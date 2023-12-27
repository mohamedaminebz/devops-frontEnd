/* eslint-disable no-unused-vars */
// material-ui
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

// project import
import NavGroup from './NavGroup';
import menuItem from '../../../../menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const { user } = useSelector((state) => state.auth);
  const filteredItems = menuItem.items.filter((item) => {
    if (!item.role || item.role.length === 0) {
      return true;
    }
    console.log(item);
    return item.role.some((allowedRole) => user?.role.includes(allowedRole));
  });

  const navGroups = filteredItems.map((item) => {
    console.log('item:', item);

    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
