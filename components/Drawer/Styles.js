import { StyleSheet } from 'react-native';

import { fontSize, gridBase } from 'hkufui/theme/grid';
import { logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  label: {
    fontWeight: 'normal',
    fontSize: fontSize.titleSize
  },
  color: {
    color: logo.dimmed.green
  },
  container: {
    flex: 1
  },
  wrapper: {
    zIndex: 1,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: gridBase * 4
  },
  userInfoGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  secondaryUserInfo: {
    fontSize: fontSize.miniSize,
    color: 'grey'
  },
  userInfo: {
    fontSize: fontSize.semiTitleSize
  },
  hot: {
    color: logo.red
  },
  backdrop: {
    zIndex: 0
  }
});
