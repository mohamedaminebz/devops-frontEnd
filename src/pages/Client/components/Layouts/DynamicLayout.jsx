// DynamicLayout.js

import React from 'react';
import AppAppBar from './AppBar';
import AppFooter from './AppFooter';

const DynamicLayout = ({ children }) => {
  return (
    <div style={{ backgroundColor: 'white', paddingTop: 100 }}>
      <AppAppBar />
      {children}
      <AppFooter />
    </div>
  );
};

export default DynamicLayout;
