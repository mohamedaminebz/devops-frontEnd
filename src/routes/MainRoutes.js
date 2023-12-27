import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { roles } from 'utils/roles';
import NotFoundPage from 'pages/404/NotFoundPage';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/Admin/dashboard')));
const Reservations = Loadable(lazy(() => import('pages/Collaborator/Resrvation/Reservations')));
const ServicePage = Loadable(lazy(() => import('pages/Collaborator/ManageServices/ServicePage')));
const GeneralInfo = Loadable(lazy(() => import('pages/Collaborator/GeneralInfo/index')));
const ManageCategories = Loadable(lazy(() => import('pages/Admin/ManageCategory/index')));
const PartnershipRequest = Loadable(lazy(() => import('pages/Admin/PartnershipRequest/index')));
const Profile = Loadable(lazy(() => import('pages/Profile/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    ///**************************************ADMIN****************************** */
    {
      path: 'dashboard',
      element: <DashboardDefault />,
      // roles: [roles.ADMIN]
    },
    {
      path: 'profile',
      element: <Profile />
      //  roles: [roles.ADMIN]
    },
    {
      path: 'PartnershipRequest',
      element: <PartnershipRequest />,
      roles: [roles.ADMIN]
    },

    {
      path: 'categories',
      element: <ManageCategories />,
      roles: [roles.ADMIN]
    },

    //************************* Collaborator ************************* */
    {
      path: 'generalInfo',
      element: <GeneralInfo />,
      roles: [roles.COLLABORATOR]
    },

    {
      path: 'Services',
      element: <ServicePage />,
      roles: [roles.COLLABORATOR]
    },

    {
      path: 'Reservations',
      element: <Reservations />,
      roles: [roles.COLLABORATOR]
    },
    {
      path: 'NotFound',
      element: <NotFoundPage />
    }
  ]
};

export default MainRoutes;
