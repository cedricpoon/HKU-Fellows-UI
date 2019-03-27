import getTheme from 'hkufui/native-base-theme/components';
import React, { Component } from 'react';
import { StyleProvider, Root } from 'native-base';
import { Provider as RXProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import firebase from 'react-native-firebase';

import AppContainer from './AppContainer';
import NavigationService from './NavigationService';
import { deepLink } from 'hkufui/config';
import { localize } from 'hkufui/locale';

import { store, persistor } from './store';
const locale = localize({ country: 'hk', language: 'en' });

export default class App extends Component {
  requestPushNotification = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
      } catch (error) {
        // User has rejected permissions
        alert(locale['alert.noPushNoti']);
      }
    }
  }

  async componentDidMount() {
    SplashScreen.hide();
    await this.requestPushNotification();
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
