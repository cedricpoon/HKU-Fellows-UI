import { StyleSheet } from 'react-native';

import { fontSize, gridBase } from 'hkufui/theme/grid'
import { logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  header: {
    height: 'auto'
  },
  title: {
    fontSize: fontSize.titleSize,
    fontWeight: 'normal',
    textAlign: 'justify'
  },
  subtitle: {
    color: logo.brown,
    paddingTop: gridBase,
    textAlign: 'justify',
    marginBottom: gridBase
  },
  back: {
    color: logo.black
  },
  rightIcon: {
    color: logo.red
  },
  context: {
    flex: 4
  }
});
