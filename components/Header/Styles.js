import { StyleSheet, Platform } from 'react-native';

import { fontSize, gridBase, header } from 'hkufui/theme/grid'
import { logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  header: {
    height: 'auto',
    // compensation on diff with PreviewHeader
    paddingBottom: Platform.OS === 'ios' ? 0.5 : null,
  },
  headerWrap: {
    paddingTop: gridBase,
    paddingBottom: gridBase + 1,
  },
  title: {
    fontSize: Platform.OS === 'ios' ? fontSize.semiTitleSize : fontSize.titleSize,
    color: Platform.OS === 'ios' ? null : 'black',
    fontWeight: 'normal',
    textAlign: 'justify',
    marginBottom: Platform.OS === 'ios' ? gridBase : null
  },
  subtitle: {
    color: logo.brown,
    textAlign: 'justify',
    marginTop: Platform.OS === 'ios' ? null : gridBase,
    marginBottom: Platform.OS === 'ios' ? gridBase : null
  },
  button: {
    width: Platform.OS === 'ios' ? null : header.buttonWidth,
  },
  btnRight: {
    justifyContent: Platform.OS === 'ios' ? null : 'center',
  },
  buttonIcon: {
    color: logo.black
  },
  context: {
    flex: Platform.OS === 'ios' ? 4 : 2,
  }
});
