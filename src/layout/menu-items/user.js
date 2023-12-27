// assets
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// ==============================|| MENU ITEMS - user ||============================== //

const user = {
  id: 'user',
  title: 'User Information',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: ManageAccountsIcon
    }
  ]
};

export default user;
