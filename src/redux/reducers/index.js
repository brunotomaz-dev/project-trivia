import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import player from './player';

const rootReducer = combineReducers({
  player,
  gameReducer,
});

export default rootReducer;
