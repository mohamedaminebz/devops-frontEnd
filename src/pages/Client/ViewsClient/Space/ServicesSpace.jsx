/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Container, Stack, Button, Typography, Box, Divider, Tab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import Chip from '@mui/material/Chip';
import { fetchServicesPerSpace } from 'services/spaceService';
import ServiceComponent from '../ServicesClient/ServiceComponent';

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

function ServicesSpace({ data }) {
  const { id } = useParams();

  const { data: services, isLoading, error } = useQuery('services', () => fetchServicesPerSpace(id));

  const [value, setValue] = useState(0);

  // Function to extract unique categories from services data
  const getUniqueCategories = (servicesData) => {
    if (!servicesData?.services) return [];
    const categories = servicesData.services.map((item) => item.Category);
    return Array.from(new Set(categories));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ marginTop: 15 }}>
      <Typography variant="h3"> Services</Typography>
      <TabContext value={value}>
        <Box sx={{ marginTop: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            TabIndicatorProps={{ className: 'custom-tab-indicator' }}
          >
            {/* Generate tabs for unique categories */}
            {getUniqueCategories(services).map((category, index) => (
              <TabAsChip label={category} key={index} active={value === index} onClick={() => handleChange(null, index)} />
            ))}
          </Tabs>
        </Box>
        {getUniqueCategories(services).map((category, index) => (
          <TabPanel key={index} value={index} sx={{ width: '50%' }}>
            <Box sx={{ margin: 0 }}>
              {services?.services
                .filter((item) => item.Category === category)
                .map((item, itemIndex) => (
                  <span key={itemIndex}>
                    <ServiceComponent sr={item} />
                  </span>
                ))}
            </Box>
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}

export default ServicesSpace;
