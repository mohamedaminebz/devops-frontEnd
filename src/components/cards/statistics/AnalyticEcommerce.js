/* eslint-disable */
import PropTypes from 'prop-types';

// material-ui
import { Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { DollarOutlined , HomeOutlined,CalendarTwoTone,UserOutlined    } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //
// const iconsConver = (isLoss) => {
//   switch (isLoss) {
//     case 'dollar':
//       return <DollarOutlined style={{ fontSize: '1rem', color: 'inherit' }} />;
//     case 'space':
//       return <HomeOutlined style={{ fontSize: '1rem', color: 'inherit' }} />;
//     case 'user':
//       return <UserOutlined style={{ fontSize: '1rem', color: 'inherit' }} />;
//     case 'reservation':
//       return <CalendarTwoTone style={{ fontSize: '1rem', color: 'inherit' }} />;
//     default:  <UserOutlined style={{ fontSize: '1rem', color: 'inherit' }} />;
//       break;
//   }
// };




const AnalyticEcommerce = ({ color, title, count, percentage, isLoss,iconComponent }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="textSecondary">
        {title} 
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
        </Grid>
    
  <Grid item>
    <Chip
      variant="combined"
      color={color}
      icon={<UserOutlined/>}
      sx={{ ml: 1.5, pl: 1 }}
      size="big"
    />
    
  </Grid>


      </Grid>
    </Stack>
    {/* <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="textSecondary">
        You made an extra{' '}
        <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
          {extra}
        </Typography>{' '}
        this year
      </Typography>
    </Box> */}
  </MainCard>
);

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.string,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;
