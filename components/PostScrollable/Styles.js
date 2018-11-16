import nbColor from "hkufui/native-base-theme/variables/commonColor";
import { logo } from "hkufui/theme/palette";
import { post, gridBase } from "hkufui/theme/grid"
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
    width: post.seperatorPadding * 2,
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
    fontSize: post.smallSize,
    paddingLeft: gridBase * 1.3,
    paddingBottom: gridBase
  },
  subTitle: {
    color: logo.black
  },
  viewed: {
    color: 'lightgrey'
  },
  solved: {
    color: logo.yellow
  },
  right: {
    justifyContent: 'flex-end'
  },
  last: {
    paddingRight: post.seperatorPadding
  },
  mainText: {
    fontSize: post.titleSize,
    paddingBottom: gridBase
  },
  subText: {
    fontSize: post.miniSize,
    paddingBottom: gridBase,
    paddingTop: gridBase,
    paddingRight: gridBase
  }
});
