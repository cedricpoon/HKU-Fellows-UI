import { StyleSheet } from 'react-native';

import { fontSize } from 'hkufui/theme/grid'
import { logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  title: {
    fontSize: fontSize.titleSize,
    fontWeight: 'normal'
  },
  back: {
    color: logo.black
  },
  rightIcon: {
    color: logo.red
  }
});
