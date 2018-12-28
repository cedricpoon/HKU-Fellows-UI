import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Post, Login } from './screens';
import { Context } from './navigator';

const topLevelNavigator = createStackNavigator(
  {
    Context: {
      screen: Context,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    Post: {
      screen: Post
    }
  },
  {
    initialRouteName: 'Login'
  }
);

export default createAppContainer(topLevelNavigator);
