import { GET_GRAVATAR } from '../actions/headerActions';

const INITIAL_STATE = {
  name: 'leonardo',
  email: 'leo@leo.com',
  gravatarEndPoint: '',
  score: 0,
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_GRAVATAR:
    return {
      ...state,
      gravatarEndPoint: action.gravatarEndPoint,
    };
  default:
    return state;
  }
};

export default headerReducer;
