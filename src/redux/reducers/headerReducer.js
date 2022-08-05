import { GET_GRAVATAR, SET_EMAIL } from '../actions/headerActions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatarEndPoint: '',
  score: '',
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_GRAVATAR:
    console.log(action.payload);
    return {
      ...state,
      gravatarEndPoint: action.payload,
    };
  case SET_EMAIL:
    return {
      ...state,
      name: action.name,
      email: action.email,
      score: 0,
    };
  default:
    return state;
  }
};

export default headerReducer;
