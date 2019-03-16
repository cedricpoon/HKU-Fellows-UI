/* Common method called by onLayout */
export const mapLayoutToState = (key, ref) => {
  return ((event) => {
    let _state = {};
    _state[key] = event.nativeEvent.layout;
    ref.setState(_state);
  }).bind(ref);
};

/* Normalize ISO timestamp format from mysql for `timeago.js` */
export const noZ = (t) => t.replace(/(\d+-\d+-\d+T\d+:\d+:\d+\.\d+)(Z)/, '$1');
