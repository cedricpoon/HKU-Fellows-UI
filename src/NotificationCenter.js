import { Component } from 'react';
import { Linking, Alert, Platform } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { encrypt } from 'hkufui/src/safe';

import { deepLink, settings, channel as channelInfo } from 'hkufui/config';
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

  _openNotification = (no) => {
    const { data } = no.notification;
    // construct deeplink and open it
    if (data.post)
      this._openTopic(data.post);
  }

  _notificationListener = firebase.notifications().onNotification((notification) => {
    if (Platform.OS === 'android') {
      notification
        .android.setChannelId(channelInfo.channelId)
        .android.setSmallIcon(channelInfo.icon);
    }
    // display notification even in foreground
    firebase.notifications().displayNotification(notification);
  });

  _notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    this._openNotification(notificationOpen);
  });

  _consumeChannel = () => {
    const channel = new firebase.notifications.Android.Channel(
      channelInfo.channelId,
      channelInfo.name,
      firebase.notifications.Android.Importance.Max
    ).setDescription(channelInfo.description);

    firebase.notifications().android.createChannel(channel);
  }

  _closedNotificationOpen = async () => {
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      this._openNotification(notificationOpen);
    }
  }

  async componentDidMount() {
    await this._requestPermission();
    if (Platform.OS === 'android') {
      this._consumeChannel();
      await this._closedNotificationOpen();
    }
  }

  async componentWillUnmount() {
    this._notificationListener();
    this._notificationOpenedListener();
  }

  render() {
    return this.props.children;
  }
}

NotificationCenter.propTypes = {
  children: PropTypes.any.isRequired
};
