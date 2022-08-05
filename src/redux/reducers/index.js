import { combineReducers } from 'redux';
import headerReducer from './headerReducer';
import nomeReducer2 from './nomeReducer2';

const rootReducer = combineReducers({
  headerReducer, nomeReducer2 });

export default rootReducer;
