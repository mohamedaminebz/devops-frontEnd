/* eslint-disable no-unused-vars */
import AdminMenu from './AdminMenu';
import CollaboratorMenu from './CollaboratorMenu';
import ManageSpace from './CollaboratorMenu';
import dashboard from './dashboard';
import user from './user';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [user, dashboard, AdminMenu, CollaboratorMenu]
};

export default menuItems;
