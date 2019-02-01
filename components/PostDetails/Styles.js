import { StyleSheet } from 'react-native';

import { gridBase, fontSize, comment } from 'hkufui/theme/grid';
import { logo, seperator } from 'hkufui/theme/palette';
import customMarkDown from './MarkDownStyles';

const headlineContent = {
  marginLeft: gridBase,
  fontSize: fontSize.semiTitleSize
};

const panel = {
  flexDirection: 'row',
  alignItems: 'center'
};

export default StyleSheet.create({
  ...customMarkDown,
  container: {
    paddingHorizontal: comment.spacingHorizontal
  },
  headline: {
    ...panel,
    justifyContent: 'space-between',
    paddingVertical: comment.spacingVertical,
    borderBottomWidth: gridBase / 10,
    borderColor: seperator,
  },
  leftPanel: {
    ...panel,
    paddingVertical: 1
  },
  rightPanel: {
    ...panel,
    alignItems: 'baseline',
    paddingLeft: gridBase,
    paddingVertical: 1,
    shadowColor: logo.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderRadius: gridBase,
    backgroundColor: 'white'
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
  temperature: {
    marginRight: gridBase,
    fontSize: fontSize.semiTitleSize
  },
  hot: {
    color: logo.red
  },
  date: {
    ...headlineContent,
    color: logo.black
  },
  solved: {
    ...headlineContent,
    fontSize: fontSize.miniSize,
    color: logo.dimmed.yellow
  },
  dismiss: {
    color: logo.red,
    fontSize: fontSize.semiTitleSize
  },
  contentContainer: {
    marginVertical: gridBase
  },
  selectableText: {
    marginTop: gridBase
  }
});
