import { StyleSheet } from 'react-native';

import { logo } from 'hkufui/theme/palette';
import { fontSize } from 'hkufui/theme/grid'

export default StyleSheet.create({
  fullPageContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  inputForm: {
    paddingHorizontal: 30,
    paddingBottom: 60,
    zIndex: 2
  },
  submit: {
    marginTop: 30,
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
    marginTop: 15
  },
  backdrop: {
    position: 'absolute',
    zIndex: 1
  }
});
