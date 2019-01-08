import { createDrawerNavigator } from 'react-navigation';

import { Landing } from 'hkufui/src/navigator';
import DrawerMenu from './DrawerMenu/DrawerMenu';

export default createDrawerNavigator(
  {
    Landing: Landing
  },
  {
    initialRouteName: 'Landing',
    contentComponent: DrawerMenu
  }
);
