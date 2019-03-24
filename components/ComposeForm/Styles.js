import { StyleSheet } from 'react-native';
import { gridBase, fontSize } from 'hkufui/theme/grid';
import { logo } from 'hkufui/theme/palette';

export default StyleSheet.create({
  textbox: {
    fontSize: fontSize.titleSize,
    height: gridBase * 6,
    paddingLeft: gridBase * 2,
    paddingRight: gridBase
  },
  replybox: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 2
  },
  bold: {
    fontWeight: "600"
  },
  item: {
    marginTop: gridBase * 2
  },
  remarkGroup: {
    marginTop: gridBase * 2,
    flexDirection: 'row'
  },
  remark: {
    fontSize: fontSize.semiTitleSize,
    fontStyle: 'italic',
    marginRight: gridBase
  },
  hyperlink: {
    color: logo.blue,
    fontStyle: 'normal',
    textDecorationLine: 'underline'
  },
  toggler: {
    fontSize: fontSize.titleSize
  },
  hidden: {
    display: 'none'
  }
});
