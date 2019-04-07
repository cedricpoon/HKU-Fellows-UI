import { Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { environment as env } from  'hkufui/config';

// Common method called by onLayout
export const mapLayoutToState = (key, ref) => {
  return ((event) => {
    let _state = {};
    _state[key] = event.nativeEvent.layout;
    ref.setState(_state);
  }).bind(ref);
};

// Normalize ISO timestamp format from mysql for `timeago.js`
// ONLY for production server
export const noZ = (t) => env === 'locally' ? t : t.replace(/(\d+-\d+-\d+T\d+:\d+:\d+\.\d+)(Z)/, '$1');

// Avoid animating components on Android for better performance
export const makeAnimatable = (component) => {
  switch (Platform.OS) {
    case 'ios':
      return Animatable.createAnimatableComponent(component);
    case 'android':
    default:
      return component;
  }
}
