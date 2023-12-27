import React from 'react';
import MinimalLayout from 'layout/MinimalLayout/index';
import Home from 'pages/Client/ViewsClient/Home/index';
import Space from 'pages/Client/ViewsClient/Space/index';
import Basket from 'pages/Client/ViewsClient/Basket/index';

import DynamicLayout from 'pages/Client/components/Layouts/DynamicLayout';
import ClientService from 'pages/Client/ViewsClient/ServicesClient/ClientService';
import Membership from 'pages/Client/Membership/Membership';
import Maps from 'pages/Client/ViewsClient/ServicesClient/Maps';
import History from 'pages/Client/ReservationHistory/History';

const ClientRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/home',
      element: (
        <DynamicLayout>
          <Home />
        </DynamicLayout>
      )
    },
    {
      path: '/client/service/:cat',
      element: (
        <DynamicLayout>
          <ClientService />{' '}
        </DynamicLayout>
      )
    },
    {
      path: '/space/:id',
      element: (
        <DynamicLayout>
          <Space />
        </DynamicLayout>
      )
    },
    {
      path: '/membership',
      element: <Membership />
    },
    {
      path: '/basket/:id',
      element: (
        <DynamicLayout>
          <Basket />
        </DynamicLayout>
      )
    },

    {
      path: '/maps',
      element: <Maps />
    },
    {
      path: '/recent_reservation',
      element: (
        <DynamicLayout>
          <History />
        </DynamicLayout>
      )
    }
  ]
};

export default ClientRoutes;
