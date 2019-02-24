import getTheme from 'hkufui/native-base-theme/components';
import React, { Component } from 'react';
import { StyleProvider, Root } from 'native-base';
import { Provider as RXProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import AppContainer from './AppContainer';
import NavigationService from './NavigationService';
import { deepLink } from 'hkufui/config';

import { store, persistor } from './store';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
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
                uriPrefix={deepLink.prefix}
              />
            </StyleProvider>
          </Root>
        </PersistGate>
      </RXProvider>
    );
  }
}
