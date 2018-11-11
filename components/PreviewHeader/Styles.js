import { StyleSheet } from 'react-native';

import { header, gridBase } from 'hkufui/theme/grid';
import { logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  leftLabel: {
    alignSelf: 'center',
    height: null,
    backgroundColor: logo.black,
    marginLeft: header.labelMarginLeft
  },
  leftLabelText: {
    paddingLeft: header.labelPadding,
    paddingRight: header.labelPadding,
    fontSize: gridBase * 2
  },
  input: {
    fontSize: gridBase * 3,
    top: 0
  },
  rightButtons: {
    flex: 0
  },
  rightIcon: {
    marginLeft: 0,
    marginRight: header.iconMarginRight
  }
});
