/* Common method called by onLayout */
export const setLayoutToState = (key, ref) => {
  return ((event) => {
    let _state = {};
    _state[key] = event.nativeEvent.layout;
    ref.setState(_state);
  }).bind(ref);
};
