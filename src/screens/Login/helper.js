import firebase from 'react-native-firebase';

export async function retrieveToken() {
  // Get the current token if it exists
  try {
    const fcmToken = await firebase.messaging().getToken();
    return fcmToken
  } catch (e) {
    return null;
  }
}
