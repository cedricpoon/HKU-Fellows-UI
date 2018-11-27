import { UPDATE_LOCATION, SET_SELECT_COURSE_INDEX } from "hkufui/src/constants/actionTypes";

export const onUpdateLocation = (item) => ({
  type: UPDATE_LOCATION,
  payload: {
    courseId: item.id,
    courseTitle: item.title
  }
});

export const onSetSelectCourseIndex = (array) => ({
  type: SET_SELECT_COURSE_INDEX,
  payload: {
    breadcrumb: array
  }
});

const handleActions = (state = {}, action = {}) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        courseId: action.payload.courseId,
        courseTitle: action.payload.courseTitle
      }
    case SET_SELECT_COURSE_INDEX:
      return {
        ...state,
        breadcrumb: action.payload.breadcrumb
      }
    default:
      return state;
  }
};

export default handleActions;
