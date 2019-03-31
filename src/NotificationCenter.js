import { Component } from 'react';
import { Linking, Alert } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { encrypt } from 'hkufui/src/safe';

import { deepLink, settings } from 'hkufui/config';
import { localize } from 'hkufui/locale';

const locale = localize({ country: 'hk', language: 'en' });

export default class NotificationCenter extends Component {
  _requestPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (!enabled) {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
      } catch (error) {
        // User has rejected permissions
        Alert.alert(
          locale['alert.noPushNotiHeading'],
          locale['alert.noPushNoti'],
          [
            { text: locale['toast.dismiss'] },
            { text: locale['alert.settings'], onPress: () => { Linking.openURL(settings) } }
          ]
        );
      }
    }
  }

  _openTopic = (topicId) => {
    Linking.openURL(`${deepLink.prefix}${deepLink.post(encrypt(topicId))}`)
  }

  _notificationListener = firebase.notifications().onNotification((notification) => {
    // display notification even in foreground
    firebase.notifications().displayNotification(notification);
  });

  _notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    const { data } = notificationOpen.notification;
    // construct deeplink and open it
    if (data.post)
      this._openTopic(data.post);
  });

  async componentDidMount() {
    await this._requestPermission();
  }

  async componentWillUnmount() {
    this._notificationListener();
    this._notificationOpenedListener();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

NotificationCenter.propTypes = {
  children: PropTypes.any.isRequired
};
