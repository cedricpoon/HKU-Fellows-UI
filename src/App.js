import getTheme from 'hkufui/native-base-theme/components';
import React, { Component } from 'react';
import { StyleProvider, Root } from 'native-base';
import { Provider as RXProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import AppContainer from './AppContainer';
import NotificationCenter from './NotificationCenter';
import NavigationService from './NavigationService';
import UniversalLink from './UniversalLink';
import { deepLink } from 'hkufui/config';

import { store, persistor } from './store';

export default class App extends Component {
  async componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <NotificationCenter>
        <RXProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Root>
              <StyleProvider style={getTheme()}>
                <UniversalLink>
                  <AppContainer
                    ref={navigatorRef => {
                      NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                    uriPrefix={deepLink.prefix}
                  />
                </UniversalLink>
              </StyleProvider>
            </Root>
          </PersistGate>
        </RXProvider>
      </NotificationCenter>
    );
  }
}
