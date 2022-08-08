import { RECEIVE_NEW_SCORE } from '../actions/gameActions';
import { GET_GRAVATAR, SET_EMAIL } from '../actions/headerActions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatarEndPoint: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
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
    };
  case RECEIVE_NEW_SCORE:
    return {
      ...state,
      name: state.name,
      gravatarEmail: state.gravatarEmail,
      score: action.payload,
      assetions: state.assertions,
    };
  default:
    return state;
  }
};

export default player;
