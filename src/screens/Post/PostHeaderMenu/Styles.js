import { StyleSheet } from 'react-native';
import { gridBase } from 'hkufui/theme/grid';
import { warningOrange, logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  separator: {
    height: 1,
    marginHorizontal: gridBase * 3
  },
  thumbUp: {
    color: warningOrange
  },
  thumbDown: {
    color: logo.red
  }
});
