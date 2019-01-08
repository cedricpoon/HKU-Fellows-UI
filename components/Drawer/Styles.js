import { StyleSheet } from 'react-native';

import { fontSize } from 'hkufui/theme/grid';
import { logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  label: {
    fontWeight: 'normal',
    fontSize: fontSize.titleSize
  },
  color: {
    color: logo.green
  },
  container: {
    flex: 1
  },
  scrollBar: {
    flex: 1
  }
});
