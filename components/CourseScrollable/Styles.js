import { StyleSheet } from 'react-native';

import { course, fontSize } from 'hkufui/theme/grid'
import { logo } from 'hkufui/theme/palette'

export default StyleSheet.create({
  accordion: {
    borderWidth: 0
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: "row",
    padding: course.headerPadding,
    justifyContent: "space-between",
    alignItems: "center"
  },
  content: {
    paddingLeft: course.accordionPaddingLeft,
    marginLeft: course.accordionMarginLeft,
    borderLeftWidth: 1,
    borderColor: 'lightgray'
  },
  headerText: {
    fontSize: fontSize.titleSize
  },
  active: {
    color: logo.green
  }
});
