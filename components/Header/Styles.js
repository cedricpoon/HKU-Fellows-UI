import { StyleSheet } from 'react-native';

import { fontSize, gridBase } from 'hkufui/theme/grid'
import { logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  title: {
    fontSize: fontSize.titleSize,
    fontWeight: 'normal'
  },
  subtitle: {
    color: logo.brown,
    paddingTop: gridBase
  },
  back: {
    color: logo.black
  },
  rightIcon: {
    color: logo.red
  },
  buttonGroup: {
    flex: 0.2
  }
});
