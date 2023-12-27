import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchServicesWithSpace } from 'services/clientService';
import { Container, Typography, Stack, Box } from '@mui/material';
import ServiceListClient from './ServiceListClient';
import Maps from './Maps';
export default function ClientService() {
  const { cat } = useParams();

  const { data, isLoading, error } = useQuery('clientServicesList', () => fetchServicesWithSpace(cat));
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log('data', data);

  return data ? (
    <div>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="center" mb={5}>
          <Typography variant="h4" gutterBottom>
            {cat} Services
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5}>
          <Typography variant="p" gutterBottom>
            Choose over <strong>{data?.length} </strong> spaces that offer a <strong> {cat}</strong>
          </Typography>
        </Stack>

        <br />
        <br />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data?.map((data) => (
              <div key={data?._id}>
                <ServiceListClient data={data} />
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }}>
            <Maps  data = {data}/>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div style={{ marginTop: '120px', marginBottom: '100px' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={3}
        height="80px"
        width="1fr"
        style={{
          background: 'linear-gradient(90deg, #00ADEF 0%, #FF3366 100%)' // Use double curly braces for inline style
        }}
      >
        <Typography variant="h4" gutterBottom color="white">
          No Spaces Found For {id}
        </Typography>
      </Box>
    </div>
  );
}
