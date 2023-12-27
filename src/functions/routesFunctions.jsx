export const filterRoutesByRole = (routes, role, isAuthenticated) => {
  return routes.filter((route) => {
    if (route.isAuthenticated !== isAuthenticated) {
      return false;
    }

    if (route.roles && route.roles.includes(role)) {
      if (route.children) {
        route.children = filterRoutesByRole(route.children, role, isAuthenticated);
      }
      return true;
    }

    return false;
  });
};

export const getRoutesForRole = (role, isAuthenticated) => {
  if (!isAuthenticated) {
    return [];
  }

  const filteredRoutes = filterRoutesByRole([MainRoutes], role, isAuthenticated);
  return filteredRoutes[0].children;
};

export const getRoutesForAuthentication = (isAuthenticated) => {
  const filteredRoutes = filterRoutesByRole([MainRoutes, LoginRoutes], null, isAuthenticated);
  return filteredRoutes[0].children.concat(filteredRoutes[1].children);
};
