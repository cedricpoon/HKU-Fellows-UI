import { post } from "hkufui/theme/grid"
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  placeholder: {
    marginVertical: post.placeholderVerticalMargin
  },
  subHeadline: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: post.newLinePadding
  }
});
