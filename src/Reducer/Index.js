import { combineReducers } from 'redux';
import token from './Token';
import player from './Email';

const rootReducer = combineReducers({
  token,
  player,
});

export default rootReducer;
