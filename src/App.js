import getTheme from 'hkufui/native-base-theme/components';
import React, { Component } from 'react';
import { Linking } from 'react-native';
import { StyleProvider, Root } from 'native-base';
import { Provider as RXProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import firebase from 'react-native-firebase';
import { encrypt } from 'hkufui/src/safe';

import AppContainer from './AppContainer';
import NavigationService from './NavigationService';
import { deepLink } from 'hkufui/config';
import { localize } from 'hkufui/locale';

import { store, persistor } from './store';
const locale = localize({ country: 'hk', language: 'en' });

export default class App extends Component {
  _requestPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      // user doesn't have permission
      try {
        await firebase.messaging()._requestPermission();
        // User has authorised
      } catch (error) {
        // User has rejected permissions
        alert(locale['alert.noPushNoti']);
      }
    }
  }

  _processPushNotification = (no) => {
    const { data } = no.notification;
    // construct deeplink and open it
    if (data.post)
      Linking.openURL(`${deepLink.prefix}${deepLink.post(encrypt(data.post))}`)
  }

  _processPushNotificationOpening = async () => {
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      this._processPushNotification(notificationOpen);
    }
  }

  _notificationListener = firebase.notifications().onNotification((notification) => {
    // display notification even in foreground
    firebase.notifications().displayNotification(notification);
  });

  _notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    this._processPushNotification(notificationOpen);
  });

  async componentDidMount() {
    SplashScreen.hide();
    await this._requestPermission();
    await this._processPushNotificationOpening();
  }

  async componentWillUnmount() {
    this._notificationListener();
    this._notificationOpenedListener();
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
