import { StyleSheet } from 'react-native';
import { gridBase, comment } from 'hkufui/theme/grid';
import { seperator } from 'hkufui/theme/palette';

const hrBase = {
  height: 1,
  backgroundColor: seperator,
};

const placeholderBase = {
  height: gridBase * 2,
  alignSelf: 'flex-start',
  justifyContent: 'center',
  backgroundColor: seperator,
  borderRadius: gridBase / 2
}

export default StyleSheet.create({
  placeholderGroup: {
    marginLeft: gridBase * 7,
    marginTop: gridBase,
    marginBottom: gridBase * 2 + 1.5 /* 1.5 as complement to actual 82.5 height */,
    marginRight: gridBase * 4
  },
  paragraphGroup: {
    marginHorizontal: comment.spacingHorizontal,
    marginTop: comment.spacingVertical + gridBase
  },
  placeholder: {
    ...placeholderBase,
    marginTop: gridBase * 2
  },
  placeholderNoMarginTop: {
    ...placeholderBase
  },
  placeholderShort: {
    width: '30%'
  },
  placeholderLong: {
    width: '100%'
  },
  placeholderMedium: {
    width: '50%'
  },
  gradient: {
    flex: 1,
    width: gridBase * 25
  },
  hr: {
    ...hrBase,
    marginTop: gridBase,
    marginLeft: gridBase * 7,
    width: '100%',
  },
  headlineHr: {
    ...hrBase,
    marginHorizontal: comment.spacingHorizontal,
    marginTop: comment.spacingVertical + gridBase
  }
});
