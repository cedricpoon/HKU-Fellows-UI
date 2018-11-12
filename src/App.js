import getTheme from 'hkufui/native-base-theme/components';
import React, { Component } from 'react';
import { StyleProvider, Root } from 'native-base';
import { createStackNavigator } from 'react-navigation';

import { Landing } from 'hkufui/screens';

const AppNav = createStackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Landing'
  }
);

export default class App extends Component {
  render() {
    return (
      <Root>
        <StyleProvider style={getTheme()}>
          <AppNav />
        </StyleProvider>
      </Root>
    );
  }
}
