import FeedIcon from '@mui/icons-material/Feed';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { roles } from 'utils/roles';
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const CollaboratorMenu = {
  id: 'space',
  title: 'Manage Space',
  type: 'group',
  role: [roles.COLLABORATOR],
  children: [
    {
      id: 'General Information',
      title: 'General Information',
      type: 'item',
      url: '/generalInfo',
      icon: FeedIcon
    },
    {
      id: 'Services',
      title: 'Services',
      type: 'item',
      url: '/Services',
      icon: SettingsSuggestIcon
    },
    {
      id: 'Reservations',
      title: 'Reservations',
      type: 'item',
      url: '/Reservations',
      icon: CalendarMonthIcon
    }
  ]
};

export default CollaboratorMenu;
