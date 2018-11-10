import { StyleSheet, Dimensions } from 'react-native';

import color from 'hkufui/theme/palette';

export default StyleSheet.create({
  container: {
    /* z-index in <PreviewFooter /> */
    zIndex: 2
  },
  menu: {
    /* z-index in <PopupMenu /> */
    zIndex: 2,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
    shadowColor: color.logo.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  outsider: {
    /* z-index in <PopupMenu /> */
    zIndex: 1,
    position: 'absolute',
    top: -Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
