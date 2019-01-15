import nbColor from "hkufui/native-base-theme/variables/commonColor";
import { post } from 'hkufui/theme/grid'
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  placeholder: {
    marginVertical: post.placeholderVerticalMargin
  },
  subHeadline: {
    flexDirection: 'row',
    marginTop: post.newLineMargin
  },
  button: {
    borderColor: nbColor.listNoteColor,
    alignSelf: 'center',
    marginTop: post.newLineMargin * 2,
    height: null
  }
});
