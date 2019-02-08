import { UPDATE_FILTER, UPDATE_QUERY, UPDATE_KEYWORD } from 'hkufui/src/constants/actionTypes';
import defaultState from 'hkufui/src/store/globalState';

export const onUpdateQuery = (query) => ({
  type: UPDATE_QUERY,
  payload: { query }
});

export const onUpdateKeyword = (keyword) => ({
  type: UPDATE_KEYWORD,
  payload: { keyword }
});

export function resetQueryKeyword() {
  return (dispatch) => {
    dispatch(onUpdateQuery(null));
    dispatch(onUpdateKeyword(null));
  };
}

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
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.payload.query,
        keyword: null
      };
    case UPDATE_KEYWORD:
      return {
        ...state,
        query: null,
        hashtag: action.payload.keyword
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };
    default:
      return state;
  }
};

export default handleFilterPosts;
