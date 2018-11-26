import nbColor from "hkufui/native-base-theme/variables/commonColor";
import { logo } from "hkufui/theme/palette";
import { post, gridBase, fontSize } from "hkufui/theme/grid"
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  noMarginLeft: {
    marginLeft: 0
  },
  badgeContainer: {
    width: post.badgeContainerWidth,
    flexDirection: 'column'
  },
  moodle: {
    color: logo.blue
  },
  hashtags: {
    color: logo.green
  },
  note: {
    color: nbColor.listNoteColor
  },
  active: {
    color: logo.red
  },
  infoBar: {
    flexDirection: 'row'
  },
  badge: {
    fontSize: fontSize.titleSize,
    paddingLeft: gridBase,
    paddingBottom: gridBase
  },
  subTitle: {
    color: logo.black
  },
  viewed: {
    color: 'lightgrey'
  },
  solved: {
    color: logo.dimmed.yellow
  },
  right: {
    justifyContent: 'flex-end'
  },
  last: {
    paddingRight: post.seperatorPadding
  },
  mainText: {
    fontSize: fontSize.titleSize,
    paddingBottom: gridBase
  },
  subText: {
    fontSize: fontSize.miniSize,
    paddingBottom: gridBase,
    paddingTop: gridBase,
    paddingRight: gridBase
  }
});
