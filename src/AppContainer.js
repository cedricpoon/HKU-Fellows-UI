import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Post, Login } from './screens';
import { Context } from './navigator';

const topLevelNavigator = createStackNavigator(
  {
    Context: Context,
    Login: Login,
    Post: Post
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

export default createAppContainer(topLevelNavigator);
