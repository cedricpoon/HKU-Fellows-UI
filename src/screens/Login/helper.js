export async function retrieveToken() {
  // Get the current token if it exists
  try {
    const firebase = require('react-native-firebase');

    const fcmToken = await firebase.messaging().getToken();
    return fcmToken
  } catch (e) {
    return null;
  }
}
