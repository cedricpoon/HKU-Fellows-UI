import { StyleSheet } from 'react-native';

import { course, fontSize, gridBase } from 'hkufui/theme/grid'
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
  title: {
    flex: 0.95
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
  exoActive: {
    color: logo.green
  },
  active: {
    color: logo.blue
  },
  linkItemNonBottomMost: {
    paddingLeft: course.headerPadding,
    marginLeft: 0,
    borderBottomWidth: 0
  },
  linkItem: {
    paddingVertical: course.headerPadding,
    paddingRight: course.headerPadding
  },
  linkDescription: {
    color: logo.black,
    fontSize: fontSize.titleSize
  },
  linkLeft: {
    flex: 0,
    paddingRight: gridBase
  },
  linkRight: {
    flex: 0.05
  },
  linkChevron: {
    color: logo.black
  }
});
