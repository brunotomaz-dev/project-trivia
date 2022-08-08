import { combineReducers } from 'redux';
import headerReducer from './headerReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  headerReducer,
  gameReducer,
});

export default rootReducer;
