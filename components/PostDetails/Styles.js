import { StyleSheet } from 'react-native';

import { gridBase, fontSize } from 'hkufui/theme/grid';
import { logo, seperator } from 'hkufui/theme/palette';
import customMarkDown from './MarkDownStyles';

const headlineContent = {
  marginLeft: gridBase,
  fontSize: fontSize.titleSize
};

export default StyleSheet.create({
  ...customMarkDown,
  container: {
    paddingHorizontal: gridBase * 3
  },
  headline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: gridBase * 2,
    borderBottomWidth: gridBase / 10,
    borderColor: seperator,
  },
  index: {
    fontSize: fontSize.miniSize,
    color: 'gray'
  },
  author: {
    ...headlineContent,
    color: logo.dimmed.green
  },
  anonymous: {
    ...headlineContent,
    color: logo.dimmed.blue,
    fontStyle: 'italic'
  },
  date: {
    ...headlineContent,
    fontSize: fontSize.semiTitleSize,
    color: logo.black
  },
  contentContainer: {
    marginVertical: gridBase
  }
});
