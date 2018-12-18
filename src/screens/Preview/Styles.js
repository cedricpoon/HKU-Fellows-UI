import { StyleSheet } from 'react-native';
import { fontSize, gridBase } from 'hkufui/theme/grid';
import { ITEM_HEIGHT } from './Constants';

export default StyleSheet.create({
  copyright: {
    marginTop: gridBase * 2,
    marginLeft: gridBase * 6,
    marginBottom: gridBase * 8,
    fontSize: fontSize.miniSize
  },
  heightHolder: {
    height: ITEM_HEIGHT
  }
});
