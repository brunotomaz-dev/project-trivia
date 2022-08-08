import { GET_QUESTIONS, RECEIVE_NEW_SCORE } from '../actions/gameActions';
import { SET_EMAIL } from '../actions/headerActions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      responseCode: action.responseCode,
    };
  case SET_EMAIL:
    console.log(state);
    return {
      ...state,
      player: {
        name: action.name,
        gravatarEmail: action.email,
        score: state.player.score,
        assetions: state.player.assertions,
      },
    };
  case RECEIVE_NEW_SCORE:
    return {
      ...state,
      player: {
        name: state.player.name,
        gravatarEmail: state.player.gravatarEmail,
        score: action.payload,
        assetions: state.player.assertions,
      },
    };
  default:
    return state;
  }
};

export default gameReducer;
