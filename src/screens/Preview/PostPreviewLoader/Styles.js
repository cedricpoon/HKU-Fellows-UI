import { StyleSheet } from 'react-native';
import { gridBase } from 'hkufui/theme/grid';
import { seperator } from 'hkufui/theme/palette';

export default StyleSheet.create({
  placeholderGroup: {
    marginLeft: gridBase * 7,
    marginTop: gridBase,
    marginBottom: gridBase * 2,
    marginRight: gridBase * 4
  },
  placeholder: {
    height: gridBase * 2,
    marginTop: gridBase * 2,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: seperator,
    borderRadius: gridBase / 2
  },
  placeholderShort: {
    width: '30%'
  },
  placeholderLong: {
    width: '100%'
  },
  gradient: {
    flex: 1,
    width: gridBase * 25
  },
  hr: {
    height: 1,
    backgroundColor: seperator,
    marginTop: gridBase,
    width: '100%',
    marginLeft: gridBase * 7,
  }
});
