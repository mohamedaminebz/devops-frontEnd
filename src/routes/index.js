/* eslint-disable */
import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import ClientRoutes from './ClientRoutes';
import NotFoundPage from 'pages/404/NotFoundPage';

export default function ThemeRoutes() {
  const { user } = useSelector((state) => state.auth);

  const isAuthenticated = () => {
    const token = localStorage.getItem('refreshToken');
    return token !== 'undefined' && token !== null;
  };

  const filteredMainRoutes = MainRoutes.children.filter((route) => {
    if (!route.roles) {
      return true; // Include the route if no roles are specified
    }
    return route.roles.some((role) => user && user.role.includes(role));
  });

  const filteredClientRoutes = ClientRoutes.children.filter((route) => {
    if (!route.roles) {
      return true; // Include the route if no roles are specified
    }
    return route.roles.some((role) => user && user.role.includes(role));
  });

  const filteredRoutes = {
    ...MainRoutes,
    children: filteredMainRoutes
  };
  const filteredRoutes2 = {
    ...ClientRoutes,
    children: filteredClientRoutes
  };

  const routes = isAuthenticated() ? [filteredRoutes, filteredRoutes2] : [filteredRoutes2];
  return useRoutes([
    ...routes,
    {
      path: '*',
      element: !isAuthenticated() ? <Navigate to="/login" replace /> : <NotFoundPage />
    },
    LoginRoutes
  ]);
}
