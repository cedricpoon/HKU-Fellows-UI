import getTheme from 'hkufui/native-base-theme/components';
import React, { Component } from 'react';
import { StyleProvider, Root } from 'native-base';
import { Provider as RXProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import AppContainer from './navigation/AppContainer';
import NavigationService from './navigation/NavigationService';

import { store, persistor } from './store';

export default class App extends Component {
  render() {
    return (
      <RXProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <StyleProvider style={getTheme()}>
              <AppContainer
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </StyleProvider>
          </Root>
        </PersistGate>
      </RXProvider>
    );
  }
}
