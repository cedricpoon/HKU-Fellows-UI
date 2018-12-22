import { createDrawerNavigator } from 'react-navigation';

import { Landing } from 'hkufui/src/navigator';

export default createDrawerNavigator(
  {
    Landing: Landing,
  },
  {
    initialRouteName: 'Landing'
  }
);
