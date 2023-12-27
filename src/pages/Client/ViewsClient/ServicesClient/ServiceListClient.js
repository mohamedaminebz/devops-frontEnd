/* eslint-disable */
import * as React from 'react';

import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';
import ServiceComponent from './ServiceComponent';
import AverageReview from '../Space/AverageReview';

export default function ServiceListClient({ data }) {
  console.log('data From ServiceListClient', data);
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '25px', margin: 20 }}>
        <img src={data?.space?.photos[0]} width={300} height={190} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <Typography variant="h4" gutterBottom>
            <strong> {data?.space?.label}</strong>
          </Typography>
          <Typography variant="overline">
            <AverageReview data={data?.space._id} />
          </Typography>
          <Typography>
            🏠 {data?.space?.address?.city} , {data?.space?.address?.zipCode}
          </Typography>
        </div>
      </div>

      {data?.services?.map((sr) => {
        return <ServiceComponent sr={sr} />;
      })}
    </Card>
  );
}
