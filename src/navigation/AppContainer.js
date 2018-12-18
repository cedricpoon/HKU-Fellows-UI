import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Landing, Post } from 'hkufui/src/screens';

const topLevelNavigator = createStackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: {
        header: null
      }
    },
    Post: {
      screen: Post
    }
  },
  {
    initialRouteName: 'Landing'
  }
);

export default createAppContainer(topLevelNavigator);
