import * as types from "hkufui/src/constants/actionTypes";

export const onUpdateLocation = courseId => ({
  type: types.UPDATE_LOCATION,
  courseId
});

const handleActions = (state = {}, action = {}) => {
  switch (action.type) {
    case types.UPDATE_LOCATION:
      return {
        ...state,
        courseId: action.courseId
      }
    default:
      return state;
  }
};

export default handleActions;
