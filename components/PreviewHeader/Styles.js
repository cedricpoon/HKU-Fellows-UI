import { StyleSheet } from 'react-native';

import { header, fontSize, gridBase } from 'hkufui/theme/grid';
import { logo } from 'hkufui/theme/palette';
import nbColor from 'hkufui/native-base-theme/variables/commonColor'

export default StyleSheet.create({
  header: {
    backgroundColor: nbColor.toolbarDefaultBg
  },
  leftLabel: {
    alignSelf: 'center',
    height: null,
    backgroundColor: logo.black,
    marginLeft: gridBase / 2
  },
  leftLabelText: {
    paddingLeft: header.labelPadding,
    paddingRight: header.labelPadding,
    fontSize: fontSize.miniSize
  },
  input: {
    fontSize: fontSize.titleSize,
    top: 0
  },
  rightButtons: {
    flex: 0
  },
  rightIcon: {
    marginLeft: 0,
    marginRight: gridBase * 3
  }
});
