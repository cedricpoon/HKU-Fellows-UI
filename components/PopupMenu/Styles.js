import { StyleSheet, Dimensions } from 'react-native';

import { logo } from 'hkufui/theme/palette';
import { footer } from 'hkufui/theme/grid';

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
    borderRadius: footer.borderRadius,
    borderColor: 'lightgrey',
    borderWidth: 1,
    shadowColor: logo.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: footer.shadowRadius
  },
  menuAndroid: {
    zIndex: 2,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  outsider: {
    /* z-index in <PopupMenu /> */
    zIndex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
