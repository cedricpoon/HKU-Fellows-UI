import { StyleSheet } from 'react-native';

import { logo } from 'hkufui/theme/palette';
import { gridBase as base } from 'hkufui/theme/grid';
import { fontSize } from 'hkufui/theme/grid'

export default StyleSheet.create({
  fullPageContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  inputForm: {
    paddingHorizontal: base * 6,
    paddingBottom: base * 6,
    zIndex: 2,
    alignItems: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  submit: {
    marginTop: base * 6,
    height: base * 9
  },
  declaration: {
    fontSize: fontSize.miniSize,
    fontStyle: 'italic'
  },
  placeholder: {
    color: logo.black
  },
  noBorderItem: {
    borderBottomWidth: 0,
    marginTop: base * 3
  },
  backdrop: {
    zIndex: 1
  }
});
