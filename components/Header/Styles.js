import { StyleSheet } from 'react-native';

import { fontSize, gridBase } from 'hkufui/theme/grid'
import { logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  header: {
    height: 'auto',
    paddingBottom: 0.5 // compensation on diff with PreviewHeader
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: 'normal',
    textAlign: 'justify',
    marginBottom: gridBase,
  },
  titleRegularSize: {
    fontSize: fontSize.titleSize
  },
  subtitle: {
    color: logo.brown,
    textAlign: 'justify',
    marginBottom: gridBase
  },
  button: {
    color: logo.black
  },
  context: {
    flex: 4
  }
});
