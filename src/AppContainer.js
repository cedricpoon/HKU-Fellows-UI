import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Post } from './screens';
import { Context } from './navigator';

const topLevelNavigator = createStackNavigator(
  {
    Context: {
      screen: Context,
      navigationOptions: {
        header: null
      }
    },
    Post: {
      screen: Post
    }
  },
  {
    initialRouteName: 'Context'
  }
);

export default createAppContainer(topLevelNavigator);
