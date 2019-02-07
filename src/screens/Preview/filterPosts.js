import { UPDATE_FILTER } from 'hkufui/src/constants/actionTypes';
import defaultState from 'hkufui/src/store/globalState';

export const onUpdateFilter = (filter) => ({
  type: UPDATE_FILTER,
  payload: { filter }
});

export const onResetFilter = () => ({
  type: UPDATE_FILTER,
  payload: { filter: defaultState.posts.filter }
});

const handleFilterPosts = (state = {}, action = {}) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      }
    default:
      return state;
  }
};

export default handleFilterPosts;
