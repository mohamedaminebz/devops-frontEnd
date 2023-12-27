// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import BuildIcon from '@mui/icons-material/Build';
import { roles } from 'utils/roles';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const AdminMenu = {
  id: 'manage',
  title: 'Manage',
  type: 'group',
  role: [roles.ADMIN],
  children: [
    {
      id: 'PartnershipRequest',
      title: 'Partnership Request',
      type: 'item',
      url: '/PartnershipRequest',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'manageCategories',
      title: 'Categories',
      type: 'item',
      url: '/categories',
      icon: BuildIcon
    }
  ]
};

export default AdminMenu;
