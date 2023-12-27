/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Container, Stack, Button, Typography, Box, Divider, Tab, IconButton } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import Chip from '@mui/material/Chip';
import { fetchServicesPerSpace } from 'services/spaceService';
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TabAsChip = ({ label, active, onClick }) => {
  const chipClassName = active ? 'active-chip' : 'inactive-chip';

  return (
    <Chip
      label={label}
      color="default"
      onClick={onClick}
      className={`chip ${chipClassName}`}
      style={{ cursor: 'pointer', marginRight: 8 }}
    />
  );
};

function Services({ selectedServices, onServiceSelect }) {
  const { id } = useParams();
  const { data: services, isLoading, error } = useQuery('services', () => fetchServicesPerSpace(id));

  const [value, setValue] = useState(0);

  const getUniqueCategories = (servicesData) => {
    if (!servicesData?.services) return [];
    const categories = servicesData.services.map((item) => item.Category);
    return Array.from(new Set(categories));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const StyleCard = {
    border: '1px solid #cccccc',
    borderRadius: 2,
    color: '#1E3E79',
    padding: 0
  };
  const StyleTab = {
    border: '1px solid #cccccc',
    borderRadius: 2,
    color: '#1E3E79',
    padding: 1,
    marginBottom: 2
  };

  return (
    <TabContext value={value}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          TabIndicatorProps={{ className: 'custom-tab-indicator' }}
          sx={StyleTab}
        >
          {getUniqueCategories(services).map((category, index) => (
            <TabAsChip label={category} key={index} active={value === index} onClick={() => handleChange(null, index)} />
          ))}
        </Tabs>
      </Box>
      {getUniqueCategories(services).map((category, index) => (
        <TabPanel key={index} value={index} sx={StyleCard}>
          {services?.services
            .filter((item) => item.Category === category)
            .map((item, itemIndex) => (
              <Stack key={itemIndex} direction="column" sx={{ borderBottom: '1px solid #cccccc', padding: 2 }}>
                <Stack direction="row">
                  <Stack direction="column" flexGrow={1}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <IconButton onClick={() => onServiceSelect(item)}>
                        {console.log(item)}
                        {selectedServices?.some((service) => service._id === item._id) ? (
                          <CheckCircleIcon color="primary" />
                        ) : (
                          <Brightness1OutlinedIcon color="primary" />
                        )}
                      </IconButton>
                      <Typography variant="h5" mt={1}>
                        <strong>{item.name}</strong>
                      </Typography>
                    </Stack>

                    <Typography variant="body2" color="textSecondary">
                      {item.duration} min
                    </Typography>
                  </Stack>
                  <Box>
                    {item.promo ? (
                      <Stack direction="column">
                        <Box>{item.pricePromo} DT </Box>

                        <Box style={{ textDecoration: 'line-through', color: 'gray' }}>{item.price} DT </Box>
                      </Stack>
                    ) : (
                      <div>{item.price} DT</div>
                    )}
                  </Box>
                </Stack>
                <Box>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {item.description}
                  </Typography>
                </Box>
              </Stack>
            ))}
        </TabPanel>
      ))}
    </TabContext>
  );
}

export default Services;
