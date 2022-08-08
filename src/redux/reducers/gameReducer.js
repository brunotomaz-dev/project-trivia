import { GET_QUESTIONS } from '../actions/gameActions';

const INITIAL_STATE = {

};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      responseCode: action.responseCode,
    };
  default:
    return state;
  }
};

export default gameReducer;
