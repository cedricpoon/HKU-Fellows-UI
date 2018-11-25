import getTheme from 'hkufui/native-base-theme/components';
import React, { Component } from 'react';
import { StyleProvider, Root } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { Provider as RXProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { Landing } from 'hkufui/src/screens';
import { store, persistor } from './store';

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
      <RXProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <StyleProvider style={getTheme()}>
              <AppNav />
            </StyleProvider>
          </Root>
        </PersistGate>
      </RXProvider>
    );
  }
}
