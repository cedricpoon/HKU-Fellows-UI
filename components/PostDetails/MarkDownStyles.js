import { logo } from 'hkufui/theme/palette';

export default {
  /*
   * -------------------------------------------------
   * Custom styling for React Native Markdown Renderer
   * NOT following gridBase
   * -------------------------------------------------
   */
  blockquote: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#CCC'
  },
  link: {
    textDecorationLine: 'underline',
    color: logo.blue
  },
  text: {
    color: 'black'
  }
}
