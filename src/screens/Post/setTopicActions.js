import { SET_TOPIC } from "hkufui/src/constants/actionTypes";

export const onSetTopic = (topicId) => ({
  type: SET_TOPIC,
  payload: { topicId }
});

const setTopicActions = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_TOPIC:
      return {
        ...state,
        recentTopic: action.payload.topicId
      }
    default:
      return state;
  }
};

export default setTopicActions;
