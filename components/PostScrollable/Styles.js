import nbColor from "hkufui/native-base-theme/variables/commonColor";
import color from "hkufui/theme/palette";
import grid from "hkufui/theme/grid"
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  noPost: {
    alignItems:'center',
    justifyContent:'center'
  },
  noMarginLeft: {
    marginLeft: 0
  },
  badgeContainer: {
    width: grid.post.seperatorPadding * 2,
  },
  moodle: {
    color: color.logo.blue
  },
  hashtags: {
    color: color.logo.green
  },
  note: {
    color: nbColor.listNoteColor
  },
  active: {
    color: color.logo.red
  },
  infoBar: {
    flexDirection: 'row'
  },
  topBadge: {
    color: color.logo.yellow,
    fontSize: grid.post.smallSize,
    paddingLeft: grid.gridBase * 1.5
  },
  right: {
    justifyContent: 'flex-end'
  },
  last: {
    paddingRight: grid.post.seperatorPadding
  },
  mainText: {
    fontSize: grid.post.titleSize,
    paddingBottom: grid.gridBase
  },
  subText: {
    fontSize: grid.post.miniSize,
    paddingBottom: grid.gridBase,
    paddingTop: grid.gridBase,
    paddingRight: grid.gridBase
  }
});
