import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Post, Login, Compose } from './screens';
import { Context } from './navigator';
import { deepLink } from 'hkufui/config';

const topLevelNavigator = createStackNavigator(
  {
    Context: Context,
    Login: Login,
    Compose: Compose,
    Post: {
      screen: Post,
      /* deep link from external */
      path: deepLink.post(':payload')
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

export default createAppContainer(topLevelNavigator);
