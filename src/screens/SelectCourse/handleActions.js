import * as types from "hkufui/src/constants/actionTypes";

export const onUpdateLocation = ({item}) => ({
  type: types.UPDATE_LOCATION,
  courseId: item.id,
  courseTitle: item.title
});

export const onSetSelectCourseIndex = (array) => ({
  type: types.SET_SELECT_COURSE_INDEX,
  breadcrumb: array
});

const handleActions = (state = {}, action = {}) => {
  switch (action.type) {
    case types.UPDATE_LOCATION:
      return {
        ...state,
        courseId: action.courseId,
        courseTitle: action.courseTitle
      }
    case types.SET_SELECT_COURSE_INDEX:
      return {
        ...state,
        breadcrumb: action.breadcrumb
      }
    default:
      return state;
  }
};

export default handleActions;
